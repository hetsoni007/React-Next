import { useState, useEffect, useCallback } from "react";
import { useTrackEvent } from "./use-analytics";

export interface ABTestVariant {
  id: string;
  name: string;
  weight?: number;
}

export interface ABTestConfig {
  testId: string;
  variants: ABTestVariant[];
}

function getStoredVariant(testId: string): string | null {
  try {
    const stored = localStorage.getItem(`ab_test_${testId}`);
    return stored;
  } catch {
    return null;
  }
}

function storeVariant(testId: string, variantId: string): void {
  try {
    localStorage.setItem(`ab_test_${testId}`, variantId);
  } catch {
    console.error("Failed to store A/B test variant");
  }
}

function selectVariant(variants: ABTestVariant[]): string {
  const totalWeight = variants.reduce((sum, v) => sum + (v.weight || 1), 0);
  let random = Math.random() * totalWeight;
  
  for (const variant of variants) {
    random -= variant.weight || 1;
    if (random <= 0) {
      return variant.id;
    }
  }
  
  return variants[0].id;
}

export function useABTest(config: ABTestConfig) {
  const [variantId, setVariantId] = useState<string | null>(null);
  const { trackEvent } = useTrackEvent();

  useEffect(() => {
    let selectedVariant = getStoredVariant(config.testId);
    
    if (!selectedVariant || !config.variants.find(v => v.id === selectedVariant)) {
      selectedVariant = selectVariant(config.variants);
      storeVariant(config.testId, selectedVariant);
      
      trackEvent("ab_test_assigned", "/", {
        testId: config.testId,
        variantId: selectedVariant,
      });
    }
    
    setVariantId(selectedVariant);
  }, [config.testId, config.variants, trackEvent]);

  const trackConversion = useCallback((action: string) => {
    if (variantId) {
      trackEvent("ab_test_conversion", window.location.pathname, {
        testId: config.testId,
        variantId,
        action,
      });
    }
  }, [config.testId, variantId, trackEvent]);

  const getVariant = useCallback(() => {
    return config.variants.find(v => v.id === variantId) || config.variants[0];
  }, [config.variants, variantId]);

  return {
    variantId,
    variant: getVariant(),
    trackConversion,
    isLoading: variantId === null,
  };
}

export const heroCtaTest: ABTestConfig = {
  testId: "hero_cta_v1",
  variants: [
    { id: "control", name: "Contact Me", weight: 1 },
    { id: "schedule", name: "Schedule a Call", weight: 1 },
    { id: "discuss", name: "Let's Discuss", weight: 1 },
  ],
};

export const contactFormTest: ABTestConfig = {
  testId: "contact_form_v1",
  variants: [
    { id: "control", name: "Standard Form", weight: 1 },
    { id: "minimal", name: "Minimal Form", weight: 1 },
  ],
};
