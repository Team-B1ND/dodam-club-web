import { useState, useEffect } from "react";
import { useQueryClient } from "react-query";
import { usePostImage } from "src/queries/image/image.query";

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

  const postImageMutation = usePostImage();
  const queryClient = useQueryClient()

  useEffect(() => {
    if (imageFile) {
      const formData = new FormData
      formData.append('file', imageFile)
      uploadImageAndPreview(formData)
    }
  }, [imageFile]);

  const uploadImageAndPreview = async (formData: FormData) => {
    postImageMutation.mutate(formData)
  };

  const handleImageChange = (file: File | null) => {
    setImageFile(file);
  };

  const resetImage = () => {
    setImageFile(null);
    setPreviewUrl('');
  };

  useEffect(() => {
    if(queryClient.getQueryData(["image"])){
      setPreviewUrl(queryClient.getQueryData(["image"])!)
    }
  }, [queryClient.getQueryData(["image"])])

  return {
    imageFile,
    previewUrl,
    setPreviewUrl,
    handleImageChange,
    resetImage,
  };
};