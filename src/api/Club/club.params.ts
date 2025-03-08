import { EditClub } from "src/types/club/club.type";

export interface patchClubParams { 
  data: EditClub;
  id: number;
}

export interface postMemberStatusParams {
  clubId : number;
  studentId: number;
  status: string;
}