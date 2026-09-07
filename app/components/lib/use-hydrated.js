import { useEffect, useState } from "react";

/** True after the client has mounted. Use to keep SSR and the first client render identical. */
export function useHydrated() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setHydrated(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return hydrated;
}
