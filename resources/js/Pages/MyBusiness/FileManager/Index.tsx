import React, { useState } from 'react';
 
import { usePage } from '@inertiajs/react';

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
}

const FileManager: React.FC<FileManagerProps> = ({ files, folders, currentFolder, parentFolderId }) => {
    const [newFolderName, setNewFolderName] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [fileToUpload, setFileToUpload] = useState<File | null>(null);

    const handleCreateFolder = () => {
        if (!newFolderName.trim()) return;
        Inertia.post('/filemanager/folder', { name: newFolderName, parent_id: currentFolder?.id || null }, {
            onSuccess: () => setNewFolderName(''),
        });
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('folder_id', currentFolder?.id || '');

            Inertia.post('/filemanager/upload', formData, {
                onSuccess: () => setFileToUpload(null),
            });
        }
    };

    const handleDeleteFolder = (folderId: number) => {
        if (confirm('Are you sure you want to delete this folder?')) {
            Inertia.delete(`/filemanager/folder/${folderId}`);
        }
    };

    const handleDeleteFile = (fileId: number) => {
        if (confirm('Are you sure you want to delete this file?')) {
            Inertia.delete(`/filemanager/file/${fileId}`);
        }
    };

    return (
        <div className="file-manager p-4">
            <h1 className="text-xl font-bold mb-4">File Manager</h1>

            <div className="actions mb-4 flex gap-4">
                <input
                    type="text"
                    className="border rounded p-2"
                    placeholder="New Folder Name"
                    value={newFolderName}
                    onChange={(e) => setNewFolderName(e.target.value)}
                />
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={handleCreateFolder}
                >
                    Create Folder
                </button>
                <input
                    type="file"
                    className="hidden"
                    id="file-upload"
                    onChange={handleFileUpload}
                />
                <label
                    htmlFor="file-upload"
                    className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer"
                >
                    Upload File
                </label>
            </div>

            <div className="breadcrumbs mb-4">
                {parentFolderId && (
                    <button
                        className="text-blue-500"
                        onClick={() => Inertia.get(`/filemanager?folder=${parentFolderId}`)}
                    >
                        Back
                    </button>
                )}
            </div>

            <div className="grid grid-cols-3 gap-4">
                {folders.map((folder) => (
                    <div key={folder.id} className="folder border p-4 rounded">
                        <div className="flex justify-between">
                            <span
                                className="cursor-pointer text-blue-500"
                                onClick={() => Inertia.get(`/filemanager?folder=${folder.id}`)}
                            >
                                📁 {folder.name}
                            </span>
                            <button
                                className="text-red-500"
                                onClick={() => handleDeleteFolder(folder.id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}

                {files.map((file) => (
                    <div key={file.id} className="file border p-4 rounded">
                        <div className="flex justify-between">
                            <a
                                href={`/storage/${file.path}`}
                                target="_blank"
                                className="text-blue-500"
                                rel="noopener noreferrer"
                            >
                                🖼 {file.name}
                            </a>
                            <button
                                className="text-red-500"
                                onClick={() => handleDeleteFile(file.id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FileManager;
