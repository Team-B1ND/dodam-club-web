import axios from "axios"
import CONFIG from "src/config/config.json"

export const refreshApi = async (usingAccessToken: string) => {
  const { data } = await axios.post(`${CONFIG.SERVER}/refresh`,{
    refreshToken: usingAccessToken,
  }); 
  return data
}