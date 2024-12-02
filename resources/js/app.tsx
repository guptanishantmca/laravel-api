import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import i18n from './i18n'; // Your i18n setup

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(`./Pages/${name}.tsx`, import.meta.glob('./Pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        // Preload translations from Inertia props
        const { translations, locale } = props.initialPage.props;
        if (translations) {
            Object.entries(translations).forEach(([namespace, data]) => {
                i18n.addResources(locale, namespace, data);
            });
            i18n.changeLanguage(locale);
        }

        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});
