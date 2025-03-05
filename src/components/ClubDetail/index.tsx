import * as S from "./style";
import { useRecoilValue } from "recoil";
import { themeModeAtom } from "src/store/theme/themeStore";
import { useTheme } from "styled-components";
import { Link, useParams } from "react-router-dom";
import { EClub, EClubState } from "src/enum/club/club.enum";
import {
  ArrowLeft,
  CheckmarkCircleFilled,
  Close,
  DodamColor,
  DodamFilledButton,
  ExclamationmarkCircle,
  XmarkCircle,
} from "@b1nd/dds-web";
import MDEditor from "@uiw/react-md-editor";
import MemberItem from "@components/MemberItem";
import clubApi from "src/api/Club/club.api";
import { useGetClubDetailQuery } from "src/queries/useClub";
import ClubDetailSkeleton from "@components/Common/ClubDetailSkeleton";
import {
  useGetClubLeaderQuery,
  useGetClubMemberQuery,
} from "src/queries/member/useMember";
import { useDeleteClubApplyQuery, usePostClubApplyQuery } from "src/queries/clubApply/useClubApply";
interface ClubDetailProps {
  type: "MODAL" | "PAGE";
  modalId?: number;
  close?: () => void;
}

const ClubDetail = ({ type, modalId = 1, close }: ClubDetailProps) => {
  const { id } = useParams();
  const currentTheme = useRecoilValue(themeModeAtom);
  const theme = useTheme();
  
  const postClubApplyMutation = usePostClubApplyQuery()
  const deleteClubApplyMutation = useDeleteClubApplyQuery()

  const { data: clubData, isLoading: clubDataIsLoading } =
    useGetClubDetailQuery({ id: type === "MODAL" ? modalId : Number(id) });

  const { data: leaderData, isLoading: leaderIsLoading } =
    useGetClubLeaderQuery({ id: type === "MODAL" ? modalId : Number(id) });

  const { data: clubMemberData, isLoading: clubMemberIsLoading } =
    useGetClubMemberQuery({ id: type === "MODAL" ? modalId : Number(id) });
    
  return (
    <S.ClubDetail>
      <S.ClubDetailContainer
        $type={type}
        data-color-mode={currentTheme.toLowerCase()}
      >
        {type == "PAGE"
        ? (
          <Link to={"/"}>
            <ArrowLeft $svgStyle={{ cursor: "pointer" }} color={theme.labelNormal} />
          </Link>
        )
        : (
          <div onClick={close}>
            <Close $svgStyle={{ cursor: "pointer" }} color={theme.labelNormal} />
          </div>
        )}
        {clubDataIsLoading || leaderIsLoading || clubMemberIsLoading
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
                  {clubData!.state === EClubState.ALLOWED ? (
                    <CheckmarkCircleFilled
                      size={28}
                      color={DodamColor.green50}
                    />
                  ) : clubData!.state === EClubState.REJECTED ? (
                    <XmarkCircle size={28} color={DodamColor.red50} />
                  ) : (
                    <ExclamationmarkCircle
                      size={28}
                      color={DodamColor.yellow50}
                    />
                  )}
                </S.ClubDetailHeaderName>
                <S.ClubDetailHeaderShortDescription>
                  {clubData!.shortDescription}
                </S.ClubDetailHeaderShortDescription>
              </S.ClubDetailHeaderInfo>
              <S.ClubDetailHeaderLeader>
                {`부장 : `}
                {leaderData!.grade}
                {leaderData!.room}
                {leaderData!.number}
                {leaderData!.name}
              </S.ClubDetailHeaderLeader>
            </S.ClubDetailHeader>
            {!clubMemberData!.findIndex((item) => item.name === leaderData!.name)
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
                      customStyle={{ color: "#fff", whiteSpace: "nowrap" }}
                      enabled={
                        clubMemberData!.length ==
                        clubMemberData!.filter(
                          (item) => item.status === EClubState.ALLOWED
                        ).length
                      }
                      onClick={() => postClubApplyMutation.mutate({id: clubData!.id})}
                    />
                    <DodamFilledButton
                      size="Small"
                      text="취소하기"
                      typography={["Caption1", "Bold"]}
                      width={100}
                      customStyle={{ color: "#fff", whiteSpace: "nowrap" }}
                      backgroundColorType="Negative"
                      onClick={() => deleteClubApplyMutation.mutate({id: clubData!.id})}
                    />
                  </S.ClubDetailMenuButton>
                </S.ClubDetailMenuInfoAndButton>
              </S.ClubDetailMenu>
            )}

            <S.ClubDetailMainContainer>
              <S.ClubDeatilMemberList>
                부원
                {clubMemberData!.map(
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
