import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
    .use(initReactI18next)
    .init({
        lng: localStorage.getItem('language') || "en", // Prefer localStorage, fallback to "en"
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false, // React already escapes values
        },
        resources: {}, // Load resources dynamically if needed
    });

export const setInitialLocale = (locale: string) => {
    i18n.changeLanguage(locale);
    localStorage.setItem('language', locale); // Save language preference in localStorage
    console.log('Locale changed to:', locale);
    
};

export default i18n;
