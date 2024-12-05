import React from 'react';
import { useTranslation } from 'react-i18next';
import loadLanguage from '../utils/loadLanguage';

interface LanguageSwitcherProps {
    currentNamespaces: string[];
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ currentNamespaces  = ['header'] }) => {
    const { i18n } = useTranslation();

    const globalNamespaces = ['sidenav', 'header']; // Global namespaces for all pages
    const isActiveLanguage = (lang: string) => i18n.language === lang;

    // const changeLanguage = async (lang: string) => {
    //     // Merge global namespaces with current page namespaces
    //     const namespaces = [...globalNamespaces, ...currentNamespaces];

    //     // Load translations dynamically for all required namespaces
    //     await loadLanguage(lang, namespaces);

    //     // Switch to the selected language
    //     i18n.changeLanguage(lang);
    //     localStorage.setItem('language', lang);
    // };
    const changeLanguage = async (locale: string) => {
        try {
            const response = await fetch('/switch-language', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || '',
                },
                body: JSON.stringify({ locale }),
            });

            if (!response.ok) {
                throw new Error('Failed to switch language');
            }

            const data = await response.json();
            
            const namespaces = [...globalNamespaces, ...currentNamespaces];

        // Load translations dynamically for all required namespaces
        await loadLanguage(locale, namespaces);

        // Switch to the selected language
        i18n.changeLanguage(locale);
        localStorage.setItem('language', locale);

            // Reload the page to apply the new locale
          //   window.location.reload();
        } catch (error) {
            console.error('Error switching language:', error);
        }
    };
    return (
        <div className="hidden sm:flex space-x-4">
            <button
                onClick={() => changeLanguage('en')}
                className={`text-sm font-medium ${
                    isActiveLanguage('en') ? 'text-gray-900' : 'text-gray-500'
                } hover:underline`}
            >
                EN
            </button>
            <button
                onClick={() => changeLanguage('fi')}
                className={`text-sm font-medium ${
                    isActiveLanguage('fi') ? 'text-gray-900' : 'text-gray-500'
                } hover:underline`}
            >
                FI
            </button>
        </div>
    );
};

export default LanguageSwitcher;
