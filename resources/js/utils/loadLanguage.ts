// src/utils/loadLanguage.ts
import i18next from 'i18next';
const loadLanguage = async (lang: string, namespace: string[]) => {
    console.log(namespace);
    try {
        for (const ns of namespace) {
            const translations = await import(`../assets/locales/${lang}/${ns}.json`);
            i18next.addResourceBundle(lang, ns, translations.default, true, true);
        }
        // const module = await import(`../assets/locales/${lang}/${namespace}.json`);
        // i18next.addResources(lang, namespace, module.default);
        
        // return module.default;
    } catch (error) {
        console.error(`Error loading translations for ${lang}/${namespace}`, error);
        return {};
    }
};

export default loadLanguage;
