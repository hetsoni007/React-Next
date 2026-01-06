import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import {
  Globe,
  Smartphone,
  Layers,
  LayoutTemplate,
  Check,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Clock,
  FileText,
  Zap,
  Target,
  Calendar,
  Server,
  Download,
  Mail,
  Building2,
  ShoppingCart,
  CalendarCheck,
  HelpCircle,
  User,
  Shield,
  CreditCard,
  Bell,
  Search,
  BarChart3,
  MessageCircle,
  Puzzle,
  Brain,
  Languages,
} from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { usePageView, useTrackEvent } from "@/hooks/use-analytics";
import {
  projectTypes,
  projectPurposes,
  simpleWebsitePurposes,
  features,
  simpleWebsiteFeatures,
  mobileFeatures,
  timelinePreferences,
  regionPricing,
  calculateComplexityLevel,
  generateRequirementsSummary,
  getFeaturesByProjectType,
  getFeatureCategoryLabels,
  getTechStackByProjectType,
  type RequirementsSummary,
} from "@/lib/estimation-data";
import { Upload, FileCheck, Loader2, Lightbulb, Code, X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

const projectTypeIcons: Record<string, typeof Globe> = {
  layout: LayoutTemplate,
  globe: Globe,
  smartphone: Smartphone,
  layers: Layers,
};

const purposeIcons: Record<string, typeof Building2> = {
  business_tool: Building2,
  saas: Sparkles,
  marketplace: ShoppingCart,
  booking: CalendarCheck,
  not_sure: HelpCircle,
  // Simple website purposes
  portfolio: User,
  business_landing: Target,
  company_website: Building2,
  blog: FileText,
  ecommerce_basic: ShoppingCart,
  event: Calendar,
};

const featureIcons: Record<string, typeof User> = {
  auth: User,
  admin: Shield,
  payments: CreditCard,
  notifications: Bell,
  search: Search,
  analytics: BarChart3,
  chat: MessageCircle,
  api_integrations: Puzzle,
  ai: Brain,
  multilang: Languages,
  // Simple website features
  responsive: Smartphone,
  contact_form: Mail,
  gallery: LayoutTemplate,
  blog_section: FileText,
  seo_basic: Target,
  social_links: Globe,
  newsletter: Mail,
  testimonials: MessageCircle,
  analytics_basic: BarChart3,
  maps: Globe,
  scheduling: CalendarCheck,
  ecommerce_lite: ShoppingCart,
  membership: User,
  multilingual: Languages,
};

interface WizardState {
  projectType: string;
  preferredTechStack: string[];
  projectPurpose: string;
  selectedFeatures: string[];
  preferredTimeline: string;
  manualRequirements: string;
  additionalNotes: string;
  name: string;
  email: string;
}

interface AIAnalysis {
  summary: string;
  suggestedFeatures: string[];
  questions: {
    id: string;
    question: string;
    type: "text" | "choice";
    options?: string[];
  }[];
  estimatedComplexity: "simple" | "moderate" | "complex";
  techStackSuggestions: string[];
}

interface QuestionAnswer {
  [questionId: string]: string;
}

const TOTAL_STEPS = 7;

export default function EstimatePage() {
  usePageView("/estimate");
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [requirementsSummary, setRequirementsSummary] =
    useState<RequirementsSummary | null>(null);
  const [regionData, setRegionData] = useState(
    regionPricing.find((r) => r.region === "DEFAULT")!
  );
  const { toast } = useToast();

  const [wizardState, setWizardState] = useState<WizardState>({
    projectType: "",
    preferredTechStack: [],
    projectPurpose: "",
    selectedFeatures: [],
    preferredTimeline: "",
    manualRequirements: "",
    additionalNotes: "",
    name: "",
    email: "",
  });

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysis | null>(null);
  const [questionAnswers, setQuestionAnswers] = useState<QuestionAnswer>({});

  useEffect(() => {
    detectRegion();
    trackEvent("Estimation", "Tool Started", "Step 1");
  }, []);

  const detectRegion = async () => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      const response = await fetch("https://ipapi.co/json/", {
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (!response.ok) {
        console.log("Region detection failed, using default USD pricing");
        return;
      }

      const data = await response.json();
      const countryCode = data.country_code;

      if (!countryCode) {
        console.log("No country code returned, using default USD pricing");
        return;
      }

      let region = regionPricing.find((r) => r.region === countryCode);
      if (!region) {
        const euCountries = [
          "DE",
          "FR",
          "IT",
          "ES",
          "NL",
          "BE",
          "AT",
          "CH",
          "PL",
          "SE",
          "NO",
          "DK",
          "FI",
          "IE",
          "PT",
        ];
        if (euCountries.includes(countryCode)) {
          region = regionPricing.find((r) => r.region === "EU");
        }
      }
      if (region) {
        setRegionData(region);
      }
    } catch (error) {
      console.log("Region detection failed, using default USD pricing");
    }
  };

  interface EstimateSubmission {
    projectType: string;
    projectPurpose: string;
    features: string;
    preferredTimeline: string;
    complexityLevel: string;
    estimationData: string;
    region: string;
    currency: string;
    name: string;
    email: string;
  }

  const submitMutation = useMutation({
    mutationFn: async (data: EstimateSubmission) => {
      return apiRequest("POST", "/api/estimate", data);
    },
    onSuccess: () => {
      toast({
        title: "Thank you for sharing your idea with us",
        description:
          "Our team will carefully review your requirements and get back to you within 24 hours.",
      });
      trackEvent("Estimation", "Completed", wizardState.projectType);
    },
    onError: (error: Error) => {
      console.error("Estimation submission error:", error);
      toast({
        title: "Something went wrong",
        description:
          error.message || "Please try again or contact us directly.",
        variant: "destructive",
      });
    },
  });

  const updateState = (key: keyof WizardState, value: any) => {
    setWizardState((prev) => ({ ...prev, [key]: value }));
  };

  const toggleFeature = (featureId: string) => {
    setWizardState((prev) => ({
      ...prev,
      selectedFeatures: prev.selectedFeatures.includes(featureId)
        ? prev.selectedFeatures.filter((f) => f !== featureId)
        : [...prev.selectedFeatures, featureId],
    }));
  };

  const toggleTechStack = (techId: string) => {
    setWizardState((prev) => ({
      ...prev,
      preferredTechStack: prev.preferredTechStack.includes(techId)
        ? prev.preferredTechStack.filter((t) => t !== techId)
        : [...prev.preferredTechStack, techId],
    }));
  };

  const handleFileUpload = async (file: File) => {
    if (file.type !== "application/pdf") {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF file.",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 10MB.",
        variant: "destructive",
      });
      return;
    }

    setUploadedFile(file);
    setIsAnalyzing(true);

    try {
      const formData = new FormData();
      formData.append("document", file);

      const response = await fetch("/api/estimate/upload-pdf", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to analyze PDF");
      }

      setAiAnalysis(data.analysis);

      // Auto-select suggested features that exist in current feature set
      if (data.analysis.suggestedFeatures?.length > 0) {
        const validFeatureIds = [
          ...features,
          ...simpleWebsiteFeatures,
          ...mobileFeatures,
        ].map((f) => f.id);
        const validSuggestions = data.analysis.suggestedFeatures.filter(
          (f: string) => validFeatureIds.includes(f)
        );
        if (validSuggestions.length > 0) {
          setWizardState((prev) => ({
            ...prev,
            selectedFeatures: Array.from(
              new Set([...prev.selectedFeatures, ...validSuggestions])
            ),
          }));
        }
      }

      toast({
        title: "Document analyzed",
        description:
          "We've reviewed your requirements and have some suggestions.",
      });
    } catch (error: any) {
      console.error("PDF upload error:", error);
      toast({
        title: "Analysis failed",
        description:
          error.message ||
          "Please try again or describe your requirements manually.",
        variant: "destructive",
      });
      setUploadedFile(null);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const analyzeManualRequirements = async () => {
    if (wizardState.manualRequirements.length < 20) {
      toast({
        title: "More details needed",
        description:
          "Please provide at least a few sentences about your requirements.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);

    try {
      const response = await fetch("/api/estimate/analyze-text", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requirements: wizardState.manualRequirements }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to analyze requirements");
      }

      setAiAnalysis(data.analysis);

      // Auto-select suggested features that exist in current feature set
      if (data.analysis.suggestedFeatures?.length > 0) {
        const validFeatureIds = [
          ...features,
          ...simpleWebsiteFeatures,
          ...mobileFeatures,
        ].map((f) => f.id);
        const validSuggestions = data.analysis.suggestedFeatures.filter(
          (f: string) => validFeatureIds.includes(f)
        );
        if (validSuggestions.length > 0) {
          setWizardState((prev) => ({
            ...prev,
            selectedFeatures: Array.from(
              new Set([...prev.selectedFeatures, ...validSuggestions])
            ),
          }));
        }
      }

      toast({
        title: "Requirements analyzed",
        description:
          "We've reviewed your requirements and have some suggestions.",
      });
    } catch (error: any) {
      console.error("Analysis error:", error);
      toast({
        title: "Analysis failed",
        description: error.message || "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Get the appropriate purposes and features based on project type
  const currentPurposes =
    wizardState.projectType === "simple_website"
      ? simpleWebsitePurposes
      : projectPurposes;
  const currentFeatures = getFeaturesByProjectType(wizardState.projectType);
  const currentTechStack = getTechStackByProjectType(wizardState.projectType);
  const currentCategoryLabels = getFeatureCategoryLabels(
    wizardState.projectType
  );

  // New flow: 1. Project Type → 2. Tech Preferences → 3. Purpose → 4. Features → 5. Deadline → 6. Requirements Summary → 7. Contact
  const canProceed = (): boolean => {
    switch (currentStep) {
      case 1:
        return !!wizardState.projectType;
      case 2:
        return true; // Tech preferences optional
      case 3:
        return !!wizardState.projectPurpose;
      case 4:
        return wizardState.selectedFeatures.length > 0;
      case 5:
        return !!wizardState.preferredTimeline;
      case 6:
        return true; // Summary preview
      case 7:
        return (
          !!wizardState.name &&
          !!wizardState.email &&
          wizardState.email.includes("@")
        );
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (!canProceed()) return;

    trackEvent("Estimation", "Step Completed", `Step ${currentStep}`);

    // Generate requirements summary before showing preview (step 6)
    if (currentStep === 5) {
      generateRequirements();
    }

    if (currentStep < TOTAL_STEPS) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const generateRequirements = () => {
    setIsLoading(true);

    setTimeout(() => {
      const clientDeadline =
        timelinePreferences.find((t) => t.id === wizardState.preferredTimeline)
          ?.name || wizardState.preferredTimeline;

      const summary = generateRequirementsSummary(
        wizardState.projectType,
        wizardState.projectPurpose,
        wizardState.selectedFeatures,
        clientDeadline,
        wizardState.preferredTechStack
      );

      summary.manualRequirements = wizardState.manualRequirements;

      setRequirementsSummary(summary);
      setIsLoading(false);
    }, 1500);
  };

  const handleSubmit = () => {
    if (!requirementsSummary) return;

    if (!wizardState.name.trim() || wizardState.name.length < 2) {
      toast({
        title: "Please enter your name",
        description: "Your name is required to send the requirements.",
        variant: "destructive",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(wizardState.email)) {
      toast({
        title: "Please enter a valid email",
        description:
          "A valid email address is required to receive your requirements summary.",
        variant: "destructive",
      });
      return;
    }

    submitMutation.mutate({
      projectType: wizardState.projectType,
      projectPurpose: wizardState.projectPurpose,
      features: JSON.stringify(wizardState.selectedFeatures),
      preferredTimeline:
        timelinePreferences.find((t) => t.id === wizardState.preferredTimeline)
          ?.name || wizardState.preferredTimeline,
      complexityLevel: requirementsSummary.complexityLevel,
      estimationData: JSON.stringify(requirementsSummary),
      region: regionData.region,
      currency: regionData.currency,
      name: wizardState.name.trim(),
      email: wizardState.email.trim().toLowerCase(),
    });
  };

  const progressPercent = (currentStep / TOTAL_STEPS) * 100;

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-3">
            <Link href="/">
              <Button variant="ghost" size="sm" data-testid="button-back-home">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <span className="text-sm text-muted-foreground">
              Step {currentStep} of {TOTAL_STEPS}
            </span>
          </div>
          <Progress value={progressPercent} className="h-1" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <StepContainer key="step1">
              <StepHeader
                title="What are you building?"
                subtitle="This helps us understand your vision. There's no wrong choice here."
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {projectTypes.map((type) => {
                  const Icon = projectTypeIcons[type.icon];
                  return (
                    <SelectionCard
                      key={type.id}
                      selected={wizardState.projectType === type.id}
                      onClick={() => updateState("projectType", type.id)}
                      testId={`card-project-type-${type.id}`}
                    >
                      <Icon className="h-8 w-8 mb-4 text-foreground" />
                      <h3 className="font-semibold mb-2">{type.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {type.description}
                      </p>
                    </SelectionCard>
                  );
                })}
              </div>

              {wizardState.projectType === "simple_website" && (
                <div className="mt-6 p-4 bg-muted/50 rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">
                    Simple Website — Starting from $499 USD. Final scope is
                    reviewed after submission.
                  </p>
                </div>
              )}
            </StepContainer>
          )}

          {currentStep === 2 && (
            <StepContainer key="step2">
              <StepHeader
                title="Any technology preferences?"
                subtitle="If you have existing systems or preferences, let us know. Otherwise, skip this step."
              />
              <div className="space-y-6">
                {Object.entries(
                  currentTechStack.reduce((acc, tech) => {
                    if (!acc[tech.category]) acc[tech.category] = [];
                    acc[tech.category].push(tech);
                    return acc;
                  }, {} as Record<string, typeof currentTechStack>)
                ).map(([category, techs]) => (
                  <div key={category}>
                    <h4 className="text-sm font-medium text-foreground mb-3 capitalize">
                      {category}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {techs.map((tech) => (
                        <Badge
                          key={tech.id}
                          variant={
                            wizardState.preferredTechStack.includes(tech.id)
                              ? "default"
                              : "outline"
                          }
                          className="cursor-pointer px-3 py-1.5"
                          onClick={() => {
                            setWizardState((prev) => ({
                              ...prev,
                              preferredTechStack:
                                prev.preferredTechStack.includes(tech.id)
                                  ? prev.preferredTechStack.filter(
                                      (t) => t !== tech.id
                                    )
                                  : [...prev.preferredTechStack, tech.id],
                            }));
                          }}
                          data-testid={`badge-tech-${tech.id}`}
                        >
                          {wizardState.preferredTechStack.includes(tech.id) && (
                            <Check className="h-3 w-3 mr-1" />
                          )}
                          {tech.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-center text-xs text-muted-foreground mt-8">
                No preference? That's perfectly fine. We'll recommend the best
                technologies for your project.
              </p>
            </StepContainer>
          )}

          {currentStep === 3 && (
            <StepContainer key="step3">
              <StepHeader
                title="What's the purpose?"
                subtitle={
                  wizardState.projectType === "simple_website"
                    ? "Select the type of website that best describes your needs."
                    : "Help us understand your goals. You're not expected to know everything yet."
                }
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentPurposes.map((purpose) => {
                  const Icon = purposeIcons[purpose.id] || HelpCircle;
                  return (
                    <SelectionCard
                      key={purpose.id}
                      selected={wizardState.projectPurpose === purpose.id}
                      onClick={() => updateState("projectPurpose", purpose.id)}
                      testId={`card-purpose-${purpose.id}`}
                    >
                      <Icon className="h-6 w-6 mb-3 text-foreground" />
                      <h3 className="font-semibold mb-1">{purpose.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {purpose.description}
                      </p>
                    </SelectionCard>
                  );
                })}
              </div>

              {wizardState.projectPurpose === "not_sure" && (
                <div className="mt-6 p-4 bg-muted/50 rounded-lg text-center">
                  <p className="text-sm text-muted-foreground mb-3">
                    That's completely okay! Many of our best projects started
                    with a rough idea. Continue through the planner, or if you'd
                    prefer to talk it through first:
                  </p>
                  <Link href="/contact">
                    <Button
                      variant="outline"
                      size="sm"
                      data-testid="button-not-sure-contact"
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Let's Talk
                    </Button>
                  </Link>
                </div>
              )}
            </StepContainer>
          )}

          {currentStep === 4 && (
            <StepContainer key="step4">
              <StepHeader
                title="Which features do you need?"
                subtitle="Select the features that are important to you. We can always refine these later."
              />

              <div className="space-y-8">
                {Object.entries(currentCategoryLabels).map(
                  ([categoryKey, categoryInfo]) => {
                    const categoryFeatures = currentFeatures.filter(
                      (f) => f.category === categoryKey
                    );
                    if (categoryFeatures.length === 0) return null;

                    return (
                      <div key={categoryKey}>
                        <div className="mb-4">
                          <h4 className="text-sm font-medium text-foreground">
                            {categoryInfo.name}
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            {categoryInfo.description}
                          </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                          {categoryFeatures.map((feature) => {
                            const Icon = featureIcons[feature.id] || HelpCircle;
                            return (
                              <FeatureCard
                                key={feature.id}
                                feature={feature}
                                Icon={Icon}
                                selected={wizardState.selectedFeatures.includes(
                                  feature.id
                                )}
                                onClick={() => toggleFeature(feature.id)}
                              />
                            );
                          })}
                        </div>
                      </div>
                    );
                  }
                )}

                {/* Custom Requirements Section */}
                <div className="border-t border-border pt-8">
                  <h4 className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                    <Lightbulb className="h-4 w-4" />
                    Have specific requirements?
                  </h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Describe your unique needs or upload a document with your
                    requirements.
                  </p>

                  <div className="space-y-4">
                    <Textarea
                      placeholder="Describe your specific requirements, features, or goals..."
                      value={wizardState.manualRequirements}
                      onChange={(e) =>
                        updateState("manualRequirements", e.target.value)
                      }
                      className="min-h-[100px]"
                      data-testid="input-manual-requirements"
                    />

                    <div className="flex flex-wrap gap-3 items-center">
                      <label className="relative">
                        <input
                          type="file"
                          accept=".pdf"
                          className="sr-only"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleFileUpload(file);
                          }}
                          data-testid="input-file-upload"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          className="cursor-pointer"
                          disabled={isAnalyzing}
                          asChild
                        >
                          <span>
                            {isAnalyzing ? (
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            ) : uploadedFile ? (
                              <FileCheck className="h-4 w-4 mr-2" />
                            ) : (
                              <Upload className="h-4 w-4 mr-2" />
                            )}
                            {uploadedFile ? uploadedFile.name : "Upload PDF"}
                          </span>
                        </Button>
                      </label>

                      {uploadedFile && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setUploadedFile(null);
                            setAiAnalysis(null);
                          }}
                          data-testid="button-remove-file"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </StepContainer>
          )}

          {currentStep === 5 && (
            <StepContainer key="step5">
              <StepHeader
                title="What's your ideal deadline?"
                subtitle="Share your timeline expectations so we can plan accordingly."
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {timelinePreferences.map((timeline) => (
                  <SelectionCard
                    key={timeline.id}
                    selected={wizardState.preferredTimeline === timeline.id}
                    onClick={() =>
                      updateState("preferredTimeline", timeline.id)
                    }
                    testId={`card-timeline-${timeline.id}`}
                  >
                    <Clock className="h-6 w-6 mb-3 text-foreground" />
                    <h3 className="font-semibold mb-1">{timeline.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {timeline.description}
                    </p>
                  </SelectionCard>
                ))}
              </div>
              <p className="text-center text-xs text-muted-foreground mt-6">
                This helps us understand your priority. You can change this
                later.
              </p>
            </StepContainer>
          )}

          {currentStep === 6 && (
            <StepContainer key="step6">
              {isLoading ? (
                <div className="text-center py-20">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-6">
                    <Sparkles className="h-8 w-8 text-foreground animate-pulse" />
                  </div>
                  <LoadingMessages />
                </div>
              ) : (
                requirementsSummary && (
                  <>
                    <StepHeader
                      title="Your Requirements Summary"
                      subtitle="Here's what we captured. Review and continue to receive your requirements via email."
                    />

                    {/* Overview Card */}
                    <Card className="mb-6">
                      <CardContent className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">
                              Project Type
                            </p>
                            <p className="font-semibold">
                              {requirementsSummary.projectType}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">
                              Purpose
                            </p>
                            <p className="font-semibold">
                              {requirementsSummary.projectPurpose}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">
                              Your Deadline
                            </p>
                            <p className="font-semibold">
                              {requirementsSummary.clientDeadline}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Features */}
                    <Card className="mb-6">
                      <CardContent className="p-6">
                        <h4 className="font-semibold mb-4">
                          Selected Features
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {requirementsSummary.features.map((feature) => (
                            <Badge key={feature} variant="outline">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Tech Stack Recommendations */}
                    {requirementsSummary.techStackRecommendations &&
                      requirementsSummary.techStackRecommendations.length >
                        0 && (
                        <Card className="mb-6">
                          <CardContent className="p-6">
                            <div className="flex items-center gap-3 mb-4">
                              <Server className="h-5 w-5 text-muted-foreground" />
                              <h4 className="font-semibold">
                                Recommended Technologies
                              </h4>
                            </div>
                            <div className="space-y-4">
                              {requirementsSummary.techStackRecommendations.map(
                                (rec) => (
                                  <div key={rec.category}>
                                    <p className="text-xs font-medium text-muted-foreground mb-2">
                                      {rec.category}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                      {rec.technologies.map((tech) => (
                                        <Badge key={tech} variant="secondary">
                                          {tech}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                )
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      )}

                    {/* Phases Overview */}
                    <Card className="mb-6">
                      <CardContent className="p-6">
                        <h4 className="font-semibold mb-4">
                          Our Development Process
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {requirementsSummary.phases.map((phase, index) => (
                            <div
                              key={phase.name}
                              className="p-4 bg-muted/50 rounded-md"
                            >
                              <div className="flex items-center gap-2 mb-2">
                                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-foreground text-background text-xs font-medium">
                                  {index + 1}
                                </span>
                                <h5 className="font-medium">{phase.name}</h5>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {phase.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Custom Requirements */}
                    {wizardState.manualRequirements && (
                      <Card className="mb-6">
                        <CardContent className="p-6">
                          <h4 className="font-semibold mb-3">
                            Additional Requirements
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {wizardState.manualRequirements}
                          </p>
                        </CardContent>
                      </Card>
                    )}

                    <p className="text-center text-sm text-muted-foreground">
                      Continue to receive this summary via email.
                    </p>
                  </>
                )
              )}
            </StepContainer>
          )}

          {currentStep === 7 && (
            <StepContainer key="step7">
              <StepHeader
                title="Get Your Requirements Summary"
                subtitle="Share your details and we'll send you a copy of your requirements"
              />
              <Card className="max-w-md mx-auto">
                <CardContent className="p-8">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Your Name</Label>
                      <Input
                        id="name"
                        placeholder="John Smith"
                        value={wizardState.name}
                        onChange={(e) => updateState("name", e.target.value)}
                        data-testid="input-name"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@company.com"
                        value={wizardState.email}
                        onChange={(e) => updateState("email", e.target.value)}
                        data-testid="input-email"
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <Button
                    className="w-full mt-6"
                    size="lg"
                    onClick={handleSubmit}
                    disabled={!canProceed() || submitMutation.isPending}
                    data-testid="button-submit-requirements"
                  >
                    {submitMutation.isPending ? (
                      <>Sending your requirements...</>
                    ) : (
                      <>
                        <Mail className="h-4 w-4 mr-2" />
                        Send Requirements Summary
                      </>
                    )}
                  </Button>

                  <div className="text-xs text-muted-foreground text-center mt-4 space-y-1">
                    <p>
                      We'll review your requirements and respond within 24
                      hours.
                    </p>
                    <p>
                      We follow GDPR and HIPAA-aligned practices to protect your
                      data.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </StepContainer>
          )}
        </AnimatePresence>

        <div className="flex items-center justify-between mt-12 pt-6 border-t border-border">
          <Button
            variant="ghost"
            onClick={handleBack}
            disabled={currentStep === 1}
            data-testid="button-back"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          {currentStep < TOTAL_STEPS && (
            <Button
              onClick={handleNext}
              disabled={!canProceed() || isLoading}
              data-testid="button-next"
            >
              Continue
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
      </div>

      <footer className="border-t border-border py-8 mt-12">
        <p className="text-center text-sm text-muted-foreground">
          Prepared by Soni Consultancy Services
        </p>
      </footer>
    </div>
  );
}

function StepContainer({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

function StepHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="text-center mb-10">
      <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-3">
        {title}
      </h2>
      <p className="text-muted-foreground">{subtitle}</p>
    </div>
  );
}

function SelectionCard({
  children,
  selected,
  onClick,
  testId,
  className = "",
}: {
  children: React.ReactNode;
  selected: boolean;
  onClick: () => void;
  testId: string;
  className?: string;
}) {
  return (
    <Card
      className={`cursor-pointer transition-all duration-500 ease-out ${
        selected ? "ring-2 ring-foreground bg-muted/50" : "hover-elevate"
      } ${className}`}
      onClick={onClick}
      data-testid={testId}
    >
      <CardContent className="p-6 relative">
        {selected && (
          <div className="absolute top-4 right-4">
            <div className="w-6 h-6 rounded-full bg-foreground flex items-center justify-center">
              <Check className="h-4 w-4 text-background" />
            </div>
          </div>
        )}
        {children}
      </CardContent>
    </Card>
  );
}

function FeatureCard({
  feature,
  Icon,
  selected,
  onClick,
}: {
  feature: {
    id: string;
    name: string;
    helperText: string;
    complexityWeight: number;
  };
  Icon: typeof User;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <Card
      className={`cursor-pointer transition-all duration-500 ease-out ${
        selected ? "ring-2 ring-foreground bg-muted/50" : "hover-elevate"
      }`}
      onClick={onClick}
      data-testid={`card-feature-${feature.id}`}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div
            className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
              selected ? "bg-foreground" : "bg-muted"
            }`}
          >
            <Icon
              className={`h-5 w-5 ${
                selected ? "text-background" : "text-foreground"
              }`}
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm">{feature.name}</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {feature.helperText}
            </p>
          </div>
          {selected && (
            <Check className="h-5 w-5 text-foreground flex-shrink-0" />
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function LoadingMessages() {
  const [messageIndex, setMessageIndex] = useState(0);
  const messages = [
    "Reviewing your inputs...",
    "Organizing your requirements...",
    "Calculating milestones...",
    "Preparing your estimation...",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 600);
    return () => clearInterval(interval);
  }, []);

  return (
    <p className="text-lg text-muted-foreground">{messages[messageIndex]}</p>
  );
}
