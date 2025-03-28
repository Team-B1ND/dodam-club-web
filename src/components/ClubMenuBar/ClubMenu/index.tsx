import * as S from './style'
import ClubMiniList from './ClubMiniList'
import { ClubMenuProps} from 'src/types/club/club.type';
import { EClub } from 'src/enum/club/club.enum';
import { useGetMyClubApplyQuery, useGetMyJoinedClubQuery, useGetStudentApplyQuery } from 'src/queries/useClub';
import { useGetJoinRequestsQuery } from 'src/queries/joinRequest/joinRequest.query';
import ClubMenuSkeleton from 'src/components/Common/ClubMenuSkeleton';

const ClubMenu = ({ name, type, time } : ClubMenuProps) => {
  const { data: myClubApply, isLoading: applyIsLoading } = useGetMyClubApplyQuery()
  const { data: myClub, isLoading: myClubIsLoading } = useGetMyJoinedClubQuery()
  const { data: joinRequestList, isLoading: joinRequestIsLoading } = useGetJoinRequestsQuery()
  const { data: studentClubApply, isLoading: studentApplyIsLoading } = useGetStudentApplyQuery()

  return(
    applyIsLoading || myClubIsLoading || joinRequestIsLoading || studentApplyIsLoading)
  ? (
    <ClubMenuSkeleton/>
  )
  : (
    <S.ClubMenuContainer>
      {name}
        {(type === "Request" && joinRequestList!.length > 0)
        ? (
          <S.MyClubList>
            <ClubMiniList
              name="창체"
              type={type}
              value={joinRequestList!.filter((item) => (item.club.type === EClub.CREATIVE_CLUB))}
            />
            <ClubMiniList
              name="자율"
              type={type}
              value={joinRequestList!.filter((item) => (item.club.type === EClub.SELF_DIRECT_CLUB))}
            />
          </S.MyClubList>
        )
        : (type === "MyClub" && myClub!.length > 0)
        ? (
          <S.MyClubList>
            <ClubMiniList
              name="창체"
              type={type}
              value={myClub!.filter((item) => (item.type === EClub.CREATIVE_CLUB))}
            />
            <ClubMiniList
              name="자율"
              type={type}
              value={myClub!.filter((item) => (item.type === EClub.SELF_DIRECT_CLUB))}
            />
          </S.MyClubList>
        )
        : (type === "LeaderApply" && myClubApply!.length > 0)
        ? (
          <S.MyClubList>
            <ClubMiniList
              name="창체"
              type={type}
              value={myClubApply!.filter((item) => (item.type === EClub.CREATIVE_CLUB))}
            />
            <ClubMiniList
              name="자율"
              type={type}
              value={myClubApply!.filter((item) => (item.type === EClub.SELF_DIRECT_CLUB))}
            />
          </S.MyClubList>
        )
        : (type === "LeaderApply" && myClubApply!.length <= 0)
        ? (
          <S.MyClubIsNone>
            <p>아직 동아리 개설을</p>
            <p>신청하지 않았어요!</p>
            <S.ClubCreatePeriod>
              신청 마감 : {time?.createEnd.replace(/-/g,'.')}
            </S.ClubCreatePeriod>
          </S.MyClubIsNone>
        )
        : (type === "StudentApply" && studentClubApply!.length > 0)
        ? (
          <S.MyClubList>
            <ClubMiniList
              name="창체"
              type={type}
              value={studentClubApply!.filter((item) => (item.club.type === EClub.CREATIVE_CLUB))}
            />
            <ClubMiniList
              name="자율"
              type={type}
              value={studentClubApply!.filter((item) => (item.club.type === EClub.SELF_DIRECT_CLUB))}
            />
          </S.MyClubList>
        )
        : (type === "StudentApply" && studentClubApply!.length <= 0)
        ? (
          <S.MyClubIsNone>
            <p>아직 동아리에</p>
            <p>신청하지 않았어요!</p>
            <S.ClubCreatePeriod>
              신청 마감 : {time.applicantEnd.replace(/-/g,'.')}
            </S.ClubCreatePeriod>
          </S.MyClubIsNone>
        )
        : (
          <S.ClubDataIsNone>
            <p>받은 제안이나</p>
            <p>나의 동아리가 없어요.</p>
          </S.ClubDataIsNone>
        )
      }
    </S.ClubMenuContainer>
  )
}

export default ClubMenu