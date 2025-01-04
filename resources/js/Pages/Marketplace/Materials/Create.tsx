import React from 'react';
import { useForm } from '@inertiajs/react';
import MaterialForm from '@/Components/Form/Marketplace/MaterialForm';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useTranslation } from 'react-i18next';
import useLoadNamespaces from '@/hooks/useLoadNamespaces';

const Create: React.FC<{ currentNamespaces: string[] }> = ({ currentNamespaces }) => {
    const { post, setData } = useForm({});
    const { t } = useTranslation('material'); // Use the 'dashboard' namespace
    useLoadNamespaces(['material']);
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/marketplace/materials');
    };

    return (
        <AuthenticatedLayout
            currentNamespaces={currentNamespaces}
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">
                {t('create.title')} {/* Ensure 'dashboard' key exists in translations */}
            </h2>} items={[]}                >
            <h1>Create Material</h1>
        <div>
        
             
        <MaterialForm
    material={{}} // Empty object for new material
    onSubmit={handleSubmit}
    submitUrl="/marketplace/materials/store"
    submitMethod="post"
    isEdit={false}
/>

        </div></AuthenticatedLayout>
    );
};

export default Create;
