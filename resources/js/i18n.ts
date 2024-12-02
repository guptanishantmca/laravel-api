import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const fetchTranslations = async (locale: string, namespace: string) => {
    const response = await fetch(`/localization?locale=${locale}&namespace=${namespace}`);
    if (!response.ok) {
        console.error(`Failed to fetch translations for namespace: ${namespace}`);
        return {};
    }
    const data = await response.json();
    return data.translations;
};

i18n.use(initReactI18next).init({
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false,
    },
    resources: {}, // Translations will be loaded dynamically
    debug: import.meta.env.MODE === 'development',
});

export const loadLocale = async (locale: string, namespace: string) => {
    const translations = await fetchTranslations(locale, namespace);
    i18n.addResources(locale, namespace, translations);
    i18n.changeLanguage(locale);
};

export default i18n;
