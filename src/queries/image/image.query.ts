import { B1ndToast } from "@b1nd/b1nd-toastify"
import { useMutation, useQueryClient } from "react-query"
import { uploadImage } from "src/api/Image/Image.api"

export const usePostImage = () => {
  const queryClient = useQueryClient() 
  const mutation = useMutation({
    mutationFn: (formData: FormData) => (
      uploadImage(formData)
    ),
    onSuccess(data) {
      queryClient.setQueryData('image', data)
    },
    onError(){
      B1ndToast.showError('이미지 업로드 실패')
    }
  })
  return mutation
}