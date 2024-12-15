import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Sidebar from '@/Layouts/Sidebar';
import { Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import useLoadNamespaces from '@/hooks/useLoadNamespaces';

const Dashboard: React.FC<{ currentNamespaces: string[] }> = ({ currentNamespaces }) => {
    const { t } = useTranslation('dashboard'); // Use the 'dashboard' namespace
    useLoadNamespaces(['dashboard']);

    return (
        <AuthenticatedLayout
            currentNamespaces={['dashboard']}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    {t('dashboard')}
                </h2>
            }
        >
            <Head title="Dashboard" />
           
               

                {/* Main Content */}
                <div className="flex-1 p-6 overflow-auto">
                    {/* Card Wrapper */}
                    <div className="bg-white shadow-md rounded-lg p-6 max-w-8xl mx-auto">
                        <h1 className="text-2xl font-bold mb-4">{t('welcome')}</h1>
                        <p className="text-gray-600">{t('welcome_message')}</p>
                    </div>
                </div>
          
        </AuthenticatedLayout>
    );
};

export default Dashboard;
