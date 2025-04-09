import { Suspense, useState } from 'react'
import * as S from './style'
import { DodamErrorBoundary, DodamSegmentedButton } from '@b1nd/dds-web'
import ClubList from '../ClubList';
import ClubItemSkeleton from '../Common/Skeleton/ClubItemSkeleton';

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
      <DodamErrorBoundary text="데이터를 불러오는 중 오류가 발생했습니다." showButton={true} >
        <S.ClubItemContainer>
            <Suspense fallback={<ClubItemSkeleton count={8}/>}>
              <ClubList isCreativeClubPage={isCreativeClubPage}/>
            </Suspense>
        </S.ClubItemContainer>
      </DodamErrorBoundary>

    </S.ClubListContainer>
  )
}

export default ClubListContainer