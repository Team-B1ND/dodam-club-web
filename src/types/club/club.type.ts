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

export interface ClubProps {
  value: ClubResponse;
}

export interface ClubMenuProps {
  name: string;
  value: Club[];
}

export interface MiniClubProps extends ClubProps {
  type?: string;
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
}
