import { useState } from 'react'
import clubApi from 'src/api/Club/club.api'
import { ClubResponse } from 'src/types/club/club.type'

const useGetClubs = () => {
  const [ clubList, setClubList ] = useState<ClubResponse[]>([])
  const [ clubInfo, setClubInfo ] = useState<ClubResponse>()

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
        data.description = `${data.description}`.replace('\n', '\n\n')
        setClubInfo(data)
      }
    }catch(err){
      return err
    }
  }

  return {
    clubList,
    clubInfo,
    getClub,
    getClubList
  }
}

export default useGetClubs