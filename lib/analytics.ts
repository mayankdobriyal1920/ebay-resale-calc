// Privacy-conscious analytics. Never send entered values.
// Stub for MVP.

export function trackEvent(name: string, params?: Record<string, string | number>): void {
  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.debug("analytics", name, params);
  }
}