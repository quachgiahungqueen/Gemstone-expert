
import React, { useRef, useCallback } from 'react';
import { UploadIcon } from './icons';

interface ImageUploadProps {
  onImageChange: (file: File | null) => void;
  previewUrl: string | null;
  isLoading: boolean;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ onImageChange, previewUrl, isLoading }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    onImageChange(file);
  };
  
  const onDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (isLoading) return;
    const file = event.dataTransfer.files?.[0] || null;
    onImageChange(file);
  }, [isLoading, onImageChange]);

  const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const openFileDialog = () => {
    if (!isLoading) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div 
      className={`relative group w-full aspect-video md:aspect-[2/1] border-2 border-dashed border-gray-600 rounded-xl flex flex-col justify-center items-center text-center p-4 transition-all duration-300 ${!isLoading ? 'hover:border-indigo-500 hover:bg-gray-800/70 cursor-pointer' : ''} ${previewUrl ? 'border-solid' : ''}`}
      onClick={openFileDialog}
      onDrop={onDrop}
      onDragOver={onDragOver}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/png, image/jpeg, image/webp"
        disabled={isLoading}
      />
      {previewUrl ? (
        <img src={previewUrl} alt="Xem trước đá quý" className="max-h-full max-w-full object-contain rounded-lg" />
      ) : (
        <div className="text-gray-400">
          <UploadIcon className="w-12 h-12 mx-auto text-gray-500 transition-colors group-hover:text-indigo-500" />
          <p className="mt-4 text-lg font-semibold">Kéo và thả hình ảnh vào đây</p>
          <p className="text-sm">hoặc <span className="text-indigo-400 font-medium">nhấn để chọn tệp</span></p>
          <p className="text-xs mt-2 text-gray-500">Hỗ trợ PNG, JPG, WEBP</p>
        </div>
      )}
    </div>
  );
};
