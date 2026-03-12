import { useGetClubJoinRequestsMemberQuery } from 'src/queries/member/member.query'
import MemberItem from '../MemberItem'
import * as S from './style'
import { useEffect } from 'react'
import { DodamFilledButton } from '@b1nd/dds-web'
import { usePostMemberStatusMutation } from 'src/queries/manageClub/manageClub.query'
import { EClubState } from 'src/enum/club/club.enum'
import dayjs from 'dayjs'
import { CLUB_PICK_TIMES } from 'src/constants/clubStatus/clubTimes.constant'

interface ManagerMemberList {
  selectedMember: number
  setSelectedMember: (id: number) => void
  id: number
}
const ManagerMemberList = ({
  id,
  selectedMember,
  setSelectedMember,
}: ManagerMemberList) => {
  const {
    data: clubMember,
    isLoading: clubMemberIsLoading,
    isFetching,
    refetch,
  } = useGetClubJoinRequestsMemberQuery(id ?? 51, { enabled: !id })
  
  const postMemberStatusMutation = usePostMemberStatusMutation()

  const handleMemberSelect = (id: number) => {
    setSelectedMember(selectedMember == id ? 0 : id)
  }

  useEffect(() => {
    if (id) {
      refetch()
    }
  }, [id, refetch])

  useEffect(() => {
    if (postMemberStatusMutation.isSuccess) {
      refetch()
    }
  }, [postMemberStatusMutation.isSuccess, refetch])
  const canManage = new Date().getTime() < new Date(CLUB_PICK_TIMES.startAt).getTime() && new Date().getTime() > new Date(CLUB_PICK_TIMES.endAt).getTime()
  return clubMemberIsLoading || isFetching ? (
    <S.ManagerMemberMain>
      <p>loading...</p>
    </S.ManagerMemberMain>
  ) : (
    <S.ManagerMemberMain>
      {clubMember?.length !== 0 ? (
        <>
          <S.MemberListContainer>
            {clubMember?.map((item, idx) => (
              <MemberItem
                value={item.student}
                key={idx}
                type="PICKER"
                onClick={handleMemberSelect}
                pickerStatus={selectedMember === item.student.studentId}
                isManagerPage={true}
              />
            ))}
          </S.MemberListContainer>
          <S.ManageHandleContainer>
            <S.MemberDescriptionContainer>
              {
                clubMember?.find(
                  (item) => item.student.studentId === selectedMember,
                )?.introduce
              }
            </S.MemberDescriptionContainer>
            <S.ManageButtonBar>
              <p>{canManage || `승인 및 거절은 ${CLUB_PICK_TIMES.startAt.split("T").join(" ")} 이후에 가능합니다.`}</p>
              <DodamFilledButton
                size={"Medium"}
                text="승인"
                width={120}
                enabled={selectedMember !== 0 && canManage}
                onClick={() => {
                  postMemberStatusMutation.mutate({
                    clubId: id,
                    studentId: selectedMember,
                    status: EClubState.ALLOWED,
                  });
                  refetch();
                }}
                textTheme="staticWhite"
              />
              <DodamFilledButton
                size={"Medium"}
                text="거절"
                width={120}
                backgroundColorType="Negative"
                enabled={selectedMember !== 0 && canManage}
                onClick={() => {
                  postMemberStatusMutation.mutate({
                    clubId: id,
                    studentId: selectedMember,
                    status: EClubState.DELETED,
                  });
                  refetch();
                }}
              />
            </S.ManageButtonBar>
          </S.ManageHandleContainer>
        </>
      ) : (
        <p>승인이 필요한 멤버가 없습니다.</p>
      )}
    </S.ManagerMemberMain>
  );
}

export default ManagerMemberList
