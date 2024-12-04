import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import i18n, { setInitialLocale,loadTranslations } from './i18n'; // i18n setup
import { useEffect } from 'react';

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
       const { translations, locale } = props.initialPage.props as InitialProps["props"]["initialPage"]["props"];

       
    

        // Set initial locale and preload translations
        if (locale) {
            i18n.changeLanguage(locale);
           
            setInitialLocale(locale); // Save to localStorage
            localStorage.setItem('language', locale);
        }  

        if (translations) {
            Object.entries(translations).forEach(([namespace, data]) => {
                i18n.addResources(locale, namespace, data);
            });
        }
        

        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});
