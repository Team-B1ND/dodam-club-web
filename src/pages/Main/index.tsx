import * as S from "./style";
import ClubList from "@components/ClubList";
import ClubMenu from "@components/ClubMenu";
import { DodamFilledButton } from "@b1nd/dds-web";
import { Link } from "react-router-dom";

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
        {/* <ClubMenu name="내 개설 신청" value={examples} /> */}
      </S.clubMenubar>
    </>
  );
};

export default MainPage;
