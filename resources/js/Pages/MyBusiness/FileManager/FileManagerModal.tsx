import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface FileManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectFile: (filePath: string) => void;
}

const FileManagerModal: React.FC<FileManagerModalProps> = ({ isOpen, onClose, onSelectFile }) => {
  const [files, setFiles] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  // Fetch files from the backend
  const fetchFiles = async () => {
    try {
      const response =   axios.get('/mybusniess/filemanager/get_files');
      setFiles(response.data.files);
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  // Handle file selection
  const handleFileSelect = (filePath: string) => {
    setSelectedFile(filePath);
    onSelectFile(filePath);
    onClose();
  };

  // Handle file upload
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
        axios.post('/mybusniess/filemanager/upload', formData);
      fetchFiles(); // Refresh files after upload
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  // Fetch files when the modal opens
  useEffect(() => {
    if (isOpen) {
      fetchFiles();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4">File Manager</h2>
        <button className="absolute top-2 right-2" onClick={onClose}>
          Close
        </button>

        {/* File Upload Input */}
        <input type="file"  name="files" onChange={handleFileUpload} className="mb-4" />

        {/* File List */}
        <div className="file-list">
          {files.length > 0 ? (
            files.map((file) => (
              <div
                key={file}
                onClick={() => handleFileSelect(file)}
                className={`cursor-pointer p-2 border ${
                  selectedFile === file ? 'bg-blue-100' : ''
                }`}
              >
                {file}
              </div>
            ))
          ) : (
            <p>No files found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileManagerModal;
