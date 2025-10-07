"use client";

import { useRef, useState } from "react";
import Button from "../Button";
import { HugeiconsIcon } from "@hugeicons/react";
import { Upload01Icon } from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

interface UploaderProps {
  onUploadComplete?: (imageUrl: string, fileId: string) => void;
  onImageChange?: () => void;
}

export default function Uploader({
  onUploadComplete,
  onImageChange,
}: UploaderProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploadingFile, setUploadingFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const maxFileSize = 700 * 1024 * 1024; // 700MB
  const acceptedTypes = ["image/jpeg", "image/png", "application/pdf"];

  const handleFileSelect = (file: File) => {
    if (file.size > maxFileSize) {
      alert("حجم فایل بیشتر از ۷۰۰ مگابایت است");
      return;
    }
    if (!acceptedTypes.includes(file.type)) {
      alert("فرمت فایل مجاز نیست (PDF, PNG, JPEG)");
      return;
    }

    setUploadingFile(file);
    // simulate upload
    const uploadInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 1) {
          clearInterval(uploadInterval);
          const previewUrl = URL.createObjectURL(file);
          setUploadedImage(previewUrl);
          setUploadingFile(null);
          setUploadProgress(0);
          onUploadComplete?.(previewUrl, file.name);
          return 1;
        }
        return prev + 0.05;
      });
    }, 100);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
    setShowUploadModal(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFileSelect(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const removeImage = () => {
    if (uploadedImage) {
      URL.revokeObjectURL(uploadedImage);
      setUploadedImage(null);
    }
  };

  const changeImage = () => setShowUploadModal(true);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  // Uploading state
  if (uploadingFile) {
    return (
      <div className="flex flex-col justify-center items-center h-[11.75rem] mx-4 rounded-[2.5rem] text-white gap-2 border-[0.25rem] border-dashed border-[#CBD0DC] shadow-[0_0_0_4px_#11121440]">
        <div className="flex flex-col items-center text-center gap-2">
          <p className="font-medium">{uploadingFile.name}</p>
          <p className="text-sm text-gray-300">
            {formatFileSize(uploadingFile.size)}
          </p>
        </div>
        <div className="flex flex-col items-center gap-2 w-[90%]">
          <span className="font-semibold text-lg">
            {Math.round(uploadProgress * 100)}%
          </span>
          <div className="w-full h-2 bg-white/25 rounded-md overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#F97316CF] to-[#F97316] transition-all"
              style={{ width: `${uploadProgress * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    );
  }

  // Uploaded image preview
  if (uploadedImage && !showUploadModal) {
    return (
      <div className="relative flex flex-col items-center w-full h-[11.75rem] gap-4 rounded-[2.5rem] bg-white/25 text-white overflow-hidden shadow-[0_0_0_4px_#11121440]">
        <img
          src={uploadedImage}
          alt="Uploaded"
          className="absolute inset-0 w-full h-full object-cover rounded-[2.5rem] z-0"
        />
        <div className="absolute inset-0 bg-black/60 rounded-[2.5rem] z-10 flex flex-col items-center justify-center gap-4">
          <div className="flex flex-col items-center text-gray-300 gap-1">
            <HugeiconsIcon icon={Upload01Icon} width={32} height={32} />
            <span className="peyda-light text-sm">فایل آپلود شده</span>
          </div>
          <div className="flex gap-4 z-20">
            <Button
              className="w-32 h-8 rounded-2xl peyda-light text-sm"
              onClick={() => {
                onImageChange?.();
                removeImage();
              }}
            >
              حذف
            </Button>
            <Button
              className="w-32 h-8 rounded-2xl peyda-light text-sm"
              onClick={changeImage}
            >
              تغییر
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Upload UI
  return (
    <div className="relative flex flex-col items-center justify-center w-full h-[11.75rem] rounded-[2.5rem] border-[0.25rem] border-dashed border-[#CBD0DC] hover:bg-white/30 transition-all duration-200 cursor-pointer shadow-[0_0_0_4px_#11121440]">
      <input
        ref={inputRef}
        type="file"
        accept=".jpg,.jpeg,.png,.pdf"
        onChange={handleFileInputChange}
        className="hidden"
      />

      <div
        className={cn(
          "flex flex-col items-center justify-center w-full h-full rounded-[2.5rem] gap-3 transition-all duration-200",
          dragActive && "bg-white/40 border-solid scale-[1.02]"
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDragLeave}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        <HugeiconsIcon
          icon={Upload01Icon}
          width={48}
          height={48}
          color="black"
        />
      </div>

      {/* Modal for “Change” */}
      {showUploadModal && (
        <div className="">
          <input
            ref={inputRef}
            type="file"
            accept=".jpg,.jpeg,.png,.pdf"
            onChange={handleFileInputChange}
            className="hidden"
          />
          <div
            className="absolute inset-0 z-20 flex items-center justify-center bg-black/70 rounded-[2.5rem]"
            onDragEnter={handleDrag}
            onDragLeave={handleDragLeave}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
          ></div>
          <Button
            onClick={() => setShowUploadModal(false)}
            className="absolute z-30 top-[50%] -translate-y-[50%] left-[50%] -translate-x-[50%] w-32 h-8 rounded-2xl peyda-light text-sm"
          >
            انصراف
          </Button>
        </div>
      )}
    </div>
  );
}
