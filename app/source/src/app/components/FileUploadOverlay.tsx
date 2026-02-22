import React, { useRef } from 'react';
import { X, Upload, Image } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface FileUploadOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onFileSelect: (file: File) => void;
}

export function FileUploadOverlay({ isOpen, onClose, onFileSelect }: FileUploadOverlayProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageClick = () => {
    imageInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
      <Card className="w-full max-w-md mb-20 mx-4 p-1 bg-card border border-border shadow-lg rounded-lg overflow-hidden">
        <div className="flex flex-col">
          <button
            onClick={handleFileClick}
            className="flex items-center gap-3 px-4 py-3 hover:bg-accent transition-colors text-left"
          >
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
              <Upload className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium">Upload file</p>
              <p className="text-xs text-muted-foreground">PDF, DOC, or other documents</p>
            </div>
          </button>
          
          <div className="h-px bg-border" />
          
          <button
            onClick={handleImageClick}
            className="flex items-center gap-3 px-4 py-3 hover:bg-accent transition-colors text-left"
          >
            <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
              <Image className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium">Upload photo</p>
              <p className="text-xs text-muted-foreground">Take or choose an image</p>
            </div>
          </button>
          
          <div className="h-px bg-border" />
          
          <button
            onClick={onClose}
            className="flex items-center justify-center gap-2 px-4 py-3 hover:bg-accent transition-colors text-sm font-medium"
          >
            Cancel
          </button>
        </div>
      </Card>

      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept=".pdf,.doc,.docx,.txt"
        onChange={handleFileChange}
      />
      <input
        ref={imageInputRef}
        type="file"
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />
    </div>
  );
}
