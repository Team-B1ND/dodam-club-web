import { ClubStatus } from "src/types/club/club.type"

export const STATUS_MAP: StatusMapType = {
  "ALLOWED": "승인됨",
  "DELETED": "삭제됨",
  "PENDING": "요청됨",
  "REJECTED": "거절됨",
  "WAITING": "대기중"
}

export const STUDENT_APPLY_STATUS_MAP: StatusMapType = {
  "ALLOWED": "합격",
  "DELETED": "불합격",
  "PENDING": "심사 중",
  "REJECTED": "불합격",
  "WAITING": "심사 중"
}

export type StatusMapType = Record<ClubStatus, string>