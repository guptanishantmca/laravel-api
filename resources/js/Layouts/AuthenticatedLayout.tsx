import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { PropsWithChildren, ReactNode, useState } from 'react';
import i18n from '../i18n';
import LanguageSwitcher from '@/Components/LanguageSwitcher';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
interface HeaderProps {
    currentNamespaces: string[];
}
interface AuthenticatedProps {
    header?: ReactNode;
    currentNamespaces: string[]; // New Prop
}

interface Language {
    [key: string]: string; // Example: { en: 'English', es: 'Español' }
  }
export default function Authenticated({
    header,
    children,
    currentNamespaces, // Receive currentNamespaces here
}: PropsWithChildren<AuthenticatedProps>) {
    useEffect(() => {
         
        if (!currentNamespaces || currentNamespaces.length === 0) {
            console.warn('currentNamespaces is not defined. Falling back to default namespaces.');
        }
    }, [currentNamespaces]);
    const user = usePage().props.auth.user;
    const { t } = useTranslation('header');
    
 
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);
        const { locale, languages } = usePage().props as unknown as {
            locale: string;
            languages: Language;
          };
          const handleChangeLanguage = async (locale: string) => {
            try {
                const response = await fetch('/switch-language', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || '',
                    },
                    body: JSON.stringify({ locale }),
                });
    
                if (!response.ok) {
                    throw new Error('Failed to switch language');
                }
    
                const data = await response.json();
                
                i18n.changeLanguage(locale);
                localStorage.setItem('language', locale);
                // Reload the page to apply the new locale
              //   window.location.reload();
            } catch (error) {
                console.error('Error switching language:', error);
            }
        };
        
        
    return (
        
        <div className="min-h-screen bg-gray-100">
        <nav className="border-b border-gray-100 bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 justify-between">
                    <div className="flex">
                        <div className="flex shrink-0 items-center">
                            <Link href="/">
                                <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                            </Link>
                        </div>
    
                        <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                            <NavLink
                                href={route('dashboard')}
                                active={route().current('dashboard')}
                            >
                                 {t('dashboard')} 
                            </NavLink>
                            <NavLink
                                href={route('users')}
                                active={route().current('users')}
                            >
                                 {t('my_users')} 
                            </NavLink>
                        </div>
                    </div>
    
                    <div className="flex items-center">
                        {/* Language Switcher */}
                        <LanguageSwitcher currentNamespaces={currentNamespaces} />
                        {/* <div className="hidden sm:flex space-x-4">
                            <button
                                onClick={() => handleChangeLanguage('en')}
                                className={`text-sm font-medium ${
                                    locale === 'en' ? 'text-gray-900' : 'text-gray-500'
                                } hover:underline`}
                            >
                                EN
                            </button>
                            <button
                                onClick={() => handleChangeLanguage('fi')}
                                className={`text-sm font-medium ${
                                    locale === 'fi' ? 'text-gray-900' : 'text-gray-500'
                                } hover:underline`}
                            >
                                FI
                            </button>
                        </div> */}

    
                        {/* Message Icon */}
                        <button className="ml-6 text-gray-500 hover:text-gray-700 focus:outline-none">
                            <svg
                                className="h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M3 8l7.89 5.26a3 3 0 003.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                />
                            </svg>
                        </button>
    
                        {/* Notification Icon */}
                        <button className="ml-6 text-gray-500 hover:text-gray-700 focus:outline-none">
                            <svg
                                className="h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11c0-2.21-1.343-4.004-3.284-4.74A2 2 0 0013 5V4a1 1 0 10-2 0v1a2 2 0 00-1.716 1.26C8.343 6.996 7 8.79 7 11v3.159c0 .415-.162.82-.451 1.119L5 17h5m0 0v1a3 3 0 006 0v-1m-6 0h6"
                                />
                            </svg>
                        </button>
    
                        {/* Profile Dropdown */}
                        <div className="relative ms-3">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <span className="inline-flex rounded-md">
                                        <button
                                            type="button"
                                            className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"
                                        >
                                            {user.name}
    
                                            <svg
                                                className="-me-0.5 ms-2 h-4 w-4"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>
                                    </span>
                                </Dropdown.Trigger>
    
                                <Dropdown.Content>
                                    <Dropdown.Link href={route('profile.edit')}>
                                    {t('profile')} 
                                    </Dropdown.Link>
                                    <Dropdown.Link
                                        href={route('logout')}
                                        method="post"
                                        as="button"
                                    >
                                         {t('logout')} 
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </div>
    
            {/* Mobile Navigation */}
            <div
                className={
                    (showingNavigationDropdown ? 'block' : 'hidden') +
                    ' sm:hidden'
                }
            >
                <div className="space-y-1 pb-3 pt-2">
                    <ResponsiveNavLink
                        href={route('dashboard')}
                        active={route().current('dashboard')}
                    >
                        {t('dashboard')} 
                    </ResponsiveNavLink>
                </div>
    
                <div className="border-t border-gray-200 pb-1 pt-4">
                    <div className="px-4">
                        <div className="text-base font-medium text-gray-800">
                            {user.name}
                        </div>
                        <div className="text-sm font-medium text-gray-500">
                            {user.email}
                        </div>
                    </div>
    
                    <div className="mt-3 space-y-1">
                        <ResponsiveNavLink href={route('profile.edit')}>
                        {t('profile')} 
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            method="post"
                            href={route('logout')}
                            as="button"
                        >
                            {t('logout')} 
                        </ResponsiveNavLink>
                    </div>
                </div>
            </div>
        </nav>
    
        {header && (
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    {header}
                </div>
            </header>
        )}
    
        <main>{children}</main>
    </div>
    

    );
}
