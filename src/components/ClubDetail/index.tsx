import { useEffect } from 'react'
import * as S from './style'
import { useRecoilValue } from "recoil";
import { themeModeAtom } from "src/store/theme/themeStore";
import { useTheme } from 'styled-components';
import { Link, useParams } from 'react-router-dom'
import useGetClubs from 'src/hooks/club/useGetClubs'
import { EClub, EClubState } from 'src/enum/club/club.enum'
import { ArrowLeft, CheckmarkCircleFilled, Close, DodamColor, DodamFilledButton, ExclamationmarkCircle, XmarkCircle } from '@b1nd/dds-web'
import useGetMember from 'src/hooks/member/useGetMember'
import MDEditor from '@uiw/react-md-editor'
import MemberItem from '@components/MemberItem'
import clubApi from 'src/api/Club/club.api';

interface ClubDetailProps {
  type : "MODAL" | "PAGE";
  modalId? : number;
  close?: () => void;
}

const ClubDetail = ({ type, modalId = 1, close }: ClubDetailProps) => {
  const { id } = useParams()
  const { clubMemberList, clubLeader, getClubLeader, getAllClubMemberList } = useGetMember()
  const { clubInfo, getClub } = useGetClubs()
  const currentTheme = useRecoilValue(themeModeAtom);
  const theme = useTheme()
  
  useEffect(() => {
    if(type == "MODAL"){
      getClubLeader(modalId)
      getAllClubMemberList(modalId)
      getClub(modalId)
    }else{
      getClubLeader(Number(id))
      getAllClubMemberList(Number(id))
      getClub(Number(id))
    }
  }, [])

  return (
    <S.ClubDetailContainer
      $type={type}
      data-color-mode={currentTheme.toLowerCase()}
    >
      {type == 'PAGE'
      ? <Link to={'/'}><ArrowLeft $svgStyle={{cursor:'pointer'}} color={theme.labelNormal}/></Link>
      : <div onClick={close}><Close $svgStyle={{cursor:'pointer'}} color={theme.labelNormal}/></div>}
      <S.ClubDetailHeader>
        <S.ClubDetailHeaderInfo>
          <S.ClubDetailHeaderSubject>
            {clubInfo?.type === EClub.CREATIVE_CLUB
            ? "창체 • "
            : "자율 • "}
            {clubInfo?.subject}
          </S.ClubDetailHeaderSubject>
          <S.ClubDetailHeaderName>
            {clubInfo?.name}
            {clubInfo?.state === EClubState.ALLOWED
            ? <CheckmarkCircleFilled size={28} color={DodamColor.green50}/>
            : clubInfo?.state === EClubState.REJECTED
              ? <XmarkCircle size={28} color={DodamColor.red50}/>
              : <ExclamationmarkCircle size={28} color={DodamColor.yellow50}/>}
          </S.ClubDetailHeaderName>
          <S.ClubDetailHeaderShortDescription>
            {clubInfo?.shortDescription}
          </S.ClubDetailHeaderShortDescription>
        </S.ClubDetailHeaderInfo>
        <S.ClubDetailHeaderLeader>
          {`부장 : `}
          {clubLeader?.grade}
          {clubLeader?.room}
          {clubLeader?.number}
          {clubLeader?.name}
        </S.ClubDetailHeaderLeader>
      </S.ClubDetailHeader>

      <S.ClubDetailMenu>
        <S.ClubDetailMenuInfoAndButton>
          동아리 개설
          <S.ClubDetailMenuButton>
            <DodamFilledButton
              size="Small"
              text='승인 신청하기'
              typography={['Caption1', 'Bold']}
              width={100}
              customStyle={{ color: "#fff", whiteSpace:'nowrap' }}
              enabled={clubMemberList.length === clubMemberList.filter((item) => item.status === EClubState.ALLOWED).length}
            />
            <DodamFilledButton
              size="Small"
              text="취소하기"
              typography={['Caption1', 'Bold']}
              width={100}
              customStyle={{ color: "#fff", whiteSpace:'nowrap' }}
              backgroundColorType='Negative'
              onClick={() => clubApi.deleteClub(modalId)}
            />
          </S.ClubDetailMenuButton>
        </S.ClubDetailMenuInfoAndButton>
      </S.ClubDetailMenu>

      <S.ClubDetailMainContainer>
        <S.ClubDeatilMemberList>
          부원
          {clubMemberList.map((item) => (
            <MemberItem
              value={item}
              type={type==="MODAL" ? "STATUS" : "LIST"}
              key={item.id}
            />
          ))}
        </S.ClubDeatilMemberList>
        <S.ClubDetailDescription>
          설명
          <S.ClubDetailMarkDownViewer>
            <MDEditor.Markdown source={clubInfo?.description} style={{backgroundColor:`${theme.backgroundNormal}`}} />
          </S.ClubDetailMarkDownViewer>
        </S.ClubDetailDescription>
      </S.ClubDetailMainContainer>
    </S.ClubDetailContainer>
  )
}

export default ClubDetail