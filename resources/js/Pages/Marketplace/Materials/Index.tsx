import React from 'react';
import { usePage, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useTranslation } from 'react-i18next';
import useLoadNamespaces from '@/hooks/useLoadNamespaces';
import { Head } from '@inertiajs/react';
import Pagination from '@/Components/common/Pagination';
import { formatDate } from '@/utils/dateFormatter';
 import i18n from '@/i18n';
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

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface Pagination<T> {
    current_page: number;
    data: T[];
    links: PaginationLink[];
    total: number;
}

const Index: React.FC<{ currentNamespaces: string[]; materials: Pagination<any> }> = ({
    currentNamespaces,
    materials,
}) => {
    const { t } = useTranslation('material');
    useLoadNamespaces(['material']);

    return (
        <AuthenticatedLayout
            currentNamespaces={currentNamespaces}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    {t('material')}
                </h2>
            }
            items={[]}
        >
            <div className="flex-1 p-6 overflow-auto">
                <div className="bg-white shadow-md rounded-lg p-6 max-w-8xl mx-auto">
                    <div className="p-6">
                        <Head title={t('title')} />
                        <h1 className="text-2xl font-bold mb-4">{t('title')}</h1>
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
                                    <th className="px-4 py-2 border">{t('Created At')}</th>
                                    <th className="px-4 py-2 border">{t('Status')}</th>
                                    <th className="px-4 py-2 border">{t('Actions')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {materials?.data?.length > 0 ? (
                                    materials.data.map((material: any) => (
                                        <tr key={material.id}>
                                            <td className="px-4 py-2 border">{material.id}</td>
                                            <td className="px-4 py-2 border">{material.title}</td>
                                            <td className="px-4 py-2 border">{formatDate(material.created_at)} {/* Uses default format */}</td>
                                            <td className="px-4 py-2 border">
                                                {statusMap[material.status] || t('unknown')}
                                            </td>
                                            <td className="px-4 py-2 border"> 
                                                <Link
                                                    href={`/marketplace/materials/${material.id}/edit`}
                                                    className="text-blue-500 hover:underline"
                                                >
                                                    {t('edit')}
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5}>{t('no_materials_found')}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        <Pagination
                            links={materials.links}
                            total={materials.total}
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
