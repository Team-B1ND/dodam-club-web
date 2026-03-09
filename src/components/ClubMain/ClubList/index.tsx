import * as S from "./style";
import { useState } from "react";
import ClubItem from "./ClubItem";
import { ClubResponse } from "src/types/club/club.type";
import { EClub } from "src/enum/club/club.enum";
import { Link } from "react-router-dom";
import { useGetClubsQuery } from "src/queries/useClub";
import ClubItemSkeleton from "src/components/Common/ClubItemSkeleton";


const ClubList = () => {
  const [ isCreativeClubPage, setIsCreativeClubPage ] = useState(true);
  const {data:clubData, isLoading, isFetching} = useGetClubsQuery();
  
  return (
    <S.ClubListContainer>
      <S.ClubItemContainer>
        {isLoading || isFetching ? (
          Array.from({ length: 8 }).map((_, idx) => <ClubItemSkeleton key={idx} />)
        ) : clubData && clubData.length > 0 && (
          clubData
            .filter((item: ClubResponse) =>
              isCreativeClubPage
                ? item.type === EClub.CREATIVE_CLUB
                : item.type === EClub.SELF_DIRECT_CLUB
            )
            .map((item: ClubResponse) => (
              <Link
                to={`/${item.id}`}
                key={item.id}
                style={{
                  height: "fit-content",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textDecoration: 'none'
                }}
              >
                <ClubItem value={item} />
              </Link>
            ))
        )}
      </S.ClubItemContainer>
      {(clubData && clubData.length === 0) && <S.NoClubMessage>등록된 동아리가 없습니다.</S.NoClubMessage>}
    </S.ClubListContainer>
  );
};

export default ClubList;