import * as S from "./style";
import ClubList from "@components/ClubList";
import { DodamFilledButton } from "@b1nd/dds-web";
import { Link } from "react-router-dom";
import ClubMenu from "@components/ClubMenu";

const MainPage = () => {

  return (
    <>
      <ClubList />
      <S.clubMenubar>
        <Link to={'/create'}>
          <DodamFilledButton
            size={"Large"}
            text="동아리 개설 신청하기"
            customStyle={{ color: "#fff", whiteSpace:'nowrap'}}
            typography={["Body2", "Bold"]}
          />
        </Link>
        <ClubMenu name="소속된 동아리" type="MyClub" />
        <ClubMenu name="내 개설 신청" type="LeaderApply" />
        <ClubMenu name="받은 부원 제안" type="Request" />
      </S.clubMenubar>
    </>
  );
};

export default MainPage;
