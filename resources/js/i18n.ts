import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translations from './utils/loadLanguage';
import HttpBackend from 'i18next-http-backend';
import sidenav from '../js/assets/locales/en/sidenav.json';
import header from '../js/assets/locales/en/header.json';
 
i18n
.use(HttpBackend)
  .use(initReactI18next)
  .init({
    lng: localStorage.getItem('language') || 'en', // Load from localStorage or fallback to 'en'
    fallbackLng: 'en',
    debug: true,
    backend: {
        loadPath: '/localization/{{lng}}/{{ns}}', 
      },
      resources: {
        en: {
            sidenav: sidenav,
            header: header,
             
        },
    },
    // saveMissing: true,
    interpolation: {
      escapeValue: false, // React already escapes by default
    },
    ns: ['header','sidenav'], // Define namespaces
    defaultNS: 'header',
  });

export const setInitialLocale = (locale: string) => {
    console.log('i18n',locale);
    i18n.changeLanguage(locale);
 
    localStorage.setItem('language', locale); // Save language preference in localStorage
    
    
};

export default i18n;