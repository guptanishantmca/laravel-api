import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Sidebar from '@/Layouts/Sidebar';
import { Head, useForm } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import useLoadNamespaces from '@/hooks/useLoadNamespaces';
import axios from 'axios';
interface Permission {
    id: number;
    name: string;
    group: number;
}
interface GroupedPermission {
    group_name: string;
    permissions: Permission[];
}
type Permissions = { [key: number]: GroupedPermission };
interface Role {
    id: number;
    name: string;
}
const RolePermissionManager: React.FC = () => {
    const { t } = useTranslation('rolepermissionmanager');
    useLoadNamespaces(['rolepermissionmanager']);


    const [permissions, setPermissions] = useState<Permissions>({});
    const [roles, setRoles] = useState<Role[]>([]);
    const [selectedRole, setSelectedRole] = useState<number | null>(null);
    const [selectedPermissions, setSelectedPermissions] = useState<number[]>([]);

    useEffect(() => {
        axios.get('/roles/grouped-permissions').then((response) => {
            setPermissions(response.data.permissions);
            setRoles(response.data.roles);
        });
    }, []);

    const handleRoleChange = (roleId: number) => {
        setSelectedRole(roleId);
        // Fetch the permissions assigned to the selected role
        axios.get(`/roles/${roleId}/permissions`).then((response) => {
            const rolePermissions = response.data.permissions.map((p: Permission) => p.id);
            setSelectedPermissions(rolePermissions);
        });
    };

    const togglePermission = (permissionId: number) => {
        setSelectedPermissions((prev) =>
            prev.includes(permissionId)
                ? prev.filter((id) => id !== permissionId)
                : [...prev, permissionId]
        );
    };

    const handleSave = () => {
        if (!selectedRole) {
            alert('Please select a role');
            return;
        }
        axios
            .post(`/roles/${selectedRole}/permissions`, { permissions: selectedPermissions })
            .then(() => alert('Permissions updated successfully'))
            .catch(() => alert('Failed to update permissions'));
    };

    return (
        <AuthenticatedLayout
            currentNamespaces={['rolepermissionmanager']}
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">
                {t('title')}
            </h2>} items={[]}        >
            <Head title={t('title')} />


            {/* Main Content */}

            {/* Card Wrapper */}
            <div className="bg-white shadow-md rounded-lg p-6 max-w-8xl mx-auto">
                <h1 className="text-2xl font-bold mb-4">{t('title')}</h1>

                {/* Role Selection */}
                <div className="mb-4">
                    <label className="block font-medium mb-1">{t('Select Role')}</label>
                    <select
                        className="w-full p-2 border rounded"
                        value={selectedRole || ''}
                        onChange={(e) => handleRoleChange(Number(e.target.value))}
                    >
                        <option value="">{t('Select Role')}</option>
                        {roles.map((role) => (
                            <option key={role.id} value={role.id}>
                                {role.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Permissions */}
                <div className="mb-6">
                    {Object.keys(permissions).map((groupId) => {
                        const group = permissions[parseInt(groupId)];
                        return (
                            <div key={groupId} className="mb-4">
                                <h2 className="font-semibold text-lg mb-2">
                                    {group.group_name || 'Unnamed Group'}:
                                </h2>
                                <div className="grid grid-cols-2 gap-4">
                                    {group.permissions.map((permission) => (
                                        <label key={permission.id} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={selectedPermissions.includes(permission.id)}
                                                onChange={() => togglePermission(permission.id)}
                                                className="mr-2"
                                            />
                                            {permission.name}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        );
                    })}

                </div>

                {/* Save Button */}
                <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                    {t('Save Permissions')}
                </button>
            </div>


        </AuthenticatedLayout>

    );
};

export default RolePermissionManager;
