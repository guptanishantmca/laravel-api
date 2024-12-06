import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import i18n, { setInitialLocale } from './i18n'; // i18n setup
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { I18nextProvider } from 'react-i18next';



const appName = import.meta.env.VITE_APP_NAME || 'Laravel';
interface InitialProps {
    props: {
        initialPage: {
            props: {
                locale?: string;
                translations?: Record<string, any>;
            };
        };
    };
}

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(`./Pages/${name}.tsx`, import.meta.glob('./Pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);


        // const { translations, locale } = props.initialPage.props;
        const { locale, translations } = props.initialPage.props;


        const savedLanguage = localStorage.getItem('language') || 'en';
        i18n.changeLanguage(savedLanguage);
        setInitialLocale(savedLanguage);
        // Set initial locale and preload translations
        if (locale && translations) {
            console.log('Translations object:', translations);
            Object.entries(translations).forEach(([namespace, data]) => {
                console.log(`Adding namespace: ${namespace}`, data);
                i18n.addResourceBundle(locale, namespace, data, true, true);
            });
            i18n.changeLanguage(locale); // Ensure this happens after adding the namespaces
        }
        
        
        

        if (translations) {
            Object.entries(translations).forEach(([namespace, data]) => {
                i18n.addResources(savedLanguage, namespace, data);
            });
            i18n.changeLanguage(savedLanguage);
        }


        root.render(<React.StrictMode>
            
                <App {...props} />
 
            
        </React.StrictMode>
    
        
        );
    },
    progress: {
        color: '#4B5563',
    },
});
    