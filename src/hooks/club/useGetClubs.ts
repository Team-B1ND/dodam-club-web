import { isAxiosError } from 'axios';
import React, { useEffect, useState } from 'react'
import { ErrorResponse } from 'react-router-dom';
import clubApi from 'src/api/Club/club.api'
import { ClubMember, ClubResponse } from 'src/types/club/club.type'

interface useGetClubsProps {
  id?: number;
  type: "ALL" | "CLUB";
}
const useGetClubs = ({ id, type }: useGetClubsProps) => {
  const [ clubList, setClubList ] = useState<ClubResponse[]>([])
  const [ clubInfo, setClubInfo ] = useState<ClubResponse>()

  useEffect(() => {
    if(type === "ALL"){
      getClubList()
    }else{
      getClub(id)
    }
  }, [])

  const getClubList = async () => {
    try {
      const data = await clubApi.getClubs()
      if( data ) {
        setClubList(data)
      }
    }catch(err){
      return err
    }
  }

  const getClub = async (id: number = 1) => {
    try {
      const data = await clubApi.getClub(id)
      if( data ) {
        setClubInfo(data)
      }
    }catch(err){
      return err
    }
  }

  return {
    clubList,
    clubInfo,
  }
}

export default useGetClubs