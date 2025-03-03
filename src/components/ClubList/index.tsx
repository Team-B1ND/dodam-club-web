import { useEffect, useState } from "react";
import * as S from "./style";
import { DodamModal, DodamSegmentedButton } from "@b1nd/dds-web";
import ClubItem from "./ClubItem";
import { ClubResponse } from "src/types/club/club.type";
import { EClub } from "src/enum/club/club.enum";
import useGetClubs from "src/hooks/club/useGetClubs";
import { Link } from "react-router-dom";

const ClubList = () => {
  const [ isCreativeClubPage, setIsCreativeClubPage ] = useState(true);
  const { clubList, getClubList } = useGetClubs()

  const changePage = () => {
    setIsCreativeClubPage(prev=>!prev)
  }
  
  useEffect(() => {
    getClubList()
  }, [])

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
        {clubList
        .filter((item: ClubResponse) => 
          isCreativeClubPage
          ? item.type === EClub.CREATIVE_CLUB
          : item.type === EClub.SELF_DIRECT_CLUB
        )
        .map((item: ClubResponse) => (
          <Link to={`/${item.id}`} style={{height:'fit-content'}}>
            <ClubItem
              key={item.name}
              value={item}
            />
          </Link>
        ))
        }
      </S.ClubItemContainer>

    </S.ClubListContainer>
  );
};

export default ClubList;
