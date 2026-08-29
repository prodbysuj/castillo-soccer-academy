"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { dictionaries } from "./lib/i18n";

const STORAGE_KEY = "castillo-lang";
const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [locale, setLocaleState] = useState("en");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "es" || stored === "en") {
      setLocaleState(stored);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const value = useMemo(() => {
    function setLocale(next) {
      const value = next === "es" ? "es" : "en";
      setLocaleState(value);
      window.localStorage.setItem(STORAGE_KEY, value);
    }

    return {
      locale,
      copy: dictionaries[locale],
      setLocale,
      toggleLocale() {
        setLocale(locale === "en" ? "es" : "en");
      },
    };
  }, [locale]);

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
