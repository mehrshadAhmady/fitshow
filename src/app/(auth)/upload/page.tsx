"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";

import { ArrowRight02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Uploader from "@/components/Uploader";
import { useUserContext } from "@/context/userContext";

const Upload = () => {
  const router = useRouter();
  const { updateUser } = useUserContext();
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [fileId, setFileId] = useState<string | null>(null);

  const handleUploadComplete = (imageUrl: string, fileId: string) => {
    setUploadedImage(imageUrl);
    setFileId(fileId);
  };

  const handleImageChange = () => {
    setUploadedImage(null);
  };

  return (
    <div className="absolute z-0 flex flex-col items-center w-full h-screen">
      <h3 className="mt-24 peyda-bold text-base text-center">بارگذاری عکس </h3>
      <p className="mt-4 peyda-light text-sm text-[#676C75] tracking-tight">
        در صورت تمایل یک عکس از بدن خود در این قسمت آپلود نمایید.
      </p>
      <div className="mt-10 w-[90%]">
        <Uploader
          onUploadComplete={handleUploadComplete}
          onImageChange={handleImageChange}
        />
      </div>
      <Button
        color="primary"
        className="mt-auto mb-2 gap-3 h-14 w-[90%] rounded-[1.25rem] peyda-semibold"
        onClick={() => {
          router.push("/diet-options");
        }}
      >
        گذشتن از این مرحله
      </Button>
      <Button
        iconPrefix={<HugeiconsIcon icon={ArrowRight02Icon} />}
        color="black"
        className="mb-10 gap-3 h-14 w-[90%] rounded-[1.25rem] peyda-semibold"
        onClick={async () => {
          if (uploadedImage) {
            await updateUser({ bodyImage: uploadedImage });
          }
          router.push("/diet-options");
        }}
        disabled={!uploadedImage || !fileId}
      >
        {!uploadedImage
          ? "لطفاً ابتدا عکس را آپلود کنید"
          : !fileId
          ? "در حال آپلود..."
          : "ادامه"}
      </Button>
    </div>
  );
};

export default Upload;
