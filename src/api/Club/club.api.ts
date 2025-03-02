import customAxios from "src/libs/axios/customAxios";
import { postClubParams } from "./club.params";
import { baseResponse } from "src/types/response/response.type";
import { Student } from "src/types/member/member.type";
import { ClubJoinResponse, ClubMember, ClubResponse } from "src/types/club/club.type";

class ClubApi {
  public async postClub(createClubData: postClubParams): Promise<void> {
    await customAxios.post(`/clubs`, createClubData)
  }

  public async getClubs(): Promise<ClubResponse[]> {
    const data = await customAxios.get<baseResponse<ClubResponse[]>>(`/clubs`)
    return data.data.data
  }

  public async getClub(id: number) {
    const data = await customAxios.get<baseResponse<ClubResponse>>(`/clubs/${id}`)
    return data.data.data
  }

  public async getClubAllMember(id: number) {
    const data = await customAxios.get<baseResponse<ClubMember[]>>(`/clubs/${id}/all-members`)
    return data.data.data
  }

  public async getClubLeader(id: number) {
    const data = await customAxios.get<baseResponse<ClubMember>>(`/clubs/${id}/leader`)
    return data.data.data
  }

  public async getClubMember(id: number) {
    const data = await customAxios.get<baseResponse<ClubMember[]>>(`/clubs/${id}/members`)
    return data.data.data
  }

  public async getMembers(): Promise<Student[]> {
    const data = await customAxios.get<baseResponse<Student[]>>(`/clubs/members`)
    return data.data.data
  }

  public async getMembersSelf(): Promise<Student[]> {
    const data = await customAxios.get<baseResponse<Student[]>>(`/clubs/members/self`)
    return data.data.data
  }
  
  public async postJoinClubByRequest(id: number) {
    await customAxios.post(`/clubs/join-requests/${id}`)
  }

  public async deleteJoinClubByRequest(id: number) {
    await customAxios.delete(`/clubs/join-requests/${id}`)
  }

  public async getJoinClubByRequest() {
    const data = await customAxios.get<baseResponse<ClubJoinResponse[]>>(`/clubs/join-requests/received`)
    return data.data.data
  }
}

export default new ClubApi();