import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translations from './utils/loadLanguage';
const resources = translations;
i18n
  .use(initReactI18next)
  .init({
    lng: 'en', // Default language
    fallbackLng: 'en',
    debug: true,
    interpolation: {
      escapeValue: false, // React already escapes by default
    },
  });

export const setInitialLocale = (locale: string) => {
    console.log('i18n',locale);
    i18n.changeLanguage(locale);
    localStorage.setItem('language', locale); // Save language preference in localStorage
  
    
};

export default i18n;
