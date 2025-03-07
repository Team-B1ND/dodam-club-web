import * as S from "./style";
import { useRecoilValue } from "recoil";
import { themeModeAtom } from "src/store/theme/themeStore";
import { Link, useParams } from "react-router-dom";
import { EClub, EClubState } from "src/enum/club/club.enum";
import {
  ArrowLeft,
  CheckmarkCircleFilled,
  Clock,
  Close,
  DodamColor,
  DodamFilledButton,
  XmarkCircle,
} from "@b1nd/dds-web";
import MDEditor from "@uiw/react-md-editor";
import MemberItem from "@components/MemberItem";
import { useGetClubDetailQuery } from "src/queries/useClub";
import ClubDetailSkeleton from "@components/Common/ClubDetailSkeleton";
import {
  useGetClubLeaderQuery,
  useGetClubMemberQuery,
} from "src/queries/member/member.query";
import { useDeleteClubApplyQuery, usePostClubApplyQuery } from "src/queries/clubApply/clubApply.query";
import { useTheme } from "styled-components";
import { ClubDetailType } from "src/types/club/club.type";
interface ClubDetailProps {
  type: ClubDetailType;
  modalId?: number;
  close?: () => void;
}

const ClubDetail = ({ type, modalId = 1, close }: ClubDetailProps) => {
  const { id } = useParams();
  const currentTheme = useRecoilValue(themeModeAtom);
  const theme = useTheme()
  
  const postClubApplyMutation = usePostClubApplyQuery()
  const deleteClubApplyMutation = useDeleteClubApplyQuery()

  const { data: clubData, isLoading: clubDataIsLoading } =
    useGetClubDetailQuery({ id: type === "MODAL" ? modalId : +id! });

  const { data: leaderData, isLoading: leaderIsLoading } =
    useGetClubLeaderQuery({ id: type === "MODAL" ? modalId : +id! });

  const { data: clubMemberData, isLoading: clubMemberIsLoading, isFetching } =
    useGetClubMemberQuery({ id: type === "MODAL" ? modalId : +id! });
    
  return (
    <S.ClubDetail>
      <S.ClubDetailContainer
        $type={type}
        data-color-mode={currentTheme.toLowerCase()}
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
        {clubDataIsLoading || leaderIsLoading || clubMemberIsLoading || isFetching
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
                  {clubData!.state === EClubState.ALLOWED
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
                {leaderData!.number}
                {leaderData!.name}
              </p>
            </S.ClubDetailHeader>
            {clubMemberData
            && (
              <S.ClubDetailMenu>
                <S.ClubDetailMenuInfoAndButton>
                  동아리 개설
                  <S.ClubDetailMenuButton>
                    <DodamFilledButton
                      size="Small"
                      text="승인 신청하기"
                      typography={["Caption1", "Bold"]}
                      width={100}
                      textTheme={currentTheme}
                      enabled={
                        clubMemberData?.students.length ==
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
                      textTheme={currentTheme}
                      backgroundColorType="Negative"
                      onClick={() => deleteClubApplyMutation.mutate(clubData!.id)}
                    />
                  </S.ClubDetailMenuButton>
                </S.ClubDetailMenuInfoAndButton>
              </S.ClubDetailMenu>
            )}

            <S.ClubDetailMainContainer>
              <S.ClubDeatilMemberList>
                부원
                {clubMemberData!.students.map(
                  (item) => (
                    <MemberItem
                      value={item}
                      type={type === "MODAL" ? "STATUS" : "LIST"}
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
