import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

const langs = ["en", "am"];
i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: false,
    whitelist: langs,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: [
        "cookie",
        "localStorage",
        "sessionStorage",
        "querystring",
        "htmlTag",
      ],
      cache: ["cookie"],
    },
  });

export default i18n;
