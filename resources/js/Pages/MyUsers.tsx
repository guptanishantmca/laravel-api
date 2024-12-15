// import React, { useState } from 'react';
// import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
// import Sidebar from '@/Layouts/Sidebar';
// import { Head, useForm } from '@inertiajs/react';
// import { useTranslation } from 'react-i18next';
// import useLoadNamespaces from '@/hooks/useLoadNamespaces';

// interface User {
//     id: number;
//     name: string;
//     email: string;
//     role: string; // Add role property
//     created_at: string;
// }

// interface NewPageProps {
//     users: User[];
//     roles: string[]; // List of available roles
//     currentNamespaces: string[];
// }

// const MyUsers: React.FC<NewPageProps> = ({ users, roles }) => {

//     const { t } = useTranslation('users');
//     const isLoaded = useLoadNamespaces(['users']);
//     const [showForm, setShowForm] = useState(false);
//     const [isEditing, setIsEditing] = useState(false);
//     const [currentUserId, setCurrentUserId] = useState<number | null>(null);

//     const { data, setData, post, put, delete: destroy, reset, errors } = useForm({
//         name: '',
//         email: '',
//         role: '', // Add role to form data
//     });

//     if (!isLoaded) {
//         return <div>Loading translations...</div>;
//     }

//     const handleFormSubmit = (e: React.FormEvent) => {
//         e.preventDefault();

//         if (isEditing && currentUserId) {
//             put(`/users/${currentUserId}`, {
//                 onSuccess: () => {
//                     reset();
//                     setShowForm(false);
//                     setIsEditing(false);
//                     setCurrentUserId(null);
//                 },
//             });
//         } else {
//             post('/users', {
//                 onSuccess: () => {
//                     reset();
//                     setShowForm(false);
//                 },
//             });
//         }
//     };

//     const handleEditClick = (user: User) => {

//         setData({
//             name: user.name,
//             email: user.email,
//             role: user.role, // Populate role for editing
//         });
//         setCurrentUserId(user.id);
//         setIsEditing(true);
//         setShowForm(true);
//     };

//     const handleDeleteClick = (userId: number) => {
//         if (confirm(t('Are you sure you want to delete this user?'))) {
//             destroy(`/users/${userId}`, {
//                 onSuccess: () => {
//                     setCurrentUserId(null);
//                 },
//             });
//         }
//     };

//     return (
//         <AuthenticatedLayout
//             currentNamespaces={['users']}
//             header={
//                 <h2 className="text-xl font-semibold leading-tight text-gray-800">
//                     {t('title')}
//                 </h2>
//             }
//         >
//             <div className="flex h-screen bg-gray-100">
//                 {/* Sidebar */}
//                 <Sidebar />

//                 {/* Main Content */}
//                 <div className="flex-1 p-6 overflow-auto">
//                     {/* Card Wrapper */}
//                     <div className="bg-white shadow-md rounded-lg p-6 max-w-8xl mx-auto">
//                         <div className="p-6">
//                             <Head title={t('Users List')} />
//                             <h1 className="text-2xl font-bold mb-4">{t('users_list')}</h1>

//                             {/* Add User Button */}
//                             <button
//                                 onClick={() => {
//                                     setShowForm(!showForm);
//                                     setIsEditing(false);
//                                     reset();
//                                 }}
//                                 className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//                             >
//                                 {t('add_user')}
//                             </button>



//                             {/* User Form */}
//                             {showForm && (
//                                 <form onSubmit={handleFormSubmit} className="mb-6 p-4 border rounded bg-gray-50">
//                                     <div className="mb-4">
//                                         <label className="block text-sm font-medium text-gray-700">
//                                             {t('Name')}
//                                         </label>
//                                         <input
//                                             type="text"
//                                             value={data.name}
//                                             onChange={(e) => setData('name', e.target.value)}
//                                             className="mt-1 p-2 block w-full border rounded-md"
//                                         />
//                                         {errors.name && (
//                                             <p className="text-red-500 text-sm">{errors.name}</p>
//                                         )}
//                                     </div>
//                                     <div className="mb-4">
//                                         <label className="block text-sm font-medium text-gray-700">
//                                             {t('Email')}
//                                         </label>
//                                         <input
//                                             type="email"
//                                             value={data.email}
//                                             onChange={(e) => setData('email', e.target.value)}
//                                             className="mt-1 p-2 block w-full border rounded-md"
//                                         />
//                                         {errors.email && (
//                                             <p className="text-red-500 text-sm">{errors.email}</p>
//                                         )}
//                                     </div>
//                                     <div className="mb-4">
//                                         <label className="block text-sm font-medium text-gray-700">
//                                             {t('Role')}
//                                         </label>
//                                         <select
//                                             value={data.role || ''} // Default to an empty string if data.role is undefined
//                                             onChange={(e) => setData('role', e.target.value)}
//                                             className="mt-1 p-2 block w-full border rounded-md"
//                                         >
//                                             <option value="">{t('Select a Role')}</option>
//                                             {roles.map((role) => (
//                                                 <option key={role} value={role}>
//                                                     {role}
//                                                 </option>
//                                             ))}
//                                         </select>


