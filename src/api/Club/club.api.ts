import customAxios from "src/libs/axios/customAxios";
import { baseResponse } from "src/types/response/response.type";
import { Student } from "src/types/member/member.type";
import { Club, ClubJoinResponse, ClubMember, ClubMemberResponse, ClubResponse } from "src/types/club/club.type";
import { EClubState } from "src/enum/club/club.enum";

class ClubApi {
  public async postClub(data:Club): Promise<void> {
    await customAxios.post(`/clubs`, data)
  }

  public async getClubs(): Promise<ClubResponse[]> {
    const { data } = await customAxios.get<baseResponse<ClubResponse[]>>(`/clubs`)
    return data.data
  }

  public async getClub(id: number) {
    const { data } = await customAxios.get<baseResponse<ClubResponse>>(`/clubs/${id}`)
    return data.data
  }

  public async getClubLeader(id: number) {
    const { data }= await customAxios.get<baseResponse<ClubMember>>(`/clubs/${id}/leader`)
    return data.data
  }

  public async getClubMembers(id: number) {
    const { data }= await customAxios.get<baseResponse<ClubMemberResponse>>(`/clubs/${id}/members`)
    return data.data
  }

  public async getMembers(isSelf:boolean): Promise<Student[]> {
    const { data }= await customAxios.get<baseResponse<Student[]>>(`/clubs/members?self=${isSelf}`)
    return data.data
  }
  
  public async postJoinClubByRequest({id}: {id: number}) {
    await customAxios.post(`/clubs/join-requests/${id}`)
  }

  public async deleteJoinClubByRequest({id}: {id: number}) {
    await customAxios.delete(`/clubs/join-requests/${id}`)
  }

  public async getJoinRequests() {
    const { data } = await customAxios.get<baseResponse<ClubJoinResponse[]>>(`/clubs/join-requests/received`)
    return data.data
  }
  
  public async getMyJoinedClubs() {
    const { data } = await customAxios.get<baseResponse<ClubResponse[]>>(`clubs/joined`)
    return data.data
  }

  public async getMyClubApply() {
    const { data }= await customAxios.get<baseResponse<ClubResponse[]>>(`clubs/my`)
    data.data = data.data.filter((item) => item.state !== EClubState.DELETED)
    return data.data
  }

  public async deleteClubApply(id:number) {
    await customAxios.delete(`clubs/${id}`)
  }

  public async postClubApply(id:number) {
    await customAxios.post(`/clubs/${id}/waiting`)
  }
}

export default new ClubApi();