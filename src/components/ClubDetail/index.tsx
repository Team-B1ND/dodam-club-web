import * as S from './style'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  Close,
  Pen,
} from '@b1nd/dds-web'
import ClubDetailSkeleton from 'src/components/Common/ClubDetailSkeleton'
import {
  useGetClubLeaderQuery,
  useGetClubMemberQuery,
} from 'src/queries/member/member.query'
import { useTheme } from 'styled-components'
import { ClubDetailType } from 'src/types/club/club.type'
import { useGetClubDetailQuery } from 'src/queries/useClub'
import MemberItem from 'src/components/MemberItem'
import { useClubTime } from 'src/hooks/club/useClubTime'

interface ClubDetailProps {
  type: ClubDetailType
  modalId?: number
  close?: () => void
}

const ClubDetail = ({ type, modalId = 1, close }: ClubDetailProps) => {
  const { id } = useParams()
  const theme = useTheme()

  const { data: clubData, isLoading: clubDataIsLoading } =
    useGetClubDetailQuery(type === 'MODAL' ? modalId : +id!)

  const { data: leaderData, isLoading: leaderIsLoading } =
    useGetClubLeaderQuery(type === 'MODAL' ? modalId : +id!)

  const {
    data: clubMemberData,
    isLoading: clubMemberIsLoading,
    isFetching,
  } = useGetClubMemberQuery(type === 'MODAL' ? modalId : +id!)

  const { timeData, timeIsLoading, today } = useClubTime()
  return (
    <S.ClubDetail>
      <S.ClubDetailContainer $type={type}>
        {type == 'PAGE' ? (
          <Link to={'/'}>
            <ArrowLeft $svgStyle={{ cursor: 'pointer' }} color='labelNormal' />
          </Link>
        ) : (
          <div onClick={close}>
            <Close $svgStyle={{ cursor: 'pointer' }} color='labelNormal' />
          </div>
        )}
        {clubDataIsLoading ||
        leaderIsLoading ||
        clubMemberIsLoading ||
        isFetching ||
        timeIsLoading ? (
          <ClubDetailSkeleton />
        ) : (
          <>
            <S.ClubDetailHeader>
              <S.ClubDetailHeaderInfo>
                <S.ClubDetailHeaderName>
                  {clubData!.name}
                </S.ClubDetailHeaderName>
                <S.ClubDetailHeaderShortDescription>
                  {clubData!.shortDescription}
                </S.ClubDetailHeaderShortDescription>
              </S.ClubDetailHeaderInfo>
              <p>
                부장 :&nbsp;
                {leaderData!.grade}
                {leaderData!.room}
                {leaderData!.number < 10
                  ? `0${leaderData!.number}`
                  : leaderData?.number!}
                {leaderData!.name}
              </p>
            </S.ClubDetailHeader>
            {clubMemberData!.isLeader && (
              <S.ClubDetailMenu>
                <S.ClubDetailEditButton to={`/edit/${clubData?.id}`}>
                  <Pen size={20} color='staticWhite' />
                </S.ClubDetailEditButton>
              </S.ClubDetailMenu>
            )}

            <S.ClubDetailMainContainer>
              <S.ClubDetailMemberList>
                부원
                {clubMemberData!.students
                  .filter(item => item.status !== "DELETED")
                  .map((item) => (
                    <MemberItem
                      value={item}
                      type={clubMemberData?.isLeader ? 'STATUS' : 'LIST'}
                      key={item.id}
                    />
                  ))
                }
              </S.ClubDetailMemberList>
              <S.ClubDetailDescription>
                설명
                <S.ClubDetailMarkDownViewer>
                  <S.MarkDownViewer
                    source={clubData!.description}
                    style={{ backgroundColor: `${theme.backgroundNormal}` }}
                  />
                </S.ClubDetailMarkDownViewer>
              </S.ClubDetailDescription>
            </S.ClubDetailMainContainer>
          </>
        )}
      </S.ClubDetailContainer>
    </S.ClubDetail>
  )
}

export default ClubDetail
