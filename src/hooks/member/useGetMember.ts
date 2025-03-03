import { isAxiosError } from 'axios'
import { useState } from 'react'
import ClubApi from 'src/api/Club/club.api'
import { ClubMember } from 'src/types/club/club.type'
import { Student } from 'src/types/member/member.type'
import { ErrorResponse } from 'src/types/response/response.type'

const useGetMember = () => {
  const [ memberList, setMemberList ] = useState<Student[]>([])
  const [ clubMemberList, setClubMemberList ] = useState<ClubMember[]>([])
  const [ clubLeader, setClubLeader ] = useState<ClubMember>()

  const getClubLeader = async (id: number = 1) => {
    try {
      const data = await ClubApi.getClubLeader(id)
      if( data ) {
        setClubLeader(data)
      }
    }catch(err){
      return err
    }
  }

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

  const getMemberListForSelf = async () => {
    try {
      const data = await ClubApi.getMembersSelf()
      if( data ) {
        setMemberList(data)
      }
    }catch(err){
      return err
    }
  }

  const getAllClubMemberList = async (id: number = 1) => {
    try {
      const data = await ClubApi.getClubAllMember(id)
      if( data ) {
        setClubMemberList(data)
      }
    }catch(error){
      if( isAxiosError<ErrorResponse>(error) ){
        if(error.response?.data.status === 403){
          getClubMemberList(id)
        }
      }
    }
  }

  const getClubMemberList = async (id: number = 1) => {
    try {
      const data = await ClubApi.getClubMember(id)
      if( data ) {
        setClubMemberList(data)
      }
    }catch(error){
      return error
    }
  }

  return {
    memberList,
    clubMemberList,
    clubLeader,
    getClubLeader,
    getClubMemberList,
    getMemberList,
    getAllClubMemberList,
    getMemberListForSelf
  }
}

export default useGetMember