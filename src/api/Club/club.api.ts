import customAxios from "src/libs/axios/customAxios";
import { postClubParams } from "./club.params";
import { baseResponse } from "src/types/response/response.type";
import { Student } from "src/types/member/member.type";

class ClubApi {
  public async postClub(createClubData: postClubParams): Promise<void> {
    await customAxios.post(`/clubs`, createClubData)
  }

  public async getMembers(): Promise<Student[]> {
    const data = await customAxios.get<baseResponse<Student[]>>(`/clubs/members`)
    return data.data.data
  }
}

export default new ClubApi();