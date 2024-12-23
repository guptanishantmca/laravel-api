import React from 'react';
import { useForm } from '@inertiajs/react';
import MaterialForm from '@/Components/Form/Marketplace/MaterialForm';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useTranslation } from 'react-i18next';
import useLoadNamespaces from '@/hooks/useLoadNamespaces';
const Edit: React.FC<{ currentNamespaces: string[]; material: any }> = ({ currentNamespaces, material }) => {
    const { put, setData } = useForm(material);
    const { t } = useTranslation('dashboard'); // Use the 'dashboard' namespace
    useLoadNamespaces(['dashboard']);
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/marketplace/materials/${material.id}`);
    };

    return (
        <AuthenticatedLayout
            currentNamespaces={currentNamespaces}
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">
                {t('dashboard')} {/* Ensure 'dashboard' key exists in translations */}
            </h2>} items={[]}                ><div>
            <h1>Edit Material</h1>
            <MaterialForm material={material} onSubmit={handleSubmit} />
        </div></AuthenticatedLayout>
    );
};

export default Edit;