//                                         {errors.role && (
//                                             <p className="text-red-500 text-sm">{errors.role}</p>
//                                         )}
//                                     </div>
//                                     <div>
//                                         <button
//                                             type="submit"
//                                             className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
//                                         >
//                                             {isEditing ? t('update') : t('save')}
//                                         </button>
//                                         <button
//                                             type="button"
//                                             onClick={() => {
//                                                 setShowForm(false);
//                                                 setIsEditing(false);
//                                                 reset();
//                                             }}
//                                             className="ml-2 px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
//                                         >
//                                             {t('cancel')}
//                                         </button>
//                                     </div>
//                                 </form>
//                             )}

//                             {/* Users Table */}
//                             <table className="min-w-full bg-white border border-gray-300">
//                                 <thead>
//                                     <tr>
//                                         <th className="px-4 py-2 border">{t('ID')}</th>
//                                         <th className="px-4 py-2 border">{t('Name')}</th>
//                                         <th className="px-4 py-2 border">{t('Email')}</th>
//                                         <th className="px-4 py-2 border">{t('Role')}</th>
//                                         <th className="px-4 py-2 border">{t('Joined')}</th>
//                                         <th className="px-4 py-2 border">{t('Actions')}</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {users.map((user) => (
//                                         <tr key={user.id}>
//                                             <td className="px-4 py-2 border">{user.id}</td>
//                                             <td className="px-4 py-2 border">{user.name}</td>
//                                             <td className="px-4 py-2 border">{user.email}</td>
//                                             <td className="px-4 py-2 border">{user.role}</td>
//                                             <td className="px-4 py-2 border">
//                                                 {new Date(user.created_at).toLocaleDateString()}
//                                             </td>
//                                             <td className="px-4 py-2 border">
//                                                 <button
//                                                     onClick={() => handleEditClick(user)}
//                                                     className="mr-2 px-4 py-2 bg-green-700 text-white rounded hover:bg-green-600"
//                                                 >
//                                                     {t('edit')}
//                                                 </button>
//                                                 <button
//                                                     onClick={() => handleDeleteClick(user.id)}
//                                                     className="px-4 py-2 bg-red-700 text-white rounded hover:bg-red-600"
//                                                 >
//                                                     {t('delete')}
//                                                 </button>
//                                             </td>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </table>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </AuthenticatedLayout>
//     );
// };

// export default MyUsers;

import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Sidebar from '@/Layouts/Sidebar';
import { Head, useForm } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import useLoadNamespaces from '@/hooks/useLoadNamespaces';
import Table from '@/Components/Table';

interface User {
    id: number;
    name: string;
    email: string;
    role: string; // Add role property
    created_at: string;
}

interface NewPageProps {
    users: User[];
    roles: string[]; // List of available roles
    currentNamespaces: string[];
}

