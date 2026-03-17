import * as S from "./style";
import { useGetStudentApplyQuery } from "src/queries/useClub";
import StudentApplyStatusText from "src/components/ClubMenuBar/ClubMenu/StudentApplyMenu/StudentApplyStatusText";
import { DodamFilledButton } from "@b1nd/dds-web";
import { useNavigate } from "react-router-dom";

interface StudentApplyMenuProps {
  time: string;
}
const StudentApplyMenu = ({
  time
}: StudentApplyMenuProps) => {
  const { data } =
    useGetStudentApplyQuery();
  const navigate = useNavigate();

  return data!.filter(item => item.club.status === "ALLOWED").length === 1 ? (
    <S.MenuItemContainer>
      <p>내 동아리 정보</p>
      {data?.map((item) => (
        <div>
          <p>{item.club.name}</p>
          <StudentApplyStatusText status={item.status} />
        </div>
      ))}
    </S.MenuItemContainer>
  ) : (
    <>
      <DodamFilledButton
        size={"Large"}
        text="동아리 입부 신청하기"
        textTheme="staticWhite"
        typography={["Body2", "Bold"]}
        onClick={() => navigate("/register")}
      />
      <S.MyClubIsNone>
        <p>
          아직 동아리에 <br /> 신청하지 않았어요!
        </p>
        <div>
          <span>신청 마감 : {time}</span>
        </div>
      </S.MyClubIsNone>
    </>
  );
}

export default StudentApplyMenu;