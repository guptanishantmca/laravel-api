import { PropsWithChildren, ReactNode, useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
export default function Sidebar({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile sidebar toggle state
    const [isUsersOpen, setIsUsersOpen] = useState(false);
    const [isReportsOpen, setIsReportsOpen] = useState(false);
    const [isSalesReportsOpen, setIsSalesReportsOpen] = useState(false);
    const { t } = useTranslation('sidenav');
    return (
        <div className="flex">
            {/* Mobile Toggle Button */}
            <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 text-white bg-gray-800 md:hidden"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16m-7 6h7"
                    />
                </svg>
            </button>

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-40 w-64 bg-gray-800 text-white transform ${
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                } transition-transform md:relative md:translate-x-0`}
            >
                {/* Sidebar Header */}
                <div className="px-6 py-4">
                    <h1 className="text-xl font-bold">Admin Panel</h1>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-2 space-y-2">
                    {/* Dashboard Link */}
                    <Link className='block px-4 py-2 rounded hover:bg-gray-700' href={route('dashboard')}>
                    {t('dashboard')} 
        </Link>
         

                    {/* Users Section */}
                    <div className="space-y-1">
                        <button
                            onClick={() => setIsUsersOpen(!isUsersOpen)}
                            className="flex items-center justify-between w-full px-4 py-2 rounded hover:bg-gray-700"
                        >
                            <span>{t('users')} </span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className={`w-5 h-5 transform transition-transform ${
                                    isUsersOpen ? 'rotate-180' : ''
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
                        {isUsersOpen && (
                            <div className="pl-6 space-y-1">
                                <Link className='block px-4 py-2 rounded hover:bg-gray-700' href={route('users')}>
                                {t('all_users')} 
                                        </Link>
                                <a
                                    href="/users/create"
                                    className="block px-4 py-2 rounded hover:bg-gray-700"
                                >
                                     {t('create_users')} 
                                </a>
                            </div>
                        )}
                    </div>

                    {/* Reports Section */}
                    <div className="space-y-1">
                        <button
                            onClick={() => setIsReportsOpen(!isReportsOpen)}
                            className="flex items-center justify-between w-full px-4 py-2 rounded hover:bg-gray-700"
                        >
                            <span>Reports</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className={`w-5 h-5 transform transition-transform ${
                                    isReportsOpen ? 'rotate-180' : ''
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
                        {isReportsOpen && (
                            <div className="pl-6 space-y-1">
                                <button
                                    onClick={() => setIsSalesReportsOpen(!isSalesReportsOpen)}
                                    className="flex items-center justify-between w-full px-4 py-2 rounded hover:bg-gray-700"
                                >
                                    <span>Sales Reports</span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className={`w-5 h-5 transform transition-transform ${
                                            isSalesReportsOpen ? 'rotate-180' : ''
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
                                {isSalesReportsOpen && (
                                    <div className="pl-6 space-y-1">
                                        <a
                                            href="/reports/sales/summary"
                                            className="block px-4 py-2 rounded hover:bg-gray-700"
                                        >
                                            Sales Summary
                                        </a>
                                        <a
                                            href="/reports/sales/regions"
                                            className="block px-4 py-2 rounded hover:bg-gray-700"
                                        >
                                            Regional Sales
                                        </a>
                                    </div>
                                )}
                                <a
                                    href="/reports/audit"
                                    className="block px-4 py-2 rounded hover:bg-gray-700"
                                >
                                    Audit Reports
                                </a>
                            </div>
                        )}
                    </div>

                    {/* Settings Link */}
                    <a href="/settings" className="block px-4 py-2 rounded hover:bg-gray-700">
                        Settings
                    </a>
                </nav>

                {/* Logout */}
                <div className="px-6 py-4">
                    <a
                        href="/logout"
                        className="block px-4 py-2 rounded bg-red-600 hover:bg-red-500 text-center"
                    >
                        Logout
                    </a>
                </div>
            </aside>

            {/* Overlay for Mobile */}
            {isSidebarOpen && (
                <div
                    onClick={() => setIsSidebarOpen(false)}
                    className="fixed inset-0 bg-black bg-opacity-50 md:hidden"
                ></div>
            )}

            {/* Main Content */}
            <main className="flex-1">{children}</main>
        </div>
    );
}



// import ApplicationLogo from '@/Components/ApplicationLogo';
// import Dropdown from '@/Components/Dropdown';
// import NavLink from '@/Components/NavLink';
// import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
// import { Link, usePage } from '@inertiajs/react';
// import { PropsWithChildren, ReactNode, useState } from 'react';

// export default function Sidebar({
//     header,
//     children,
// }: PropsWithChildren<{ header?: ReactNode }>) {
//     const user = usePage().props.auth.user;

//     const [showingNavigationDropdown, setShowingNavigationDropdown] =
//         useState(false);

//     return (
// <aside className="w-64 bg-gray-800 text-white flex flex-col">
//         <div className="px-6 py-4">
//             <h1 className="text-xl font-bold">Admin Panel</h1>
//         </div>
//         <nav className="flex-1 px-2 space-y-2">
//             {/* <!-- Dashboard Link --> */}
//             <a href="/dashboard" className="block px-4 py-2 rounded hover:bg-gray-700">
//                 Dashboard
//             </a>

//             {/* <!-- Users Section --> */}
//             <div x-data="{ open: false }" class="space-y-1">
//                 <button
//                     @click="open = !open"
//                     className="flex items-center justify-between w-full px-4 py-2 rounded hover:bg-gray-700"
//                 >
//                     <span>Users</span>
//                     <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         :class="{'rotate-180': open}"
//                         className="w-5 h-5 transform transition-transform"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                     >
//                         <path
//                             stroke-linecap="round"
//                             stroke-linejoin="round"
//                             stroke-width="2"
//                             d="M19 9l-7 7-7-7"
//                         />
//                     </svg>
//                 </button>
//                 <div x-show="open" className="pl-6 space-y-1" x-cloak>
//                     <a href="/users/all" className="block px-4 py-2 rounded hover:bg-gray-700">
//                         All Users
//                     </a>
//                     <a href="/users/create" className="block px-4 py-2 rounded hover:bg-gray-700">
//                         Create User
//                     </a>
//                 </div>
//             </div>

//             {/* <!-- Reports Section --> */}
//             <div x-data="{ open: false }" className="space-y-1">
//                 <button
//                     @click="open = !open"
//                     className="flex items-center justify-between w-full px-4 py-2 rounded hover:bg-gray-700"
//                 >
//                     <span>Reports</span>
//                     <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         :class="{'rotate-180': open}"
//                         className="w-5 h-5 transform transition-transform"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                     >
//                         <path
//                             stroke-linecap="round"
//                             stroke-linejoin="round"
//                             stroke-width="2"
//                             d="M19 9l-7 7-7-7"
//                         />
//                     </svg>
//                 </button>
//                 <div x-show="open" className="pl-6 space-y-1" x-cloak>
//                     <a href="/reports/sales" className="block px-4 py-2 rounded hover:bg-gray-700">
//                         Sales Reports
//                     </a>
//                     <a href="/reports/audit" className="block px-4 py-2 rounded hover:bg-gray-700">
//                         Audit Reports
//                     </a>
//                 </div>
//             </div>

//             {/* <!-- Settings Link --> */}
//             <a href="/settings" className="block px-4 py-2 rounded hover:bg-gray-700">
//                 Settings
//             </a>
//         </nav>
//         <div className="px-6 py-4">
//             <a href="/logout" className="block px-4 py-2 rounded bg-red-600 hover:bg-red-500 text-center">
//                 Logout
//             </a>
//         </div>
//     </aside>

//         // <aside
//         //     className="w-64 bg-gray-800 text-white flex flex-col fixed md:relative transform -translate-x-full md:translate-x-0 transition-transform duration-200"
//         //     id="sidebar"
//         // >

//         //     <div className="px-6 py-4">
//         //         <h1 className="text-xl font-bold">Admin Panel</h1>
//         //     </div>
//         //     <nav className="flex-1 px-2 space-y-2">
//         //         <Link className='block px-4 py-2 rounded hover:bg-gray-700' href={route('dashboard')}>
//         //             Dashboard
//         //         </Link>
//         //         <Link className='block px-4 py-2 rounded hover:bg-gray-700' href={route('users')}>
//         //             Users
//         //         </Link>

//         //         <a href="/settings" className="block px-4 py-2 rounded hover:bg-gray-700">
//         //             Settings
//         //         </a>
//         //         <a href="/reports" className="block px-4 py-2 rounded hover:bg-gray-700">
//         //             Reports
//         //         </a>
//         //     </nav>
//         //     <div className="px-6 py-4">
//         //         <a href="/logout" className="block px-4 py-2 rounded bg-red-600 hover:bg-red-500 text-center">
//         //             Logout
//         //         </a>
//         //     </div>
//         // </aside>


//     );
// }
