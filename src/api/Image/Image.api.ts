import customAxios from "src/libs/axios/customAxios";

interface uploadResponse {
  data: string;
  message: string;
  status: string;
}

export const uploadImage = async (imageData: FormData) => {
  const {data} = await customAxios.post<uploadResponse>(`/upload`, imageData)
  return data.data;
};