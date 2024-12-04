// src/utils/loadLanguage.ts
import i18next from 'i18next';
const loadLanguage = async (lang: string, namespace: string) => {
    try {
        const module = await import(`../assets/locales/${lang}/${namespace}.json`);
        i18next.addResources(lang, namespace, module.default);
        
        return module.default;
    } catch (error) {
        console.error(`Error loading translations for ${lang}/${namespace}`, error);
        return {};
    }
};

export default loadLanguage;
