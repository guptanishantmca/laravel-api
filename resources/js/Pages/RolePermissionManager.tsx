import React, { useState,useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Sidebar from '@/Layouts/Sidebar';
import { Head, useForm } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import useLoadNamespaces from '@/hooks/useLoadNamespaces';
import axios from 'axios';

const RolePermissionManager: React.FC = () => {
    const { t } = useTranslation('users');
    const [roles, setRoles] = useState<any[]>([]);
    const [permissions, setPermissions] = useState<any[]>([]);
    const [selectedRole, setSelectedRole] = useState<string>('');
    const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

    useEffect(() => {
        axios.get('/roles-and-permissions').then((response) => {
            setRoles(response.data.roles);
            setPermissions(response.data.permissions);
        });
    }, []);

    const handleRoleChange = (roleId: string) => {
        setSelectedRole(roleId);
        const role = roles.find((role) => role.id === parseInt(roleId));
        if (role) {
            setSelectedPermissions(role.permissions.map((permission: any) => permission.name));
        }
    };

    const handlePermissionChange = (permission: string) => {
        setSelectedPermissions((prev) =>
            prev.includes(permission)
                ? prev.filter((p) => p !== permission)
                : [...prev, permission]
        );
    };

    const handleSave = () => {
        axios
            .post(`/roles/${selectedRole}/permissions`, { permissions: selectedPermissions })
            .then(() => alert('Permissions updated successfully'))
            .catch(() => alert('Failed to update permissions'));
    };

    return (
        <AuthenticatedLayout
            currentNamespaces={['users']}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    {t('title')}
                </h2>
            }
        >
            <div className="flex h-screen bg-gray-100">
                {/* Sidebar */}
                <Sidebar />

                {/* Main Content */}
                <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Role Permission Manager</h1>
            <select
                value={selectedRole}
                onChange={(e) => handleRoleChange(e.target.value)}
                className="p-2 border rounded w-full mb-4"
            >
                <option value="">Select a Role</option>
                {roles.map((role) => (
                    <option key={role.id} value={role.id}>
                        {role.name}
                    </option>
                ))}
            </select>
            {selectedRole && (
                <div>
                    <h2 className="font-medium mb-2">Permissions:</h2>
                    {permissions.map((permission) => (
                        <div key={permission.id} className="flex items-center mb-2">
                            <input
                                type="checkbox"
                                checked={selectedPermissions.includes(permission.name)}
                                onChange={() => handlePermissionChange(permission.name)}
                                className="mr-2"
                            />
                            <label>{permission.name}</label>
                        </div>
                    ))}
                    <button onClick={handleSave} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
                        Save Permissions
                    </button>
                </div>
            )}
        </div>
            </div>
        </AuthenticatedLayout>
        
    );
};

export default RolePermissionManager;
