import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import useLoadNamespaces from '@/hooks/useLoadNamespaces';

interface FileManagerPopupProps {
    onClose: () => void;
    onFileSelect: (filePath: string) => void;
}

const FileManagerPopup: React.FC<FileManagerPopupProps> = ({ onClose, onFileSelect }) => {
    useLoadNamespaces(['filemanager']);
    const { t } = useTranslation('filemanager');
    const [files, setFiles] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [uploading, setUploading] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [uploadProgress, setUploadProgress] = useState(0);
    const filesPerPage = 4;

    // Fetch files from the server
    useEffect(() => {
        fetchFiles();
    }, []);

    const fetchFiles = () => {
        axios.get('/mybusniess/filemanager/get_files')
            .then(response => {
                setFiles(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    };

    // Handle file selection
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
        }
    };

    // Handle file upload
    const handleFileUpload = () => {
        if (!selectedFile) return;

        setUploading(true);
        setUploadProgress(0);
        const formData = new FormData();
        formData.append('featured_image', selectedFile);

        axios.post('/mybusniess/filemanager/upload_file', formData, {
            onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                setUploadProgress(percentCompleted);
            },
        })
            .then(() => {
                fetchFiles();
                setSelectedFile(null);
            })
            .catch(error => {
                console.error(error);
            });
    };

    // Handle drag-and-drop file upload
    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
            //setSelectedFile(event.dataTransfer.files[0]);
            const file = event.dataTransfer.files[0];
            uploadFile(file);
        }
        
    };

    // Handle file upload
    const uploadFile = (file: File) => {
        setUploading(true);
 
        setUploadProgress(0);
        const formData = new FormData();
        formData.append('file', file);

        axios.post('/mybusniess/filemanager/upload_file', formData, {
            onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                setUploadProgress(percentCompleted);
            },
        })
            .then(() => {
                fetchFiles(); // Refresh file list
                setUploading(false);
            })
            .catch(error => {
                console.error(error);
                setUploading(false);
            });
    };

    // Filtered files based on search query
    const filteredFiles = files.filter(file =>
        file.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Pagination logic
    const indexOfLastFile = currentPage * filesPerPage;
    const indexOfFirstFile = indexOfLastFile - filesPerPage;
    const currentFiles = filteredFiles.slice(indexOfFirstFile, indexOfLastFile);

    const totalPages = Math.ceil(filteredFiles.length / filesPerPage);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-lg shadow-lg p-4 w-3/4 max-w-2xl">
                {/* Header */}
                <div className="flex justify-between items-center border-b pb-2">
                    <h2 className="text-lg font-semibold">{t('filemanager')}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">&times;</button>
                </div>

                {/* Search and Upload Section */}
                <div className="mt-4 flex justify-between items-center">
                    <input
                        type="text"
                        placeholder="Search files..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="border rounded p-2 w-1/2"
                    />
                    
                </div>
                <div className="mt-4 flex justify-between items-center">
                     
                    <div>
                        <input
                            type="file"
                            onChange={handleFileChange}
                            className="mb-2"
                        />
                        <button
                            onClick={handleFileUpload}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            disabled={!selectedFile}
                        >
                            Upload New File
                        </button>
                    </div>
                </div>

                {/* Drag-and-Drop Upload Area */}
                <div
                    className="mt-4 border-dashed border-2 border-gray-300 p-4 text-center"
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                >
                    {uploading ? (
                        <div>
                            <p className="text-blue-500 mb-2">Uploading... {uploadProgress}%</p>
                            <div className="relative w-full h-2 bg-gray-200 rounded">
                                <div
                                    className="absolute top-0 left-0 h-2 bg-blue-500 rounded"
                                    style={{ width: `${uploadProgress}%` }}
                                ></div>
                            </div>
                        </div>
                    ) : (
                        <p>Drag and drop a file here to upload</p>
                    )}
                </div>

                {/* File List */}
                <div className="mt-4 grid grid-cols-4 gap-4">
                    {currentFiles.map((file: any) => (
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

                {/* Pagination */}
                <div className="mt-4 flex justify-between items-center">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    <p>Page {currentPage} of {totalPages}</p>
                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>

                {/* Footer */}
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
