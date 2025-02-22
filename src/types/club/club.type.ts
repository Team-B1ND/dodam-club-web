export interface Club {
  subject: string;
  name: string;
  state: string;
  description: string;
  image: string;
  isCreativeClub: boolean;
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

