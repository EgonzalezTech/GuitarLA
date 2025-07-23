import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";

i18n
  // Usar i18next-http-backend para cargar traducciones de forma asíncrona
  .use(Backend)
  // Usar i18next-browser-languagedetector para detectar el idioma del navegador
  .use(LanguageDetector)
  // Pasar la instancia de i18n a react-i18next
  .use(initReactI18next)
  // Inicializar i18next con las opciones de configuración
  .init({
    // Configuración del backend para cargar los archivos JSON
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json", // Ruta a tus archivos de traducción
    },
    // Idioma por defecto si no se detecta ninguno o si una traducción falta
    // Si LanguageDetector está activo, este 'lng' actuará como un fallback inicial
    // antes de que el detector tenga oportunidad de cambiarlo.
    lng: "en", // Por ejemplo, español como idioma inicial
    fallbackLng: "en", // Idioma de respaldo si una clave no se encuentra en el idioma actual

    // Opciones para la detección de idioma (puedes personalizar el orden)
    detection: {
      order: ["navigator", "querystring", "cookie", "localStorage", "htmlTag"],
      caches: ["localStorage", "cookie"], // Guardar el idioma detectado para futuras visitas
    },

    // Namespace por defecto si no se especifica
    defaultNS: "translation",

    // Deshabilita el escape de valores. React ya lo hace para prevenir XSS.
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