const MyUsers: React.FC<NewPageProps> = ({ users, roles }) => {

    const { t } = useTranslation('users');
    const isLoaded = useLoadNamespaces(['users']);
    const [showForm, setShowForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentUserId, setCurrentUserId] = useState<number | null>(null);

    const { data, setData, post, put, delete: destroy, reset, errors } = useForm({
        name: '',
        email: '',
        role: '', // Add role to form data
    });

    if (!isLoaded) {
        return <div>Loading translations...</div>;
    }

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isEditing && currentUserId) {
            put(`/users/${currentUserId}`, {
                onSuccess: () => {
                    reset();
                    setShowForm(false);
                    setIsEditing(false);
                    setCurrentUserId(null);
                },
            });
        } else {
            post('/users', {
                onSuccess: () => {
                    reset();
                    setShowForm(false);
                },
            });
        }
    };

    const handleEditClick = (user: User) => {

        setData({
            name: user.name,
            email: user.email,
            role: user.role, // Populate role for editing
        });
        setCurrentUserId(user.id);
        setIsEditing(true);
        setShowForm(true);
    };

    const handleDeleteClick = (userId: number) => {
        if (confirm(t('Are you sure you want to delete this user?'))) {
            destroy(`/users/${userId}`, {
                onSuccess: () => {
                    setCurrentUserId(null);
                },
            });
        }
    };
    const columns = [
        { header: t('ID'), accessor: 'id' },
        { header: t('Name'), accessor: 'name' },
        { header: t('Email'), accessor: 'email' },
        { header: t('Role'), accessor: 'role' },
        { header: t('Joined'), accessor: (user: User) => new Date(user.created_at).toLocaleDateString() },
        {
            header: t('Actions'),
            accessor: (user: User) => (
                <>
                    <button
                        onClick={() => handleEditClick(user)}
                        className="mr-2 px-4 py-2 bg-green-700 text-white rounded hover:bg-green-600"
                    >
                        {t('edit')}
                    </button>
                    <button
                        onClick={() => handleDeleteClick(user.id)}
                        className="px-4 py-2 bg-red-700 text-white rounded hover:bg-red-600"
                    >
                        {t('delete')}
                    </button>
                </>
            ),
        },
    ];
    return (
        <AuthenticatedLayout
            currentNamespaces={['users']}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    {t('title')}
                </h2>
            }
        >
            
           
                

                {/* Main Content */}
                <div className="flex-1 p-6 overflow-auto">
                    {/* Card Wrapper */}
                    <div className="bg-white shadow-md rounded-lg p-6 max-w-8xl mx-auto">
                        <div className="p-6">
                            <Head title={t('Users List')} />
                            <h1 className="text-2xl font-bold mb-4">{t('users_list')}</h1>

                            {/* Add User Button */}
                            <button
                                onClick={() => {
                                    setShowForm(!showForm);
                                    setIsEditing(false);
                                    reset();
                                }}
                                className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                {t('add_user')}
                            </button>



                            {/* User Form */}
                            {showForm && (
                                <form onSubmit={handleFormSubmit} className="mb-6 p-4 border rounded bg-gray-50">
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">
                                            {t('Name')}
                                        </label>
                                        <input
                                            type="text"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            className="mt-1 p-2 block w-full border rounded-md"
                                        />
                                        {errors.name && (
                                            <p className="text-red-500 text-sm">{errors.name}</p>
                                        )}
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">
                                            {t('Email')}
                                        </label>
                                        <input
                                            type="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            className="mt-1 p-2 block w-full border rounded-md"
                                        />
                                        {errors.email && (
                                            <p className="text-red-500 text-sm">{errors.email}</p>
                                        )}
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">
                                            {t('Role')}
                                        </label>
                                        <select
                                            value={data.role || ''} // Default to an empty string if data.role is undefined
                                            onChange={(e) => setData('role', e.target.value)}
                                            className="mt-1 p-2 block w-full border rounded-md"
                                        >
                                            <option value="">{t('Select a Role')}</option>
                                            {roles.map((role) => (
                                                <option key={role} value={role}>
                                                    {role}
                                                </option>
                                            ))}
                                        </select>


                                        {errors.role && (
                                            <p className="text-red-500 text-sm">{errors.role}</p>
                                        )}
                                    </div>
                                    <div>
                                        <button
                                            type="submit"
                                            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                                        >
                                            {isEditing ? t('update') : t('save')}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setShowForm(false);
                                                setIsEditing(false);
                                                reset();
                                            }}
                                            className="ml-2 px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                                        >
                                            {t('cancel')}
                                        </button>
                                    </div>
                                </form>
                            )}

                            {/* Users Table */}
                           
                            <table className="min-w-full bg-white border border-gray-300">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-2 border">{t('ID')}</th>
                                        <th className="px-4 py-2 border">{t('Name')}</th>
                                        <th className="px-4 py-2 border">{t('Email')}</th>
                                        <th className="px-4 py-2 border">{t('Role')}</th>
                                        <th className="px-4 py-2 border">{t('Joined')}</th>
                                        <th className="px-4 py-2 border">{t('Actions')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user) => (
                                        <tr key={user.id}>
                                            <td className="px-4 py-2 border">{user.id}</td>
                                            <td className="px-4 py-2 border">{user.name}</td>
                                            <td className="px-4 py-2 border">{user.email}</td>
                                            <td className="px-4 py-2 border">{user.role}</td>
                                            <td className="px-4 py-2 border">
                                                {new Date(user.created_at).toLocaleDateString()}
                                            </td>
                                            <td className="px-4 py-2 border">
                                                <button
                                                    onClick={() => handleEditClick(user)}
                                                    className="mr-2 px-4 py-2 bg-green-700 text-white rounded hover:bg-green-600"
                                                >
                                                    {t('edit')}
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteClick(user.id)}
                                                    className="px-4 py-2 bg-red-700 text-white rounded hover:bg-red-600"
                                                >
                                                    {t('delete')}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
           
        </AuthenticatedLayout>
    );
};

export default MyUsers;
