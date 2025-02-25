import customAxios from "src/libs/axios/customAxios";

interface uploadResponse {
  data: string;
  message: string;
  status: string;
}

export const uploadImage = async (imageData: FormData) => {
  try{
    const {data} = await customAxios.post<uploadResponse>(`/upload`, imageData)
    if(data){
      return data.data;
    }
  }catch{
    return false;
  };
};