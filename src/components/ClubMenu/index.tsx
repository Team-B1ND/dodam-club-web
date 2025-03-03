import * as S from './style'
import ClubMiniList from '@components/ClubMenu/ClubMiniList'
import { ClubMenuProps } from 'src/types/club/club.type';
import { EClub } from 'src/enum/club/club.enum';
import { useGetJoinRequest } from "src/hooks/club/useGetJoinRequest";
import { useEffect } from "react";
import useGetClubs from 'src/hooks/club/useGetClubs';

const ClubMenu = ({ name, type } : ClubMenuProps) => {
  const { joinRequestList, getJoinRequest } = useGetJoinRequest();
  const { clubList, getMyClubs, getMyClubApply } = useGetClubs()

  useEffect(() => {
    if(type === "Request"){
      getJoinRequest()
    }else if(type === "MyClub"){
      getMyClubs()
    }else if(type === "LeaderApply"){
      getMyClubApply()
    }
  }, [])

  return type === "Request"
  ? (joinRequestList.length > 0
    && (
    <S.ClubMenuContainer>
      {name}
      <S.MyClubList>
        <ClubMiniList name="창체" type={type} value={joinRequestList.filter((item) => (item.club.type === EClub.CREATIVE_CLUB))}/>
        <ClubMiniList name="자율" type={type} value={joinRequestList.filter((item) => (item.club.type === EClub.SELF_DIRECT_CLUB))}/>
      </S.MyClubList>
    </S.ClubMenuContainer>
    )
  )
  : (type === "LeaderApply" && clubList.length > 0)
    ? (
      <S.ClubMenuContainer>
          {name}
          <S.MyClubList>
            <ClubMiniList name="창체" type={type} value={clubList.filter((item) => (item.type === EClub.CREATIVE_CLUB))}/>
            <ClubMiniList name="자율" type={type} value={clubList.filter((item) => (item.type === EClub.SELF_DIRECT_CLUB))}/>
          </S.MyClubList>
        </S.ClubMenuContainer>
    )
    : (type === "LeaderApply" && clubList.length <= 0)
      ? (
        <S.MyClubIsNone>
          아직 동아리 개설을 <br/> 신청하지 않았어요!
          <S.ClubCreatePeriod>
            신청 마감 : 2025. 03. 19.
          </S.ClubCreatePeriod>
        </S.MyClubIsNone>
      )
      : (type === "MyClub" && clubList.length > 0) && (
        <S.ClubMenuContainer>
          {name}
          <S.MyClubList>
            <ClubMiniList name="창체" type={type} value={clubList.filter((item) => (item.type === EClub.CREATIVE_CLUB))}/>
            <ClubMiniList name="자율" type={type} value={clubList.filter((item) => (item.type === EClub.SELF_DIRECT_CLUB))}/>
          </S.MyClubList>
        </S.ClubMenuContainer>
      )
}

export default ClubMenu