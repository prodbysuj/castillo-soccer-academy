import { useEffect, useState } from "react";

/** True after the client has mounted. Use to keep SSR and the first client render identical. */
export function useHydrated() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return hydrated;
}
