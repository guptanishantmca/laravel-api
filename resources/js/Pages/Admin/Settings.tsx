import React, { useState } from 'react';
import { usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useTranslation } from 'react-i18next';
import useLoadNamespaces from '@/hooks/useLoadNamespaces';
import { Head } from '@inertiajs/react';

export default function Settings() {
    const { t } = useTranslation('settings');
    const isLoaded = useLoadNamespaces(['settings']);
    const { settings } = usePage().props;
    const [form, setForm] = useState({
        pagination: settings.pagination || 10,
        date_format: settings.date_format || 'Y-m-d',
        language: settings.language || 'en',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Submit the form via Inertia
        window.axios.post('/admin/settings', form).then(() => {
            alert('Settings updated successfully!');
        });
    };

    return (
        <AuthenticatedLayout
            currentNamespaces={['settings']}
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">{t('title')}</h2>} items={[]}        >
            <div className="flex-1 p-6 overflow-auto">
                <div className="bg-white shadow-md rounded-lg p-6 max-w-8xl mx-auto">
                    <Head title={t('Admin Settings')} />
        <div>
        <h1 className="text-2xl font-bold mb-4">Admin Settings</h1>
            <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded bg-gray-50">
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Pagination Size:</label>
                    <input
                        type="number"
                        name="pagination"
                        value={form.pagination}
                        onChange={handleChange}
                        min="1"
                        max="100"
                        className="mt-1 p-2 block border rounded-md w-60"
                    />
                </div>
                <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Date Format:</label>
                    <input
                        type="text"
                        name="date_format"
                        value={form.date_format}
                        onChange={handleChange}
                        placeholder="e.g., Y-m-d"
                        className="mt-1 p-2 block border rounded-md w-60"
                    />
                </div>
                <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Language:</label>
                    <select name="language" value={form.language} onChange={handleChange} 
                        className="mt-1 p-2 block border rounded-md w-60">
                        <option value="en">English</option>
                        <option value="fi">Finnish</option>
                         
                        {/* Add more languages */}
                    </select>
                </div>
                <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Save Settings</button>
            </form>
        </div>
        </div>
                    </div>
                </AuthenticatedLayout>
    );
}
