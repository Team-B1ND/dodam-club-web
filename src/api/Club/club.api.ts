import customAxios from "src/libs/axios/customAxios";
import { postClubParams } from "./club.params";

class ClubApi {
  public async postClub(createClubData: postClubParams): Promise<void> {
    await customAxios.post(`/clubs`, createClubData)
  }
}

export default new ClubApi();