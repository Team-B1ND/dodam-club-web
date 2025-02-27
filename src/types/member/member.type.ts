export interface Student {
  id: number;
  name: string;
  grade: number;
  room: number;
  number: number;
  code: string;
  profileImage?: string;
  status?: string;
}

export interface Teacher {
  id: number;
  tel: string;
  position: string;
}
