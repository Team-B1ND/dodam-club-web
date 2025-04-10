import { Dialog, DodamFilledButton, DodamModal } from "@b1nd/dds-web";
import { useState } from "react";
import { EClub } from "src/enum/club/club.enum";
import { useGetMyJoinedClubQuery } from "src/queries/useClub";

const ClubResultChecker = () => {
  const [resultIsOpen, setResultIsOpen] = useState(false);
  const { data: joinedClub } = useGetMyJoinedClubQuery();

  return (
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
  );
};

export default ClubResultChecker;
