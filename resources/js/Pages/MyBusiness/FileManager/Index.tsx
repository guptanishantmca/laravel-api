import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useTranslation } from 'react-i18next';
import useLoadNamespaces from '@/hooks/useLoadNamespaces';

interface File {
    id: number;
    name: string;
    path: string;
    type: string;
    folder_id: number | null;
}

interface Folder {
    id: number;
    name: string;
    parent_id: number | null;
}

interface FileManagerProps {
    files: File[];
    folders: Folder[];
    currentFolder?: Folder;
    parentFolderId?: number | null;
    currentNamespaces: string[];
}

const FileManager: React.FC<FileManagerProps> = ({ files, folders, currentFolder, parentFolderId, currentNamespaces }) => {
    const { t } = useTranslation('filemanager'); // Use the 'dashboard' namespace
    useLoadNamespaces(['filemanager']);
    const [newFolderName, setNewFolderName] = useState('');
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

    const handleCreateFolder = () => {
        if (!newFolderName.trim()) return;
        Inertia.post('/mybusniess/filemanager/folder', { name: newFolderName, parent_id: currentFolder?.id || null }, {
            onSuccess: () => setNewFolderName(''),
        });
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const formData = new FormData();
            Array.from(files).forEach((file) => {
                formData.append('files[]', file); // Add each file to the form data
            });
            formData.append('folder_id', currentFolder?.id || '');

            Inertia.post('/mybusniess/filemanager/upload', formData, {
                onSuccess: () => setSelectedFiles([]),
            });
        }
    };

    const handleDeleteFolder = (folderId: number) => {
        if (confirm('Are you sure you want to delete this folder and all its contents?')) {
            Inertia.delete(`/mybusniess/filemanager/folder/${folderId}`);
        }
    };

    const handleDeleteFile = (fileId: number) => {
        if (confirm('Are you sure you want to delete this file?')) {
            Inertia.delete(`/mybusniess/filemanager/file/${fileId}`);
        }
    };

    return (
        <AuthenticatedLayout
            currentNamespaces={currentNamespaces}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    {t('filemanager')}
                </h2>
            }
            items={[]}
        >
            <div className="flex-1 p-6 overflow-auto">
                <div className="bg-white shadow-md rounded-lg p-6 max-w-8xl mx-auto">
                    <div className="file-manager p-4">
                        <h1 className="text-2xl font-bold mb-4"> {t('filemanager')}</h1>

                        {/* Actions */}
                        <div className="actions mb-6 flex flex-wrap gap-4">
                            {/* Create Folder */}
                            <input
                                type="text"
                                className="border rounded p-2 flex-grow"
                                placeholder={t('new_folder_name')}
                                value={newFolderName}
                                onChange={(e) => setNewFolderName(e.target.value)}
                            />
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                onClick={handleCreateFolder}
                            >
                                {t('create_folder')}
                            </button>

                            {/* Upload Files */}
                            <input
                                type="file"
                                className="hidden"
                                id="file-upload"
                                multiple // Allow multiple file uploads
                                onChange={handleFileUpload}
                            />
                            <label
                                htmlFor="file-upload"
                                className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-green-600"
                            >
                                {t('upload_files')}
                            </label>
                        </div>

                        {/* Breadcrumbs */}
                        <div className="breadcrumbs mb-4">
                            {parentFolderId && (
                                <button
                                    className="text-blue-500 hover:underline"
                                    onClick={() => Inertia.get(`/mybusniess/filemanager?folder=${parentFolderId}`)}
                                >
                                    {t('back')}
                                </button>
                            )}
                        </div>

                        {/* Files & Folders Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {/* Folders */}
    {folders.map((folder) => (
        <div
            key={folder.id}
            className="relative border p-4 rounded shadow hover:shadow-lg bg-gray-50 group"
        >
            <div className="flex justify-between">
                <span
                    className="cursor-pointer text-blue-500 hover:underline"
                    onClick={() => Inertia.get(`/mybusniess/filemanager?folder=${folder.id}`)}
                >
                    📁 {folder.name}
                </span>
                <button
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => handleDeleteFolder(folder.id)}
                >
                    {t('delete')}
                </button>
            </div>
        </div>
    ))}

    {/* Files */}
    {files.map((file) => (
        <div className="relative border rounded shadow hover:shadow-lg bg-gray-50 group">
    {/* Thumbnail or Preview */}
    {file.type.startsWith('image/') ? (
        <img
            src={`/storage/${file.path}`}
            alt={file.name}
            className="w-full h-32 object-cover rounded-t"
        />
    ) : file.type === 'application/pdf' ? (
        <iframe
            src={`/storage/${file.path}`}
            className="w-full h-32"
            title="PDF Preview"
        ></iframe>
    ) : file.type.includes('word') ? (
        <iframe
            src={`https://docs.google.com/gview?url=${encodeURIComponent(
                `/storage/${file.path}`
            )}&embedded=true`}
            className="w-full h-32"
            title="Word Document Preview"
        ></iframe>
    ) : (
        <div className="flex items-center justify-center h-32 bg-gray-200">
            <span className="text-4xl">📄</span>
        </div>
    )}

    {/* File Name */}
    <div className="p-4">
        <a
            href={`/storage/${file.path}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
        >
            {file.name}
        </a>
    </div>

    {/* Delete Button (Visible on Hover) */}
    <button
        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={() => handleDeleteFile(file.id)}
    >
        {t('delete')}
    </button>
</div>

        
    ))}
</div>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default FileManager;
