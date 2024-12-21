import React from 'react';
import { Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useTranslation } from 'react-i18next';
import useLoadNamespaces from '@/hooks/useLoadNamespaces';

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
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">{t('materials')}</h1>
                <Link
                    href={route('materials.create')}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    {t('create_new_material')}
                </Link>
                <ul className="mt-4 space-y-4">
                    {materials?.data?.length > 0 ? (
                        materials.data.map((material: any) => (
                            <li key={material.id} className="border-b pb-2">
                                <h2 className="text-lg font-semibold">{material.title}</h2>
                                <p className="text-gray-600">{material.description}</p>
                                <Link
                                    href={`/marketplace/materials/${material.id}/edit`}
                                    className="text-blue-500 hover:underline"
                                >
                                    {t('edit')}
                                </Link>
                            </li>
                        ))
                    ) : (
                        <p>{t('no_materials_found')}</p>
                    )}
                </ul>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
