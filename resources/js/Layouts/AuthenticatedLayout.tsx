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

  const menuItems = [
    {
        label: 'Marketplace',
        link: route('dashboard'),
        children: []
    },
    {
        label: 'My Business',
        link: route('users'),
        children: [
            { label: 'All Users', link: route('users') },
            { label: 'Create User', link: '/users/create' },
        ]
    },
    {
        label: 'Project Management',
        link: route('dashboard'),
        children: []
    },
    {
        label: 'Reports',
        link: '/reports',
        children: [
            { label: 'Sales Summary', link: '/reports/sales/summary' },
            { label: 'Regional Sales', link: '/reports/sales/regions' },
            { label: 'Audit Reports', link: '/reports/audit' },
        ]
    },
    // Add more sections as needed
];

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
    const [activeMenu, setActiveMenu] = useState<'dashboard' | 'users' | 'settings'>('dashboard');

    const sidebarNavigation = {
        dashboard: [
            { name: t('Overview'), route: route('dashboard') },
            { 
                name: t('Reports'), 
                children: [
                    { name: t('Sales Reports'), route: route('users') },
                    {
                        name: t('Regional Reports'),
                        children: [
                            { name: t('Region 1'), route: route('dashboard') },
                            { name: t('Region 2'), route: route('dashboard') },
                        ],
                    },
                    { name: t('Audit Reports'), route: route('dashboard') },
                ],
            },
        ],
        users: [
            { name: t('All Users'), route: route('users') },
            { 
                name: t('Roles'), 
                children: [
                    { name: t('Manage Roles'), route: route('roles.manage') },
                    { name: t('Assign Permissions'), route: route('dashboard') },
                ],
            },
        ],
        settings: [
            { name: t('Profile Settings'), route: route('dashboard') },
            { 
                name: t('Account Settings'), 
                children: [
                    { name: t('Change Password'), route: route('dashboard') },
                    { name: t('Notification Preferences'), route: route('dashboard') },
                ],
            },
        ],
    };
    
    const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({}); // Expand/collapse state for multi-level items
    const toggleExpand = (label: string) => {
        setExpandedItems((prevState) => ({
            ...prevState,
            [label]: !prevState[label],
        }));
    };
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile sidebar toggle state

    useEffect(() => {
        // Define mapping of routes to menus
        const menuMapping: Record<string, 'dashboard' | 'users' | 'settings'> = {
            dashboard: 'dashboard',
            users: 'users',
            'roles.manage': 'users',
            'settings.profile': 'settings',
        };
    
        // Iterate through the menuMapping to determine the active menu
        const currentRoute = Object.keys(menuMapping).find((routeKey) =>
            route().current(routeKey)
        );
    
        if (currentRoute && menuMapping[currentRoute]) {
            setActiveMenu(menuMapping[currentRoute]); // Update active menu
        }
    }, []);
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
                    {/* <Sidebar/> */}
                    <div className="flex">
                        <aside
                className={`fixed inset-y-0 left-0 z-40 w-64 bg-gray-800 text-white transform ${
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                } transition-transform md:relative md:translate-x-0`}
            >
                <div className="px-6 py-4">
                    <h1 className="text-xl font-bold">{activeMenu}</h1>
                </div>
                <nav className="flex-1 px-2 space-y-2">
                {sidebarNavigation[activeMenu].map((item) => (
    <div key={item.name} className="space-y-1">
        {item.children ? (
            <>
                <button
                    onClick={() => toggleExpand(item.name)}
                    className="flex items-center justify-between w-full px-4 py-2 rounded hover:bg-gray-700"
                >
                    <span>{t(item.name)}</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`w-5 h-5 transform transition-transform ${
                            expandedItems[item.name] ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                        />
                    </svg>
                </button>
                {expandedItems[item.name] && (
                    <div className="pl-6 space-y-1">
                        {item.children.map((child) => (
                            <Link
                                key={child.name}
                                href={child.route || '#'}
                                className="block px-4 py-2 rounded hover:bg-gray-700"
                            >
                                {t(child.name)}
                            </Link>
                        ))}
                    </div>
                )}
            </>
        ) : (
            <Link
                href={item.route || '#'}
                className="block px-4 py-2 rounded hover:bg-gray-700"
            >
                {t(item.name)}
            </Link>
        )}
    </div>
))}

</nav>
                </aside>
                </div>
                    {/* <nav>
                        {sidebarNavigation[activeMenu].map((item) => (
                            <NavLink
                                key={item.name}
                                href={item.route}
                                active={route().current(item.route)}
                                className="block px-4 py-2 text-gray-700 hover:bg-gray-300 rounded"
                            >
                                {item.name}
                            </NavLink>
                        ))}
                    </nav> */}
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <nav className="bg-white border-b border-gray-100">
                <div className="flex h-16 justify-between">
                <div className="flex">
                        {/* Left Navigation Links */}
                        <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                        <button
                                onClick={() => setActiveMenu('dashboard')}
                                className={'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ' +`${ 
                                    activeMenu === 'dashboard' ? 'border-indigo-400 text-gray-900 focus:border-indigo-700' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 focus:border-gray-300 focus:text-gray-700'
                                }`}
                            >
                                {t('Dashboard')}
                            </button>
                            <button
                                onClick={() => setActiveMenu('users')}
                                className={'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ' +`${
                                    activeMenu === 'users' ? 'border-indigo-400 text-gray-900 focus:border-indigo-700' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 focus:border-gray-300 focus:text-gray-700'
                                }`}
                            >
                                {t('Users')}
                            </button>
                            <button
                                onClick={() => setActiveMenu('settings')}
                                className={'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ' +`${
                                    activeMenu === 'settings' ? 'border-indigo-400 text-gray-900 focus:border-indigo-700' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 focus:border-gray-300 focus:text-gray-700'
                                }`}
                            >
                                {t('Settings')}
                            </button>
                        {/* <NavLink  onClick={() => setActiveMenu('dashboard')} active={route().current('dashboard')}>
                                {t('Marketplace')}
                            </NavLink>
                            <NavLink  onClick={() => setActiveMenu('users')} active={route().current('users')}>
                                {t('My Business')}
                            </NavLink>
                            <NavLink onClick={() => setActiveMenu('settings')} active={route().current('dashboard')}>
                                {t('Project Management')}
                            </NavLink> */}
                             
                            </div></div>
                        {/* Right User Dropdown */}
                        <div className="flex items-center space-x-4">
                            {/* Language Switcher */}
                            <LanguageSwitcher currentNamespaces={currentNamespaces} />
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
