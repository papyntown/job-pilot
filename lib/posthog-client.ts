import posthog from "posthog-js";

export function initPostHog() {
  if (typeof window !== "undefined") {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      ui_host: "https://eu.posthog.com",
      capture_pageview: false,
      capture_pageleave: true,
    });
  }
}

export { posthog };
