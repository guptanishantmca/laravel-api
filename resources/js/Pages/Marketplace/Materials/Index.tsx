import React from 'react';
import { Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useTranslation } from 'react-i18next';
import useLoadNamespaces from '@/hooks/useLoadNamespaces';
import { Head } from '@inertiajs/react';

const Index: React.FC<{ currentNamespaces: string[]; materials: any }> = ({ currentNamespaces, materials }) => {
    const { t } = useTranslation('dashboard'); // Use the 'dashboard' namespace
    useLoadNamespaces(['dashboard']);
 
    return (
        <AuthenticatedLayout
            currentNamespaces={currentNamespaces}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    {t('dashboard')} {/* Ensure 'dashboard' key exists in translations */}
                </h2>
            }
        >
            {/* Main Content */}
            <div className="flex-1 p-6 overflow-auto">
                    {/* Card Wrapper */}
                    <div className="bg-white shadow-md rounded-lg p-6 max-w-8xl mx-auto">
                        <div className="p-6">
                        <Head title={t('Users List')} />
                        <h1 className="text-2xl font-bold mb-4">{t('materials')}</h1> 
                        
                <Link
                    href={route('materials.create')}
                    className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    {t('create_new_material')} 
                </Link>
                <table className="mt-4 min-w-full bg-white border border-gray-300">
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
                                {materials?.data?.length > 0 ? (
                        materials.data.map((material: any) => (
                            <tr key={material.id}>
                                <td className="px-4 py-2 border">{material.id}</td>
                                <td className="px-4 py-2 border">{material.title}</td>
                                <td className="px-4 py-2 border">{material.created_at}</td>
                                <td className="px-4 py-2 border">{material.status}</td>
                                <td className="px-4 py-2 border"><Link
                                    href={`/marketplace/materials/${material.id}/edit`}
                                    className="text-blue-500 hover:underline"
                                >
                                    {t('edit')}
                                </Link></td>
                                
                                 </tr>
                        ))
                    ) : (
                        <tr><td colSpan={5}>{t('no_materials_found')}</td></tr>
                    )}
                     
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
        </AuthenticatedLayout>
    );
};

export default Index;
