import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import translationEN from "./English/translations.json";

export const localResources = {
  en: {
    translation: translationEN,
  },
} as const;

export type SupportedLocales = keyof typeof localResources;

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    compatibilityJSON: "v4",
    resources: localResources,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });
