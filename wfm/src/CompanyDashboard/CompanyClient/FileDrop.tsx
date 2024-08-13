import React, { useState, DragEvent } from 'react';

interface FileDropProps {
  onFileDrop: (files: FileList) => void;
  onUploadProgress: (progress: number) => void;
}

const FileDrop: React.FC<FileDropProps> = ({ onFileDrop, onUploadProgress }) => {
  const [dragging, setDragging] = useState(false);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFileDrop(e.dataTransfer.files);
      e.dataTransfer.clearData();
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`border-2 border-dashed p-6 text-center transition-colors duration-300 ${
        dragging ? 'bg-gray-100 border-black' : 'bg-white border-gray-300'
      }`}
    >
      Drag & Drop your files here
    </div>
  );
};

export default FileDrop;
