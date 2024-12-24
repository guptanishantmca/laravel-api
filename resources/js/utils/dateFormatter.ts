import { format } from 'date-fns';
import { enUS, fi } from 'date-fns/locale';
import i18n from '@/i18n';

const DEFAULT_DATE_FORMAT = 'PPpp';  // Example: Dec 24, 2024, 3:47 PM

// Supported locales
const locales = { en: enUS, fi };

// Function to format date with dynamic locale support
export const formatDate = (
    date: string | Date, 
    formatStr: string = DEFAULT_DATE_FORMAT 
): string => {
    if (!date) return '-';  // Handle empty or invalid dates

    // Get the current language from i18n
    const lang = i18n.language as 'en' | 'fi';

    // Select the appropriate locale, fallback to English if not found
    const selectedLocale = locales[lang] || enUS;

    // Format and return the date
    return format(new Date(date), formatStr, { locale: selectedLocale });
};
