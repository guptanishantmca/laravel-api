// src/components/LanguageSwitcher.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import loadLanguage from '../utils/loadLanguage';

const LanguageSwitcher: React.FC = () => {
    const { i18n } = useTranslation();
    const isActiveLanguage = (lang: string) => i18n.language === lang;
    const changeLanguage = async (lang: string) => {
        const namespace = [ 'sidenav', 'dashboard']; // Adjust this if using multiple namespaces
       // const translations = await loadLanguage(lang, namespace);
        await loadLanguage(lang, namespace);
        // Add resources dynamically
       // i18n.addResourceBundle(lang, namespace, translations, true, true);
        i18n.changeLanguage(lang);
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

        // <div>
        //     <button onClick={() => changeLanguage('en')}>English</button>
        //     <button onClick={() => changeLanguage('fi')}>Finnish</button>
        // </div>
    );
};

export default LanguageSwitcher;
