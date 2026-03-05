import { Suspense, useState } from "react"
import * as S from "./style"
import ApplyClubList from "src/components/ApplyClubList"
import clubApi from "src/api/Club/club.api";
import ApplyClubDialog from "src/components/ApplyClubDialog";

const ApplyPage = () => {
  const [selectedClubId, setSelectedClubId] = useState<number>(0);
  const [selectedClubName, setSelectedClubName] = useState("");
  const [introduce, setIntroduce] = useState("");

  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  
  const submitApply = (id: number) => {
    clubApi.postApplyClub({clubId: id, introduction: introduce}).catch((e) => console.log(e))
  }

  return (
    <S.Container>
      동아리 신청
      <S.Section>
        <S.ClubListContainer>
          동아리 선택
          <Suspense fallback={<div>Loading...</div>}>
            <ApplyClubList 
              selectedClubId={selectedClubId} 
              onClick={(id, name) => { 
                setSelectedClubId(id); 
                setSelectedClubName(name); 
              }}
            />
          </Suspense>
        </S.ClubListContainer>
        <S.IntroductionContainer>
          자기소개서 작성
          <S.IntroductionTextarea value={introduce} onChange={(e) => setIntroduce(e.target.value)}/>
        </S.IntroductionContainer>
      </S.Section>
      <S.ButtonWrapper>
        <S.SubmitButton 
          size="Large" 
          text="동아리 입부 신청하기" 
          width={280}
          textTheme="staticWhite"
          onClick={() => setDialogIsOpen(true)}
          enabled={selectedClubId !== 0 && introduce.trim().length > 0}
        />
      </S.ButtonWrapper>
      <ApplyClubDialog 
        name={selectedClubName} 
        onSubmit={() => submitApply(selectedClubId)}
        isOpen={dialogIsOpen} 
        close={() => setDialogIsOpen(false)}
      />
    </S.Container>
  )
}

export default ApplyPage