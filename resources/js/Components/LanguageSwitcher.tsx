import React from 'react';
import { useTranslation } from 'react-i18next';
import { loadLocale } from './i18n';

const LanguageSwitcher: React.FC = () => {
    const { t } = useTranslation();

    const changeLanguage = async (locale: string) => {
        await loadLocale(locale);
    };

    return (
        <div>
            <h1>{t('welcome')}</h1>
            <button onClick={() => changeLanguage('en')}>English</button>
            <button onClick={() => changeLanguage('fi')}>Finnish</button>
        </div>
    );
};

export default LanguageSwitcher;
