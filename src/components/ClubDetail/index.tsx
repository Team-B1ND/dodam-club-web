import * as S from "./style";
import { Link, useParams } from "react-router-dom";
import { EClub, EClubState } from "src/enum/club/club.enum";
import {
  ArrowLeft,
  CheckmarkCircleFilled,
  Clock,
  Close,
  DodamColor,
  DodamFilledButton,
  Pen,
  XmarkCircle,
} from "@b1nd/dds-web";
import MDEditor from "@uiw/react-md-editor";
import ClubDetailSkeleton from "src/components/Common/ClubDetailSkeleton";
import {
  useGetClubLeaderQuery,
  useGetClubMemberQuery,
} from "src/queries/member/member.query";
import { useDeleteClubApplyMutation, usePostClubApplyMutation } from "src/queries/clubApply/clubApply.query";
import { useTheme } from "styled-components";
import { ClubDetailType } from "src/types/club/club.type";
import { useGetClubDetailQuery } from "src/queries/useClub";
import { useGetTime } from "src/queries/time/time.query";
import MemberItem from "src/components/MemberItem";
import { useClubTime } from "src/hooks/club/useClubTime";
interface ClubDetailProps {
  type: ClubDetailType;
  modalId?: number;
  close?: () => void;
}

const ClubDetail = ({ type, modalId = 1, close }: ClubDetailProps) => {
  const { id } = useParams();
  const theme = useTheme()
  
  const postClubApplyMutation = usePostClubApplyMutation()
  const deleteClubApplyMutation = useDeleteClubApplyMutation()

  const { data: clubData, isLoading: clubDataIsLoading } =
    useGetClubDetailQuery(type === "MODAL" ? modalId : +id!);

  const { data: leaderData, isLoading: leaderIsLoading } =
    useGetClubLeaderQuery(type === "MODAL" ? modalId : +id!);

  const { data: clubMemberData, isLoading: clubMemberIsLoading, isFetching } =
    useGetClubMemberQuery(type === "MODAL" ? modalId : +id!);

  const { timeData, timeIsLoading, today} = useClubTime()
  return (
    <S.ClubDetail>
      <S.ClubDetailContainer
        $type={type}
      >
        {type == "PAGE"
        ? (
          <Link to={"/"}>
            <ArrowLeft $svgStyle={{ cursor: "pointer" }} color="labelNormal" />
          </Link>
        )
        : (
          <div onClick={close}>
            <Close $svgStyle={{ cursor: "pointer" }} color="labelNormal" />
          </div>
        )}
        {clubDataIsLoading || leaderIsLoading || clubMemberIsLoading || isFetching || timeIsLoading
        ? (
          <ClubDetailSkeleton />
        )
        : (
          <>
            <S.ClubDetailHeader>
              <S.ClubDetailHeaderInfo>
                <S.ClubDetailHeaderSubject>
                  {clubData!.type === EClub.CREATIVE_CLUB
                    ? "창체 • "
                    : "자율 • "}
                  {clubData!.subject}
                </S.ClubDetailHeaderSubject>
                <S.ClubDetailHeaderName>
                  {clubData!.name}
                  {timeData!.applicantStart < today
                  && clubData!.state === EClubState.ALLOWED
                  ? (
                    <CheckmarkCircleFilled
                      size={28}
                      color={DodamColor.green50}
                    />
                  )
                  : clubData!.state === EClubState.REJECTED
                    ? (
                    <XmarkCircle size={28} color={DodamColor.red50} />
                    )
                    : (
                      <Clock size={28} color={DodamColor.yellow50}/>
                    )
                  }
                </S.ClubDetailHeaderName>
                <S.ClubDetailHeaderShortDescription>
                  {clubData!.shortDescription}
                </S.ClubDetailHeaderShortDescription>
              </S.ClubDetailHeaderInfo>
              <p>
                부장 :&nbsp;
                {leaderData!.grade}
                {leaderData!.room}
                {leaderData!.number < 10 ? `0${leaderData!.number}` : leaderData?.number!}
                {leaderData!.name}
              </p>
            </S.ClubDetailHeader>
            {clubMemberData?.isLeader
            && (
              <S.ClubDetailMenu>
                {timeData!.createEnd > today
                  && (                    
                  <S.ClubDetailMenuInfoAndButton>
                    동아리 개설
                    <S.ClubDetailMenuButton>
                      <DodamFilledButton
                        size="Small"
                        text="승인 신청하기"
                        typography={["Caption1", "Bold"]}
                        width={100}
                        textTheme="staticWhite"
                        enabled={
                          (clubData?.type === EClub.CREATIVE_CLUB ? 5 : 10 ) <
                          clubMemberData?.students.filter(
                            (item) => item.status === EClubState.ALLOWED
                          ).length
                        }
                        onClick={() => postClubApplyMutation.mutate(clubData!.id)}
                      />
                      <DodamFilledButton
                        size="Small"
                        text="취소하기"
                        typography={["Caption1", "Bold"]}
                        width={100}
                        textTheme="staticWhite"
                        backgroundColorType="Negative"
                        onClick={() => deleteClubApplyMutation.mutate(clubData!.id)}
                      />
                    </S.ClubDetailMenuButton>
                  </S.ClubDetailMenuInfoAndButton>
                  )}
                  <S.ClubDetailEditButton to={`/edit/${clubData?.id}`}>
                    <Pen size={20} color="staticWhite"/>
                  </S.ClubDetailEditButton>
              </S.ClubDetailMenu>
            )}

            <S.ClubDetailMainContainer>
              <S.ClubDeatilMemberList>
                부원
                {clubMemberData!.students.map(
                  (item) => (
                    <MemberItem
                      value={item}
                      type={clubMemberData?.isLeader ? "STATUS" : "LIST"}
                      key={item.id}
                    />
                  )
                )}
              </S.ClubDeatilMemberList>
              <S.ClubDetailDescription>
                설명
                <S.ClubDetailMarkDownViewer>
                  <MDEditor.Markdown
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
  );
};

export default ClubDetail;