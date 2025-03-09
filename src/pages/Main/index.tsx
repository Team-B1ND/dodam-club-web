import ClubList from "src/components/ClubList";
import ClubMenuBar from "src/components/ClubMenuBar";
import { ClubDataBox,ClubSidebar } from "./style";

const MainPage = () => {

  return (
    <>
      <ClubDataBox>
        <ClubList />
      </ClubDataBox>
      <ClubSidebar>
        <ClubMenuBar />
      </ClubSidebar>
    </>
  );
};

export default MainPage;