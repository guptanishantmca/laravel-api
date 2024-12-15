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
import Sidebar from '@/Layouts/Sidebar';
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
  export default function AuthenticatedLayout({
    header, // Dynamic page-specific header
    children, // Dynamic page-specific content
    currentNamespaces,
}: PropsWithChildren<AuthenticatedProps>) {
    useEffect(() => {
        if (!currentNamespaces || currentNamespaces.length === 0) {
            console.warn('currentNamespaces is not defined. Falling back to default namespaces.');
        }
    }, [currentNamespaces]);

    const user = usePage().props.auth.user;
    const { t } = useTranslation('header');

    return (
        <div className="min-h-screen flex bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-800 flex flex-col">
                {/* Logo at the top */}
                <div className="flex items-center justify-center p-4 border-b bg-white">
                    <Link href="/">
                        <ApplicationLogo className="block h-8 w-auto fill-current text-gray-800" />
                    </Link>
                </div>
                {/* Sidebar Navigation */}
                <div className="flex-1">
                    <Sidebar />
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <nav className="bg-white border-b border-gray-100">
                    <div className="flex items-center justify-between px-6 h-16">
                        {/* Left Navigation Links */}
                        <div className="flex items-center space-x-4">
                            <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                                {t('dashboard')}
                            </NavLink>
                            <NavLink href={route('users')} active={route().current('users')}>
                                {t('my_users')}
                            </NavLink>
                        </div>
                        {/* Right User Dropdown */}
                        <div className="flex items-center space-x-4">
                            {/* Language Switcher */}
                            <LanguageSwitcher currentNamespaces={currentNamespaces} />
                            {/* User Dropdown */}
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button className="inline-flex items-center">
                                        {user.name}
                                        <svg
                                            className="ml-2 h-4 w-4"
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
                </nav>

                {/* Main Section */}
                <main className="flex-1 p-6">
                    {/* {header && (
                        <header className="mb-4 bg-white shadow">
                            <div className="px-4 py-6">{header}</div>
                        </header>
                    )} */}
                    {children}
                </main>
            </div>
        </div>
    );
}


