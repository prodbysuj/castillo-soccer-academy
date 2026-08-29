"use client";

import { MotionConfig } from "framer-motion";

/** Always animate — do not defer to OS prefers-reduced-motion for this marketing site. */
export default function MotionProvider({ children }) {
  return <MotionConfig reducedMotion="never">{children}</MotionConfig>;
}
