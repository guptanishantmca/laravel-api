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
    const [activeMenu, setActiveMenu] = useState<'marketplace' | 'my_business' | 'project_management'| 'settings'>('marketplace');
    const toggleSidebar = () => {
        setIsSidebarOpen((prev) => !prev);
    };
    const sidebarNavigation = {
        marketplace: [
            { name: t('dashboard'), route: route('dashboard') },
            { name: t('feeds'), route: route('dashboard') },
            {
                name: t('materials'),
                children: [
                    { name: t('create'), route: route('materials.create') },
                     
                    { name: t('manage'), route: route('materials.index') },
                ],
            },{
                name: t('work'),
                children: [
                    { name: t('create'), route: route('users') },
                     
                    { name: t('manage'), route: route('dashboard') },
                ],
            },
            { name: t('my_action'), route: route('dashboard') },
            { name: t('saved_jobs'), route: route('dashboard') },
            // {
            //     name: t('Reports'),
            //     children: [
            //         { name: t('Sales Reports'), route: route('users') },
            //         {
            //             name: t('Regional Reports'),
            //             children: [
            //                 { name: t('Region 1'), route: route('dashboard') },
            //                 { name: t('Region 2'), route: route('dashboard') },
            //             ],
            //         },
            //         { name: t('Audit Reports'), route: route('dashboard') },
            //     ],
            // },
        ],
        my_business: [
            { name: t('files'),
                children: [
                    { name: t('Add New'), route: route('roles.manage') },
                    
                ],
            },
            { name: t('Client'),
                children: [
                    { name: t('Add New'), route: route('roles.manage') },
                    { name: t('manage'), route: route('dashboard') },
                    
                ],
            },
            { name: t('Offer'),
                children: [
                    { name: t('Create'), route: route('roles.manage') },
                    { name: t('manage'), route: route('dashboard') },
                    
                ],
            },
            { name: t('Template'),
                children: [
                    { name: t('Create'), route: route('roles.manage') },
                    { name: t('manage'), route: route('dashboard') },
                    
                ],
            },
            { name: t('Contract'),
                children: [
                    { name: t('Create'), route: route('roles.manage') },
                    { name: t('manage'), route: route('dashboard') },
                    
                ],
            },
            { name: t('Invoice'),
                children: [
                    { name: t('Create'), route: route('roles.manage') },
                    { name: t('manage'), route: route('dashboard') },
                    
                ],
            },
            { name: t('Report'),
                children: [
                    { name: t('Create'), route: route('roles.manage') },
                    { name: t('manage'), route: route('dashboard') },
                    
                ],
            },
             
        ],
        project_management: [
            { name: t('Create'), route: route('dashboard') },
            { name: t('manage'), route: route('dashboard') },
            { name: t('Archive Project'), route: route('dashboard') },
             
        ],
        settings: [
            { name: t('All Users'), route: route('users') },
            {
                name: t('Roles'),
                children: [
                    { name: t('Manage Roles'), route: route('roles.manage') },
                    { name: t('Assign Permissions'), route: route('dashboard') },
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
        const menuMapping: Record<string, 'marketplace' | 'my_business' | 'project_management' | 'settings'> = {
            marketplace: 'marketplace',
            my_business: 'my_business',
            project_management: 'project_management',
            'roles.manage': 'settings',
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
        
        <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
            {/* Sidebar */}
            <div
                className={`fixed inset-y-0 left-0 z-40 w-64 bg-gray-800 text-white transform ${
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                } transition-transform md:relative md:translate-x-0`}
            >
                <div className="flex items-center justify-center p-4 border-b bg-white">
                     <Link href="/">
                         <ApplicationLogo className="block h-8 w-auto fill-current text-gray-800" />
                     </Link>
                 </div>
                <nav className="px-4 space-y-2">
                     {/* Mobile Top Navigation */}
                        
                     <div className="md:hidden">
                     <div  className="space-y-1">
                            <button
                                onClick={() => setActiveMenu('marketplace')}
                                className={`block px-4 py-2 rounded hover:bg-gray-700 ${
                                    activeMenu === 'marketplace'
                                        ? ''
                                        : ''
                                }`}
                            >
                                {t('marketplace')}
                            </button>
                            </div>
                            <div  className="space-y-1">
                            <button
                                onClick={() => setActiveMenu('my_business')}
                                className={`block px-4 py-2 rounded hover:bg-gray-700 ${
                                    activeMenu === 'my_business'
                                          ? ''
                                        : ''
                                }`}
                            >
                                {t('my_business')}
                            </button>
                            </div>
                            <div  className="space-y-1">
                            <button
                                onClick={() => setActiveMenu('project_management')}
                                className={`block px-4 py-2 rounded hover:bg-gray-700 ${
                                    activeMenu === 'project_management'
                                         ? ''
                                        : ''
                                }`}
                            >
                                {t('project_management')}
                            </button>
                            </div>
                            <div  className="space-y-1">
                            <button
                                onClick={() => setActiveMenu('settings')}
                                className={`block px-4 py-2 rounded hover:bg-gray-700 ${
                                    activeMenu === 'settings'
                                         ? ''
                                        : ''
                                }`}
                            >
                                {t('settings')}
                            </button>
                            </div>
                        </div>
                        {/* Mobile Top Navigation */}
                        <div className="px-6 py-4">
                            <h1 className="text-xl font-bold">{t(activeMenu)}</h1>
                        </div>
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
                                                        className={`w-5 h-5 transform transition-transform ${expandedItems[item.name] ? 'rotate-180' : ''
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
                
            </div>

            {/* Mobile Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
                    onClick={toggleSidebar}
                ></div>
            )}

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <nav className="bg-white border-b border-gray-200">
                    <div className="px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
                        {/* Mobile Sidebar Toggle */}
                        <button
                            onClick={toggleSidebar}
                            className="md:hidden text-gray-500 hover:text-gray-700 focus:outline-none"
                        >
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
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </button>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex flex h-16 space-x-8">
                            <button
                                onClick={() => setActiveMenu('marketplace')}
                                className={`text-sm font-medium ${
                                    activeMenu === 'marketplace'
                                        ? 'text-gray-900 border-b-2 border-indigo-500'
                                        : 'text-gray-500 hover:text-gray-700'
                                }`}
                            >
                                {t('marketplace')}
                            </button>
                            <button
                                onClick={() => setActiveMenu('my_business')}
                                className={`text-sm font-medium ${
                                    activeMenu === 'my_business'
                                        ? 'text-gray-900 border-b-2 border-indigo-500'
                                        : 'text-gray-500 hover:text-gray-700'
                                }`}
                            >
                                {t('my_business')}
                            </button>
                            <button
                                onClick={() => setActiveMenu('project_management')}
                                className={`text-sm font-medium ${
                                    activeMenu === 'project_management'
                                        ? 'text-gray-900 border-b-2 border-indigo-500'
                                        : 'text-gray-500 hover:text-gray-700'
                                }`}
                            >
                                {t('project_management')}
                            </button>
                            <button
                                onClick={() => setActiveMenu('settings')}
                                className={`text-sm font-medium ${
                                    activeMenu === 'settings'
                                        ? 'text-gray-900 border-b-2 border-indigo-500'
                                        : 'text-gray-500 hover:text-gray-700'
                                }`}
                            >
                                {t('settings')}
                            </button>
                        </div>

                       



                        {/* Right Icons */}
                        <div className="flex items-center space-x-4">
                            {/* Language Switcher */}
                            <LanguageSwitcher currentNamespaces={currentNamespaces} />

                            {/* Notifications */}
                            <button className="text-gray-500 hover:text-gray-700">
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
                                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11c0-2.21-1.343-4.004-3.284-4.74A2 2 0 0013 5V4a1 1 0 10-2 0v1a2 2 0 00-1.716 1.26C8.343 6.996 7 8.79 7 11v3.159c0 .415-.162.82-.451 1.119L5 17h5"
                                    />
                                </svg>
                            </button>

                            {/* User Dropdown */}
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button className="flex items-center text-sm font-medium text-gray-700 focus:outline-none">
                                        {user.name}
                                        <svg
                                            className="ml-1 h-4 w-4"
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
                                        {t('Profile')}
                                    </Dropdown.Link>
                                    <Dropdown.Link href={route('logout')} method="post" as="button">
                                        {t('Logout')}
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    </div>
                </nav>

                {/* Main Content */}
                <main className="flex-1 p-6 bg-gray-50">{children}</main>
            </div>
        </div>
    );
}
