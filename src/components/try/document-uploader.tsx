// src/components/try/document-uploader.tsx
"use client";

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, File as FileIcon, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface DocumentUploaderProps {
  onFileChange: (file: File | null) => void;
  isProcessing: boolean;
}

export default function DocumentUploader({ onFileChange, isProcessing }: DocumentUploaderProps) {
  const [file, setFile] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0];
      setFile(selectedFile);
      onFileChange(selectedFile);
    }
  }, [onFileChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
    },
    maxFiles: 1,
    disabled: isProcessing,
  });

  const removeFile = () => {
    setFile(null);
    onFileChange(null);
  };

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={cn(
          'border-2 border-dashed border-muted-foreground/50 rounded-lg p-8 text-center cursor-pointer transition-colors',
          'hover:border-primary hover:bg-primary/5',
          isDragActive && 'border-primary bg-primary/10',
          isProcessing && 'cursor-not-allowed opacity-50'
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center gap-4">
          <UploadCloud className="w-12 h-12 text-muted-foreground" />
          {isDragActive ? (
            <p className="text-primary font-semibold">Drop the document here ...</p>
          ) : (
            <p className="text-muted-foreground">
              Drag & drop a document here, or click to select a file
            </p>
          )}
          <p className="text-xs text-muted-foreground/80">
            Supported formats: PDF, PNG, JPG
          </p>
        </div>
      </div>
      {file && (
        <div className="flex items-center justify-between p-3 border rounded-lg bg-secondary/50">
          <div className="flex items-center gap-3">
            <FileIcon className="w-6 h-6 text-primary" />
            <span className="font-medium text-sm text-foreground truncate max-w-xs sm:max-w-sm">
              {file.name}
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={removeFile}
            disabled={isProcessing}
            className="h-8 w-8"
            aria-label="Remove file"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
