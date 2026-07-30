export interface AnalyticsEvent {
  name: string;
  context?: string;
}

export function trackEvent(event: AnalyticsEvent): void {
  document.dispatchEvent(
    new CustomEvent("casa-nacoli:analytics", { detail: event }),
  );
}
