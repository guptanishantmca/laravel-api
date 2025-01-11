import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface FileManagerPopupProps {
    onClose: () => void;
    onFileSelect: (filePath: string) => void;
}

const FileManagerPopup: React.FC<FileManagerPopupProps> = ({ onClose, onFileSelect }) => {
    const [files, setFiles] = useState([]);

    useEffect(() => {
        // Fetch files from the server
        axios.get('/mybusniess/filemanager/get_files').then(response => {
            setFiles(response.data);
        });
    }, []);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-lg shadow-lg p-4 w-3/4 max-w-2xl">
                <div className="flex justify-between items-center border-b pb-2">
                    <h2 className="text-lg font-semibold">File Manager</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">&times;</button>
                </div>

                <div className="mt-4 grid grid-cols-4 gap-4">
                    {files.map((file: any) => (
                        <div
                            key={file.id}
                            className="border p-2 rounded cursor-pointer hover:bg-gray-100"
                            onClick={() => onFileSelect(file.path)}
                        >
                            <img src={`/storage/${file.path}`} alt={file.name} className="w-full h-32 object-cover" />
                            <p className="mt-2 text-center">{file.name}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-4 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FileManagerPopup;
