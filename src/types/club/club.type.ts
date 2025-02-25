export interface Club {
  name: string;
  subject: string;
  description: string;
  shortDescription: string;
  image: string;
  type: string;
  state?: string;
  studentIds: number[];
}

export interface ClubProps {
  value: Club;
}

export interface ClubMenuProps {
  name: string;
  value: Club[];
}

export interface MiniClubProps extends ClubProps {
  type?: string;
}

