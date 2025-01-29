import React from 'react';
import { useForm } from '@inertiajs/react';
import MaterialForm from '@/Components/Form/Marketplace/MaterialForm';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useTranslation } from 'react-i18next';
import useLoadNamespaces from '@/hooks/useLoadNamespaces';
import { Head } from '@inertiajs/react';

const SendToClient: React.FC<{ currentNamespaces: string[]; material: any }> = ({ currentNamespaces, material }) => {
    const { put, setData } = useForm(material);
    useLoadNamespaces(['material']);
    const { t } = useTranslation('material'); // Use the 'dashboard' namespace
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/marketplace/materials/update/${material.id}`);
    };

    return (
        <AuthenticatedLayout
            currentNamespaces={currentNamespaces}
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">
                {t('edit.title')} {/* Ensure 'dashboard' key exists in translations */}
            </h2>} items={[]}                >
            {/* <h1>{t('edit.title')}</h1> */}
            <Head title={t('edit.title')} /> 
            <MaterialForm
    material={material}
    onSubmit={handleSubmit}
    submitUrl={`/marketplace/materials/update/${material.id}`}
    submitMethod="put"
    isEdit={true}
/>

        </AuthenticatedLayout>
    );
};

export default SendToClient;
