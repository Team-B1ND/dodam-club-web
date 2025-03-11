import ClubList from "src/components/ClubList";
import ClubMenuBar from "src/components/ClubMenuBar";
import { ClubDataBox,ClubSidebar,CulbBox } from "./style";

const MainPage = () => {

  return (
    <CulbBox>
      <ClubDataBox>
        <ClubList />
      </ClubDataBox>
      <ClubSidebar>
        <ClubMenuBar />
      </ClubSidebar>
    </CulbBox>
  );
};

export default MainPage;