import ClubMain from "src/components/ClubMain";
import ClubMenuBar from "src/components/ClubMenuBar";
import { ClubDataBox,ClubSidebar,ClubBox } from "./style";

const MainPage = () => {

  return (
    <ClubBox>
      <ClubDataBox>
        <ClubMain />
      </ClubDataBox>
      <ClubSidebar>
        <ClubMenuBar />
      </ClubSidebar>
    </ClubBox>
  );
};

export default MainPage;