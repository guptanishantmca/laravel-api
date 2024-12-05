// src/utils/loadLanguage.ts
import i18next from 'i18next';

const loadLanguage = async (lang: string, namespaces: string[]) => {
  try {
    await Promise.all(
      namespaces.map(async (ns) => {
        const translations = await import(`../assets/locales/${lang}/${ns}.json`);
        i18next.addResourceBundle(lang, ns, translations, true, true);
         
      })
    );
  } catch (error) {
    console.error('Error loading language files:', error);
  }
};

export default loadLanguage;

