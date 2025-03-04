import {  useState } from "react";
import * as S from "./style";
import {  DodamSegmentedButton } from "@b1nd/dds-web";
import ClubItem from "./ClubItem";
import { ClubResponse } from "src/types/club/club.type";
import { EClub } from "src/enum/club/club.enum";
import { Link } from "react-router-dom";
import { useGetClubsQuery } from "src/queries/useClub";
import ClubItemSkeleton from "@components/Common/ClubItemSkeleton";

const ClubList = () => {
  const [ isCreativeClubPage, setIsCreativeClubPage ] = useState(true);

  const {data:clubData, isLoading, isError} = useGetClubsQuery();

  const changePage = () => {
    setIsCreativeClubPage(prev=>!prev)
  }
  
  if ( isError ) {
    return <S.ClubListContainer>데이터를 불러오는 중 오류가 발생했습니다.</S.ClubListContainer>;
  }
  if(clubData?.length == 0) {
    return <S.ClubListContainer>동아리가 없습니다.</S.ClubListContainer>;
  }

  return (
    <S.ClubListContainer>
      <S.ClubListHead>동아리</S.ClubListHead>
      <S.ClubMenu>
        <DodamSegmentedButton
          num={2}
          type="block"
          data={[
            { text: '창체동아리', isAtv: isCreativeClubPage },
            { text: '자율동아리', isAtv: !isCreativeClubPage }
          ]}
          width={280}
          height={56}
          onClick={changePage}
        />
      </S.ClubMenu>
      <S.ClubItemContainer>
          {isLoading
          ? Array.from({ length: 8 }).map((_, idx) => <ClubItemSkeleton key={idx}/>)
          : clubData!
          .filter((item: ClubResponse) =>
            isCreativeClubPage
              ? item.type === EClub.CREATIVE_CLUB
              : item.type === EClub.SELF_DIRECT_CLUB
          )
          .map((item: ClubResponse) => (
            <Link to={`/${item.id}`} key={item.id} style={{ height: "fit-content" }}>
              <ClubItem value={item} />
            </Link>
          ))}
          
      </S.ClubItemContainer>

    </S.ClubListContainer>
  );
};

export default ClubList;
