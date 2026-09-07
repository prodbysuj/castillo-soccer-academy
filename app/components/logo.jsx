import Image from "next/image";
import { site } from "./lib/site";

export function Logo({ className, size = 48, alt = "", priority = false }) {
  return (
    <Image
      src={site.logo}
      alt={alt}
      width={size}
      height={size}
      className={className}
      priority={priority}
    />
  );
}
