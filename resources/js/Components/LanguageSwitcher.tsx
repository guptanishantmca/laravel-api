import React from 'react';
import { loadLocale } from '../i18n';

const LanguageSwitcher = () => {
    const changeLanguage = async (locale: string) => {
        await loadLocale(locale);
    };

    return (
        <div>
            <button onClick={() => changeLanguage('en')}>English</button>
            <button onClick={() => changeLanguage('es')}>Español</button>
        </div>
    );
};

export default LanguageSwitcher;
