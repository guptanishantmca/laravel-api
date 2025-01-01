import { format } from 'date-fns';
import { enUS, fi } from 'date-fns/locale';
import i18n from '@/i18n';
import { useSharedProps } from '@/hooks/useSharedProps';

// Supported locales
const locales = { en: enUS, fi };

// Fetch the date format from shared props
export const getDateFormat = (): string => {
    const { date_format } = useSharedProps();
    console.log('useSharedProps()',useSharedProps());
    return date_format || 'PPpp'; // Fallback to default format if undefined
};

// Format a date using shared `date_format` and current language
export const formatDate = (date: string | Date): string => {
    if (!date) return '-'; // Handle invalid dates

    const formatStr = getDateFormat(); // Get shared date format
    const lang = i18n.language as 'en' | 'fi'; // Get current language from i18n
    const selectedLocale = locales[lang] || enUS; // Fallback to English locale

    return format(new Date(date), formatStr, { locale: selectedLocale });
};
