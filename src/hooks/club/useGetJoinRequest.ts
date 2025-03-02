import { useState } from "react"
import clubApi from "src/api/Club/club.api";
import { ClubJoinResponse } from "src/types/club/club.type";

export const useGetJoinRequest = () => {
  const [ joinRequestList, setJoinRequestList ] = useState<ClubJoinResponse[]>([]);

  const getJoinRequest = async () => {
    try {
      const data = await clubApi.getJoinClubByRequest()
      if( data ) {
        setJoinRequestList(data)
      }  
    }catch(err){
      return err
    }
  }

  return {
    joinRequestList,
    getJoinRequest
  }
}