import { PostHog } from "posthog-node";

let _posthogServer: PostHog | null = null;

export function getPostHogServer(): PostHog {
  if (!_posthogServer) {
    _posthogServer = new PostHog(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
      host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      flushAt: 1,
      flushInterval: 0,
    });
  }
  return _posthogServer;
}
