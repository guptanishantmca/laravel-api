import { usePage } from '@inertiajs/react';

interface SharedProps {
    date_format?: string; // Define additional shared props as needed
    [key: string]: any;   // Allow additional dynamic properties
}

export const useSharedProps = (): SharedProps => {
    return usePage().props as SharedProps;
};
