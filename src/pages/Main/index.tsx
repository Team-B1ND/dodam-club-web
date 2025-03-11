import ClubMenuBar from "src/components/ClubMenuBar";
import { DodamErrorBoundary } from "@b1nd/dds-web";
import { ClubDataBox,ClubSidebar,ClubBox } from "./style";
import { Suspense } from "react";
import ClubMenuListSkeleton from "src/components/Common/ClubMenuListSkeleton";
import ClubListContainer from "src/components/ClubListContainer";

const MainPage = () => {

  return (
    <ClubBox>
      <ClubDataBox>
        <ClubListContainer/>
      </ClubDataBox>
      <ClubSidebar>
        <DodamErrorBoundary text="데이터를 불러오는 중 오류가 발생했습니다." >
          <Suspense fallback={<ClubMenuListSkeleton/>}>
            <ClubMenuBar />
          </Suspense>
        </DodamErrorBoundary>
      </ClubSidebar>
    </ClubBox>
  );
};

export default MainPage;