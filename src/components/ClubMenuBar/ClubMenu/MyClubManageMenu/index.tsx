import { DodamFilledButton } from "@b1nd/dds-web";
import { Dispatch, SetStateAction } from "react";
import ClubMemberManager from "src/components/ClubMemberManager";
import { useGetMyClubApplyQuery } from "src/queries/useClub";

interface MyClubManageMenuProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const MyClubManageMenu = ({ 
  isOpen,
  setIsOpen
}: MyClubManageMenuProps) => {
  const { data: myClub, isLoading: clubIsLoading } = useGetMyClubApplyQuery();

  return clubIsLoading || myClub?.length === 0 ? (
    <></>
  ) : (
    <>
      <DodamFilledButton
        size={"Large"}
        text="동아리 신청 인원 관리"
        textTheme="staticWhite"
        typography={["Body2", "Bold"]}
        onClick={() => setIsOpen(true)}
      />
      <ClubMemberManager 
        close={() => setIsOpen(false)} 
        isOpen={isOpen}
        myClub={myClub![0]}
      />
    </>
  );
};

export default MyClubManageMenu