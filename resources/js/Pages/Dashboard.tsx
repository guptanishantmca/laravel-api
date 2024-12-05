import React,{useEffect} from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Sidebar from '@/Layouts/Sidebar';
import { Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import i18n from '@/i18n';
 
//import { loadLocale } from '@/i18n';

export default function Dashboard() {
    const { t } = useTranslation('dashboard'); // Use the 'dashboard' namespace
    useEffect(() => {
        i18n.loadNamespaces('dashboard'); // Dynamically load the 'dashboard' namespace
      }, []);
  
    return (
        <AuthenticatedLayout  currentNamespaces={['dashboard']}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    {t('dashboard')} 
                </h2>
            }
        >
            <Head title="Dashboard" />
            <div className="flex h-screen bg-gray-100">
            {/* <!-- Sidebar --> */}         
            <Sidebar></Sidebar>
            {/* <!-- Main Content --> */}
            <div className="flex-1 p-6 overflow-auto">
                <h1 className="text-2xl font-bold mb-4">{t('welcome')} </h1>
                <p className="text-gray-600">{t('welcome_message')}</p>
            </div>
        </div>            
            
        </AuthenticatedLayout>

    
    );
}
