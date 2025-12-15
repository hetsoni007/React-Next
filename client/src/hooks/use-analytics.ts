import { useEffect, useRef, useCallback } from "react";
import { apiRequest } from "@/lib/queryClient";

function getSessionId(): string {
  let sessionId = sessionStorage.getItem("analytics_session_id");
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    sessionStorage.setItem("analytics_session_id", sessionId);
  }
  return sessionId;
}

export function usePageView(page: string) {
  const startTime = useRef(Date.now());
  const hasTrackedView = useRef(false);

  useEffect(() => {
    if (hasTrackedView.current) return;
    hasTrackedView.current = true;

    const sessionId = getSessionId();
    
    apiRequest("POST", "/api/analytics", {
      eventType: "page_view",
      page,
      sessionId,
    }).catch(console.error);

    startTime.current = Date.now();

    return () => {
      const duration = Math.round((Date.now() - startTime.current) / 1000);
      if (duration > 2) {
        apiRequest("POST", "/api/analytics", {
          eventType: "engagement",
          page,
          duration,
          sessionId,
        }).catch(console.error);
      }
    };
  }, [page]);
}

export function useTrackEvent() {
  const trackEvent = useCallback((eventType: string, page: string, metadata?: Record<string, unknown>) => {
    const sessionId = getSessionId();
    
    apiRequest("POST", "/api/analytics", {
      eventType,
      page,
      sessionId,
      metadata: metadata ? JSON.stringify(metadata) : undefined,
    }).catch(console.error);
  }, []);

  return { trackEvent };
}
