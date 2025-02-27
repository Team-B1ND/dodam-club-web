import { useEffect } from 'react'
import * as S from './style'
import { useRecoilValue } from "recoil";
import { themeModeAtom } from "src/store/theme/themeStore";
import { useTheme } from 'styled-components';
import { Link, useParams } from 'react-router-dom'
import useGetClubs from 'src/hooks/club/useGetClubs'
import { EClub, EClubState } from 'src/enum/club/club.enum'
import { ArrowLeft, CheckmarkCircleFilled, Close, DodamColor, ExclamationmarkCircle, XmarkCircle } from '@b1nd/dds-web'
import useGetMember from 'src/hooks/member/useGetMember'
import MDEditor from '@uiw/react-md-editor'
import MemberItem from '@components/MemberItem'
import DetailLoading from './DetailLoading';

interface ClubDetailProps {
  type : "MODAL" | "PAGE";
  modalId? : number;
  close?: () => void;
}

const ClubDetail = ({ type, modalId = 1, close }: ClubDetailProps) => {
  const { id } = useParams()
  const { clubMemberList, clubLeader, getClubLeader, getClubMemberList, getAllClubMemberList } = useGetMember()
  const { clubInfo, getClub } = useGetClubs()
  const currentTheme = useRecoilValue(themeModeAtom);
  const theme = useTheme()
  
  useEffect(() => {
    if(type == "MODAL"){
      getClubLeader(modalId)
      getClubMemberList(modalId)
      getClub(modalId)
    }else{
      getClubLeader(Number(id))
      getAllClubMemberList(Number(id))
      getClub(Number(id))
    }
  }, [])

  return clubInfo?.id
  ? (
    <S.ClubDetailContainer
      $type={type}
      data-color-mode={currentTheme.toLowerCase()}
    >
      {type == 'PAGE'
      ? <Link to={'/'}><ArrowLeft $svgStyle={{cursor:'pointer'}} color={theme.labelNormal}/></Link>
      : <div onClick={close}><Close $svgStyle={{cursor:'pointer'}}/></div>}
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
  : (
    <DetailLoading type={type}/>
  )
}

export default ClubDetail