import React, { Suspense, useState } from 'react'
import * as S from './style'
import { DodamSegmentedButton } from '@b1nd/dds-web'
import ClubList from '../ClubList';
import ClubItemSkeleton from '../Common/ClubItemSkeleton';

const ClubListContainer = () => {
  const [ isCreativeClubPage, setIsCreativeClubPage ] = useState(true);
  const changePage = () => setIsCreativeClubPage((prev)=>!prev)

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
        <Suspense fallback={Array.from({length: 8}).map((_, idx) => <ClubItemSkeleton key={idx}/>)}>
          <ClubList isCreativeClubPage={isCreativeClubPage}/>
        </Suspense>
      </S.ClubItemContainer>

    </S.ClubListContainer>
  )
}

export default ClubListContainer