import { Dialog, DodamColor, DodamFilledButton, DodamModal, DodamShape } from "@b1nd/dds-web";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ClubMemberManager from "src/components/ClubMemberManager";
import Shimmer from "src/components/Common/Shimmer";
import { EClub } from "src/enum/club/club.enum";
import { useClubTime } from "src/hooks/club/useClubTime";
import {
  useGetMyClubApplyQuery,
  useGetMyJoinedClubQuery,
} from "src/queries/useClub";
import styled from "styled-components";

const ClubInteractionButton = ({ type }: { type?: "MYCLUB" | "LOADING" }) => {
  const { timeData, today } = useClubTime();
  const { data: joinedClub } = useGetMyJoinedClubQuery();
  const { data: myClub } = useGetMyClubApplyQuery({
    enabled: type === "MYCLUB",
  });

  const [resultIsOpen, setResultIsOpen] = useState(false);
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen((prev) => !prev);

  return type === "LOADING" ? (
    <ClubInteractionButtonSkeleton>
      <Shimmer/>
    </ClubInteractionButtonSkeleton>
  ) : (timeData!.createStart <= today && today <= timeData!.createEnd) ? (
    <DodamFilledButton
      size={"Large"}
      text="동아리 개설 신청하기"
      textTheme="staticWhite"
      typography={["Body2", "Bold"]}
      customStyle={{ minWidth: "50px" }}
      onClick={() => navigate("/create")}
    />
  ) : type == "MYCLUB" && myClub!.filter((item) => item.type === EClub.SELF_DIRECT_CLUB).length > 0 ? (
  <>
    <DodamFilledButton
      size={"Large"}
      text="자율동아리 관리"
      textTheme="staticWhite"
      typography={["Body2", "Bold"]}
      onClick={handleOpen}
    />
    <DodamModal isOpen={isOpen} background={true}>
      <ClubMemberManager close={handleOpen} />
    </DodamModal>
  </>
  ) : type == "MYCLUB" && myClub!.filter((item) => item.type === EClub.SELF_DIRECT_CLUB).length <= 0 ? (
    <></>
  ) : timeData!.applicantEnd < today ? (
    <>
      <DodamFilledButton
        size={"Large"}
        text="결과 확인하기"
        textTheme="staticWhite"
        typography={["Body2", "Bold"]}
        onClick={() => setResultIsOpen(true)}
      />
      <DodamModal isOpen={resultIsOpen} background={true}>
        <Dialog
          title="동아리 입부를 축하합니다!"
          text={`창체동아리 ${
            joinedClub?.find((item) => item.type === EClub.CREATIVE_CLUB)?.name
          }에 입부하셨습니다.
          자율동아리 ${joinedClub
            ?.filter((item) => item.type != EClub.CREATIVE_CLUB)
            .map((item) => item.name)}에 입부하셨습니다.`}
          type={{
            dialog: "ALERT",
            close: {
              content: "닫기",
              onClick: () => setResultIsOpen(false),
            },
          }}
        />
      </DodamModal>
    </>
  ) : (
    <DodamFilledButton
      size={"Large"}
      text="동아리 입부 신청하기"
      textTheme="staticWhite"
      typography={["Body2", "Bold"]}
      onClick={() => navigate("/register")}
    />
  );
};

export default ClubInteractionButton;

const ClubInteractionButtonSkeleton = styled.div`
  display: flex;
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 48px;
  ${DodamShape.Medium};
  background-color: ${DodamColor.blue30};
`