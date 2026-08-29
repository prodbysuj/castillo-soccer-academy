"use client";

import { MotionConfig } from "framer-motion";

/**
 * Framer Motion does not read prefers-reduced-motion on its own, so every
 * JS-driven animation in the app has to opt in through this provider.
 */
export default function MotionProvider({ children }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
