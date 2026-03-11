import { Suspense, useState } from "react"
import * as S from "./style"
import ApplyClubList from "src/components/ApplyClubList"
import clubApi from "src/api/Club/club.api";
import ApplyClubDialog from "src/components/ApplyClubDialog";
import { useNavigate } from "react-router-dom";
import { B1ndToast } from "@b1nd/b1nd-toastify";
import { AxiosError } from "axios";
import { ClubErrorResponse } from "src/types/response/response.type";
import { useQueryClient } from "react-query";
import { QUERY_KEYS } from "src/queries/queryKey";

const ApplyPage = () => {
  const [selectedClubId, setSelectedClubId] = useState<number>(0);
  const [selectedClubName, setSelectedClubName] = useState("");
  const [introduce, setIntroduce] = useState("");
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  const nav = useNavigate();
  const queryClient = useQueryClient();

  const submitApply = (id: number) => {
    clubApi.postApplyClub({
      clubId: id, 
      introduction: introduce
    })
    .then(() => {
      queryClient.invalidateQueries(QUERY_KEYS.clubs.getStudentApply, { refetchInactive: true })
      nav("/")
    })
    .catch((e: AxiosError<ClubErrorResponse>) => B1ndToast.showError(`신청에 실패했습니다! ${e.response?.data.message}`))
    .finally(() => setDialogIsOpen(false));
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