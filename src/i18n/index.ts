import { fr, type Dict } from "./fr";
import { ar } from "./ar";
import { en } from "./en";

export const locales = ["fr", "ar", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "fr";

export const localeNames: Record<Locale, string> = {
  fr: "Français",
  ar: "العربية",
  en: "English",
};

export const localeShort: Record<Locale, string> = { fr: "FR", ar: "ع", en: "EN" };

const dicts: Record<Locale, Dict> = { fr, ar, en };

export function isLocale(value: string | undefined): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}

export function normalizeLocale(value: string | undefined): Locale {
  return isLocale(value) ? value : defaultLocale;
}

export function getDict(locale: string | undefined): Dict {
  return dicts[normalizeLocale(locale)];
}

export function dir(locale: string | undefined): "rtl" | "ltr" {
  return normalizeLocale(locale) === "ar" ? "rtl" : "ltr";
}

export type { Dict };
