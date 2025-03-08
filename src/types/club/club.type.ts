import { ClubTime } from "src/api/time/time.api";
import { Student } from "../member/member.type";

export interface Club {
  name: string;
  description: string;
  shortDescription: string;
  subject: string;
  image: string;
  type: string;
  studentIds: number[];
  state?: string;
}

export interface EditClub {
  name: string;
  description: string;
  shortDescription: string;
  subject: string;
  image: string;
}

export interface ClubMember {
  id: number;
  status: string;
  permission: string;
  studentId: number;
  name: string;
  grade: number;
  room: number;
  number: number;
  profileImage: string | null;
}

export interface ClubMemberResponse {
  students: ClubMember[];
  isLeader: boolean;
}

export interface ClubProps {
  value: ClubResponse;
}

export interface ClubJoinRequest {
  student: Student;
  introduce: string;
}

export interface ClubResponse {
  id: number;
  name: string;
  description: string;
  shortDescription: string;
  subject: string;
  image: string;
  type: string;
  teacher: string;
  state: string;
  createdAt?: string;
  modifiedAt?: string;
}

export interface ClubJoinResponse {
  id: number;
  clubPermission: string;
  status: string;
  club: ClubResponse;
}

export interface StudentApplyResponse extends ClubJoinResponse {
  priority: null;
  introduction: string;
}

export interface ClubMenuProps {
  name: string;
  type: "LeaderApply" | "Request" | "MyClub" | "StudentApply";
  time: ClubTime;
}

export interface ClubMenuItemProps {
  name: string;
  value: ClubJoinResponse[];
  type: "Request";
}

export interface ClubMenuItemMyClubProps {
  name: string;
  value: ClubResponse[];
  type: "LeaderApply" | "MyClub";
}
export interface ClubMenuItemStudentProps {
  name: string;
  value: StudentApplyResponse[]
  type: "StudentApply"
}
export type ClubDetailType = "MODAL" | "PAGE";