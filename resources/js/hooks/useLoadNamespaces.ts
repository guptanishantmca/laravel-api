import { useEffect, useState } from 'react';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';

const useLoadNamespaces = (namespaces: string[]) => {
    const { i18n } = useTranslation();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const loadNamespaces = async () => {
            setIsLoaded(false);

            try {
                for (const ns of namespaces) {
                    if (!i18n.hasResourceBundle(i18n.language, ns)) {
                        // Dynamically import translations
                        const translations = await import(`../assets/locales/${i18n.language}/${ns}.json`);
                        i18n.addResourceBundle(i18n.language, ns, translations, true, true);
                    }
                }
                setIsLoaded(true);
            } catch (error) {
                console.error('Error loading namespaces:', error);
                setIsLoaded(true); // Allow component to render even if there's an error
            }
        };

        loadNamespaces();
    }, [namespaces, i18n]);

    return isLoaded;
};

export default useLoadNamespaces;
