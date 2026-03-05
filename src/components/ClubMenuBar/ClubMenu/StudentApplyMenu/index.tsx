import { useGetStudentApplyQuery } from "src/queries/useClub";
import { ClubTime } from "src/api/time/time.api";
import * as S from "./style";
import StudentApplyStatusText from "src/components/ClubMenuBar/ClubMenu/StudentApplyMenu/StudentApplyStatusText";

interface StudentApplyMenuProps {
  time: ClubTime;
}
const StudentApplyMenu = ({
  time
}: StudentApplyMenuProps) => {
  const { data } =
    useGetStudentApplyQuery();

  return data!.length > 0 ? (
    <S.MenuItemContainer>
      {data?.map((item) => (
        <div>
          {item.club.name}
          <StudentApplyStatusText status={item.status} />
        </div>
      ))}
    </S.MenuItemContainer>
  ) : (
    <S.MyClubIsNone>
      <p>아직 동아리에</p>
      <p>신청하지 않았어요!</p>
      <S.ClubCreatePeriod>
        신청 마감 : {time.applicantEnd.replace(/-/g, ".")}
      </S.ClubCreatePeriod>
    </S.MyClubIsNone>
  );
}

export default StudentApplyMenu;