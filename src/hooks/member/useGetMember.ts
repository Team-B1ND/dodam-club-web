import React, { useEffect, useState } from 'react'
import ClubApi from 'src/api/Club/club.api'
import { Student } from 'src/types/member/member.type'

const useGetMember = ({ type } : { type : 'CLUB' | 'SEARCH'}) => {
  const [ memberList, setMemberList ] = useState<Student[]>([])

  useEffect(() => {
    getMemberList()
  }, [])

  const getMemberList = async () => {
    try {
      const data = await ClubApi.getMembers()
      if( data ) {
        setMemberList(data)
      }
    }catch(err){
      return err
    }
  }

  return {
    memberList
  }
}

export default useGetMember