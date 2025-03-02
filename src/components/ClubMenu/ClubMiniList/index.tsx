import { useCallback, useState } from 'react'
import * as S from './style'
import { ClubMenuProps } from 'src/types/club/club.type'
import { CheckmarkCircleFilled, Dialog, DodamColor, DodamModal, XmarkCircle } from '@b1nd/dds-web'
import ClubApi from 'src/api/Club/club.api'
import { Link } from 'react-router-dom'

const ClubMiniList = ({ name, value, type } : ClubMenuProps ) => {
  const [ isOpen, setIsopen ] = useState({
    REQUEST_ACCEPT: false,
    REQUEST_REJECT: false,
    CLUB: false,
  })
  const [ requestModal, setRequestModal ] = useState("ACCEPT")

  const requestHandle = useCallback((type: "ACCEPT" | "REJECT") => {
    setRequestModal(type)
    if(type==="ACCEPT"){
      setIsopen((prev) => ({...prev, REQUEST_ACCEPT : !prev.REQUEST_ACCEPT}))
    }else{
      setIsopen((prev) => ({...prev, REQUEST_REJECT : !prev.REQUEST_REJECT}))  
    }
  }, [])

  return value.length > 0 && (
    <S.ClubListContainer>
      {name}
      {value.map((item) => (
        <S.ClubMiniItem>
          <Link to={`/club/${item.club.id}`}>
            <S.ClubMiniItemName>{item.club.name}</S.ClubMiniItemName>
          </Link>
          {type === "Request"
          && (
            <S.ClubMiniItemRequestContainer>
              <div onClick={() => requestHandle("ACCEPT")} style={{ cursor:'pointer' }}>
                <CheckmarkCircleFilled color={DodamColor.blue50}/>
              </div>
              <div onClick={() => requestHandle("REJECT")} style={{ cursor:'pointer' }}>
                <XmarkCircle color={DodamColor.red50}/>
              </div>
              <DodamModal
                isOpen={
                  requestModal === "ACCEPT"
                  ? isOpen.REQUEST_ACCEPT
                  : isOpen.REQUEST_REJECT
                }
                background={true}
              >
                <Dialog
                  title={`정말 ${item.club.name}의 입부 신청을 ${requestModal === "ACCEPT" ? '수락' : '거절'}하시겠습니까?`}
                  text="이 선택은 되돌릴 수 없습니다. 신중히 선택해주세요."
                  type={{
                    dialog: "CONFIRM",
                    confirm: {
                      content: (requestModal === "ACCEPT"? '수락' : '거절'),
                      onClick: () => (
                        requestModal === "ACCEPT" 
                        ? ClubApi.postJoinClubByRequest(item.id)
                        : ClubApi.deleteJoinClubByRequest(item.id)
                      )
                    },
                    dismiss: {
                      content: "취소",
                      onClick: () => setIsopen((prev) => ({...prev, REQUEST_ACCEPT : !prev.REQUEST_ACCEPT}))
                    }
                  }}
                />
              </DodamModal>
            </S.ClubMiniItemRequestContainer>
          )}
        </S.ClubMiniItem>
      ))}
    </S.ClubListContainer>
  )
}

export default ClubMiniList