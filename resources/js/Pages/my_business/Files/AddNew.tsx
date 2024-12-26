import React from 'react';
import { useForm } from '@inertiajs/react';
import MaterialForm from '@/Components/Form/Marketplace/MaterialForm';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useTranslation } from 'react-i18next';
import useLoadNamespaces from '@/hooks/useLoadNamespaces';

const AddNew: React.FC<{ currentNamespaces: string[] }> = ({ currentNamespaces }) => {
    const { data, post, setData } = useForm({
        title: '',
        description: '',
        category_id: '',
        cost_per_unit: '',
        unit: '',
        quantity: '',
        delivery_type: '',
        expiry_date: '',
        state_id: '',
        city: '',
        warranty: '',
        main_image: null,
        product_images: [],
    });

    const { t } = useTranslation('dashboard');
    useLoadNamespaces(['dashboard']);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/marketplace/materials', {
            onSuccess: () => {
                // Redirect to listing page or show success message
                window.location.href = '/marketplace/materials';
            },
        });
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;
        if (files) {
            setData(name, files);
        }
    };

    return (
        <AuthenticatedLayout
            currentNamespaces={currentNamespaces}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    {t('add_new_material')}
                </h2>
            }
            items={[]}
        >
            <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
                <MaterialForm
                    material={data}
                    onSubmit={handleSubmit}
                    onInputChange={handleInputChange}
                    onFileChange={handleFileChange}
                />
            </div>
        </AuthenticatedLayout>
    );
};

export default AddNew;