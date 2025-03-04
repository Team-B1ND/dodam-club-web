import customAxios from "src/libs/axios/customAxios";
import { postClubParams } from "./club.params";
import { baseResponse } from "src/types/response/response.type";
import { Student } from "src/types/member/member.type";
import { ClubJoinResponse, ClubMember, ClubResponse } from "src/types/club/club.type";
import { EClubState } from "src/enum/club/club.enum";

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

  public async getClubLeader(id: number) {
    const data = await customAxios.get<baseResponse<ClubMember>>(`/clubs/${id}/leader`)
    return data.data.data
  }

  public async getClubMember(id: number) {
    const data = await customAxios.get<baseResponse<ClubMember[]>>(`/clubs/${id}/members`)
    return data.data.data
  }

  public async getMembers(isSelf:boolean): Promise<Student[]> {
    const data = await customAxios.get<baseResponse<Student[]>>(`/clubs/members?self=${isSelf}`)
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
  
  public async getMyClubs() {
    const data = await customAxios.get<baseResponse<ClubResponse[]>>(`clubs/joined`)
    return data.data.data
  }

  public async getMyClubApply() {
    const data = await customAxios.get<baseResponse<ClubResponse[]>>(`clubs/my`)
    data.data.data = data.data.data.filter((item) => item.state !== EClubState.DELETED)
    return data.data.data
  }

  public async deleteClub(id: number) {
    await customAxios.delete(`clubs/${id}`)
  }
}

export default new ClubApi();