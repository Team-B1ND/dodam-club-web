import { useEffect, useState } from "react";
import * as S from "./style";
import { DodamModal, DodamSegmentedButton } from "@b1nd/dds-web";
import ClubItem from "./ClubItem";
import { ClubResponse } from "src/types/club/club.type";
import { EClub } from "src/enum/club/club.enum";
import useGetClubs from "src/hooks/club/useGetClubs";
import { Link } from "react-router-dom";
import ClubDetail from "@components/ClubDetail";

const ClubList = () => {
  const [ isCreativeClubPage, setIsCreativeClubPage ] = useState(true);
  const { clubList, getClubList } = useGetClubs()
  const [ isOpen, setIsopen ] = useState(false)

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
          <Link to={`/${item.id}`}>
          {/* 주석은 모달 테스트용입니다 모달 추가시 이전될 예정.. */}
          {/* <div onClick={() => setIsopen((prev)=>!prev)} style={{display:'flex'}}> */}
            <ClubItem
              key={item.name}
              value={item}
            />
            {/* <DodamModal
              isOpen={isOpen}
              close={() => setIsopen((prev) => !prev)}
              background={true}>

              <ClubDetail
                key={item.id}
                type="MODAL"
                modalId={item.id}
                close={() => setIsopen((prev) => !prev)}
              />
              </DodamModal> */}
          {/* </div> */}
          </Link>
        ))}
      </S.ClubItemContainer>

    </S.ClubListContainer>
  );
};

export default ClubList;
