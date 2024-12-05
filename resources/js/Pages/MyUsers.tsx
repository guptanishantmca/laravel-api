import React,{useEffect} from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Sidebar from '@/Layouts/Sidebar';
import { Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import i18n from '@/i18n';

interface User {
    id: number;
    name: string;
    email: string;
    created_at: string;
}

interface NewPageProps {
    users: User[];
}

const MyUsers: React.FC<NewPageProps> = ({ users }) => {
    const { t } = useTranslation('users');
    useEffect(() => {
        i18n.loadNamespaces('users'); // Dynamically load the 'dashboard' namespace
      }, []);
    console.log('asasas',localStorage.getItem('language'),useTranslation('users'));

    return (
        <AuthenticatedLayout  currentNamespaces={['users']}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    {t('title')} 
                </h2>
            }
        >
            <div className="flex h-screen bg-gray-100">
                {/* <!-- Sidebar --> */}
                <Sidebar></Sidebar>
                {/* <!-- Main Content --> */}
                <div className="flex-1 p-6 overflow-auto">
                    <div className="p-6">
                        <Head title={t('Users List')} />
                        <h1 className="text-2xl font-bold mb-4">{t('users_list')} </h1>
                        <table className="min-w-full bg-white border border-gray-300">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 border">{t('ID')} </th>
                                    <th className="px-4 py-2 border">{t('Name')} </th>
                                    <th className="px-4 py-2 border">{t('Email')} </th>
                                    <th className="px-4 py-2 border">{t('Joined')} </th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.id}>
                                        <td className="px-4 py-2 border">{user.id}</td>
                                        <td className="px-4 py-2 border">{user.name}</td>
                                        <td className="px-4 py-2 border">{user.email}</td>
                                        <td className="px-4 py-2 border">{new Date(user.created_at).toLocaleDateString()}</td>
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
