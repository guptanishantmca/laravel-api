import React, { useEffect } from 'react';

import { usePage, Link, router } from '@inertiajs/react';

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useTranslation } from 'react-i18next';
import useLoadNamespaces from '@/hooks/useLoadNamespaces';
import { Head } from '@inertiajs/react';
import Pagination from '@/Components/common/Pagination';
import { formatDate } from '@/utils/dateFormatter';
import Table from '@/Components/Table';

const statusMap: Record<number, string> = {
    0: "Default",
    1: "Active",
    2: "Inactive",
    3: "Complete",
    4: "Pending",
    5: "Cancelled",
    6: "Ongoing",
    7: "Expired",
    8: "Accepted",
};

const Index: React.FC<{ currentNamespaces: string[]; materials: Pagination<any> }> = ({
    currentNamespaces,
    materials,
}) => {
    const { t } = useTranslation('material');
    useLoadNamespaces(['material']);

    useEffect(() => {
        document.title = t('title');
    }, [t]);

    // Columns for the table
    const columns = [
        { key: 'id', label: t('ID') },
        { key: 'title', label: t('Name') },
        { key: 'created_at', label: t('Created At') },
        { key: 'status', label: t('Status') },
    ];

    // Data for the table
    const data = materials.data.map((material: any) => ({
        id: material.id,
        title: material.title,
        created_at: formatDate(material.created_at),
        status: statusMap[material.status] || t('unknown'),
    }));

    // Handle delete
    const handleDelete = (id: number) => {
        if (confirm(t('delete_confirm'))) {
            router.delete(`/marketplace/materials/${id}`);
        }
    };

    return (
        <AuthenticatedLayout
            currentNamespaces={currentNamespaces}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    {t('title')}
                </h2>
            }
            items={[]}
        >
            <div className="flex-1 p-6 overflow-auto">
                <div className="bg-white shadow-md rounded-lg p-6 max-w-8xl mx-auto">
                    <Head title={t('title')} />
                    <h1 className="text-2xl font-bold mb-4">{t('title')}</h1>
                    <Link
                        href={route('materials.create')}
                        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        {t('create_new_material')}
                    </Link>

                    {/* Render the Table component */}
                    <Table
                        columns={columns}
                        data={data}
                        actions={(row) => (
                            <div className="flex gap-2">
                                {/* Edit Button */}
                                <Link
                                    href={`/marketplace/materials/${row.id}/edit`}
                                    className="text-blue-500 hover:underline"
                                >
                                    {t('edit_button')}
                                </Link>

                                {/* Delete Button */}
                                <button
                                    onClick={() => handleDelete(row.id)}
                                    className="text-red-500 hover:underline"
                                >
                                    {t('delete_button')}
                                </button>
                            </div>
                        )}
                    />

                    {/* Pagination Component */}
                    <Pagination links={materials.links} total={materials.total} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
