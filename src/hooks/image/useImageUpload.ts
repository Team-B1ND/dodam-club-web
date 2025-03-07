import { B1ndToast } from "@b1nd/b1nd-toastify";
import { useState, useEffect } from "react";
import { uploadImage } from "src/api/Image/Image.api";

interface UseImageUploadReturn {
  imageFile: File | null;
  previewUrl: string;
  setPreviewUrl: React.Dispatch<React.SetStateAction<string>>;
  handleImageChange: (file: File | null) => void;
  resetImage: () => void;
}

export const useImageUpload = () : UseImageUploadReturn => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');

  useEffect(() => {
    if (imageFile) {
      const formData = new FormData
      formData.append('file', imageFile)
      uploadImageAndPreview(formData)
    }
  }, [imageFile]);

  const uploadImageAndPreview = async (formData: FormData) => {
    try{
      const url = await uploadImage(formData) as string
      setPreviewUrl(url)
    }catch{
      B1ndToast.showError('이미지 업로드 실패')
    }
  };

  const handleImageChange = (file: File | null) => {
    setImageFile(file);
  };

  const resetImage = () => {
    setImageFile(null);
    setPreviewUrl('');
  };

  return {
    imageFile,
    previewUrl,
    setPreviewUrl,
    handleImageChange,
    resetImage,
  };
};
