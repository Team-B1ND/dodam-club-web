import { useEffect, useRef, useState } from 'react'
import * as S from './style'
import { Close, DodamFilledButton, DodamFilledTextField } from '@b1nd/dds-web'
import { useForm } from 'react-hook-form'
import { EClub, EClubState } from 'src/enum/club/club.enum'
import { Club } from 'src/types/club/club.type'
import MDEditor from '@uiw/react-md-editor'
import { useRecoilValue } from 'recoil'
import { themeModeAtom } from 'src/store/theme/themeStore'
import { useImageUpload } from 'src/hooks/image/useImageUpload'
import imagePreviewAlt from 'src/assets/imagePreviewAlt.png'
import MemberItem from 'src/components/MemberItem'
import { useNavigate, useParams } from 'react-router-dom'
import useClubForm from 'src/hooks/club/useClubForm'
import { useTheme } from 'styled-components'
import { B1ndToast } from '@b1nd/b1nd-toastify'
import {
  useCreateClubMutation,
  usePatchClubMutation,
} from 'src/queries/manageClub/manageClub.query'
import {
  useGetClubDetailQuery,
  useGetMyClubApplyQuery,
} from 'src/queries/useClub'
import { useGetAllMemberQuery } from 'src/queries/member/member.query'
import CreateClubSkeleton from 'src/components/Common/CreateClubSkeleton'

const ManageClubPage = () => {
  const navigate = useNavigate()
  const theme = useTheme()
  const currentTheme = useRecoilValue(themeModeAtom)
  const { clubId } = useParams()

  const inputRef = useRef<HTMLInputElement>(null)
  const { previewUrl, setPreviewUrl, handleImageChange } = useImageUpload()

  const [searchData, setSearchData] = useState<string>('')
  const [isSelf, setIsSelf] = useState<boolean>(true)

  const { data: clubApplyData, isLoading: applyDataIsLoading } =
    useGetMyClubApplyQuery()
  const { data: allMember, isLoading: allMemberLoading } = useGetAllMemberQuery(
    {
      isSelf: isSelf,
    }
  )
  const { data: clubDatail, isLoading: clubDatailIsLoading } =
    useGetClubDetailQuery(+clubId!, { enabled: !!clubId })

  const createClubMutation = useCreateClubMutation()
  const patchClubMutation = usePatchClubMutation()

  // form 관리
  const methods = useForm<Club>({
    defaultValues: {
      name: '',
      image: '',
      subject: '전공',
      shortDescription: '',
      description: '',
      type: EClub.CREATIVE_CLUB,
      studentIds: [],
    },
  })

  const {
    handleSubmit,
    formState: { isValid },
    watch,
    setValue,
    getValues,
    setError,
    clearErrors,
    reset,
  } = methods

  const { fields, fieldStates, handlers } = useClubForm({
    control: methods.control,
    setValue,
    watch,
    getValues,
    setError,
    clearErrors,
  })

  const idWatch = watch('studentIds')

  useEffect(() => {
    if (clubDatail && previewUrl == '') {
      setPreviewUrl(clubDatail?.image)
    } else {
      handlers.updateImage(previewUrl)
    }
  }, [previewUrl, clubDatail])

  useEffect(() => {
    reset(clubDatail)
  }, [clubDatail, reset])

  useEffect(() => {
    clearErrors('studentIds')
  }, [idWatch])

  // 필터링된 멤버 리스트
  const filteredMembers = allMember?.filter((item) => item.grade === 2)

  useEffect(() => {
    console.log(isValid)
    console.log(`${fields.description.value} ${fields.name.value} ${fields.shortDescription.value}`)
  }, [fields])

  const onSubmit = (data: Club) => {
    if (clubDatail) {
      const { studentIds, state, ...patchData } = data;
      patchClubMutation.mutate({
        data: patchData,
        id: clubDatail.id,
      });
    } else {
      createClubMutation.mutate(data);
    }
  }

  return (
    <S.CreateClubPaddingContainer>
      <S.CreateClubContainer data-color-mode={currentTheme.toLowerCase()}>
        <div
          onClick={() => navigate("/")}
          style={{ display: "flex", width: "24px" }}
        >
          <Close $svgStyle={{ cursor: "pointer" }} color={theme.labelNormal} />
        </div>
        <S.CreateClubHeader>
          {!clubId ? "동아리 개설" : "동아리 정보 수정"}
        </S.CreateClubHeader>
        {applyDataIsLoading || allMemberLoading || clubDatailIsLoading ? (
          <CreateClubSkeleton />
        ) : (
          <S.CreateClubForm
            onSubmit={handleSubmit(onSubmit, () => B1ndToast.showError("동아리 생성에 실패하였습니다!"))}
          >
            <DodamFilledTextField
              label="동아리명"
              placeholder={!clubId ? "개설할 동아리 이름을 입력해주세요." : ""}
              isDisabled={
                !clubId || clubDatail?.state !== EClubState.ALLOWED
                  ? false
                  : true
              }
              type="text"
              isError={fieldStates.nameState.error ? true : false}
              supportingText={
                fieldStates.nameState.error
                  ? fieldStates.nameState.error.message
                  : "9자 이하, 특수문자 & 숫자 가능"
              }
              value={fields.name.value}
              onChange={fields.name.onChange}
              onRemoveClick={() => setValue("name", "")}
            />

            <DodamFilledTextField
              label="간략한 소개"
              placeholder="동아리를 간략하게 소개해주세요. 목록에 표시됩니다."
              type="text"
              isError={fieldStates.shortDescriptionState.error ? true : false}
              supportingText={
                fieldStates.shortDescriptionState.error
                  ? fieldStates.shortDescriptionState.error.message
                  : "14자 이하"
              }
              value={fields.shortDescription.value}
              onChange={fields.shortDescription.onChange}
              onRemoveClick={() => setValue("shortDescription", "")}
            />

            <S.CreateClubCustomInputDivider>
              <S.CreateClubCustomInputContainer
                $isError={fieldStates.imageState.error !== undefined}
                $isDisabled={false}
              >
                대표 사진
                <S.CreateClubCustomInput
                  onClick={() => inputRef.current?.click()}
                  style={{ cursor: "pointer" }}
                  $isError={fieldStates.imageState.error === undefined}
                >
                  <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const files = e.target.files;
                      if (files && files.length > 0) {
                        fields.image.onChange(files[0]);
                        handleImageChange(files[0]);
                      }
                    }}
                    style={{ display: "none" }}
                  />
                </S.CreateClubCustomInput>
                {fieldStates.imageState.error
                  ? fieldStates.imageState.error.message
                  : "대표 사진 ( 로고 등 ) 을 첨부해주세요. 동아리 목록에 표시됩니다. 1:1 비율을 사용하세요."}
              </S.CreateClubCustomInputContainer>
              <S.PreviewClubImage src={previewUrl || imagePreviewAlt} />
            </S.CreateClubCustomInputDivider>

            <S.CreateClubCustomInputContainer
              $isError={fieldStates.descriptionState.error !== undefined}
              $isDisabled={!clubId}
            >
              동아리 소개 & 활동 내용 & 기대 효과
              <MDEditor
                height={500}
                style={{
                  width: "100%",
                }}
                visibleDragbar={false}
                value={fields.description.value}
                onChange={fields.description.onChange}
                onBlur={fields.description.onBlur}
              />
              {fieldStates.descriptionState.error
                ? fieldStates.descriptionState.error.message
                : "동아리의 소개와 활동 내용, 기대 효과를 작성해주세요. 마크다운 문법을 사용 가능합니다."}
            </S.CreateClubCustomInputContainer>

            {!clubId && (
              <S.CreateClubCustomInputContainer
                $isError={fieldStates.studentIdsState.error !== undefined}
                $isDisabled={!!clubId}
              >
                부원 선택
                <S.CreateClubMemberContainer
                  $isError={fieldStates.studentIdsState.error === undefined}
                >
                  <S.CreateClubMemberSearch>
                    <DodamFilledTextField
                      type="text"
                      label=""
                      value={searchData}
                      onChange={(e) => setSearchData(e.target.value)}
                      onRemoveClick={() => setSearchData("")}
                      placeholder="이름으로 검색"
                    />
                    <S.CreateClubMemberList>
                      {filteredMembers!
                        .filter(
                          (item) =>
                            fields.studentIds.value.indexOf(item.id) === -1,
                        )
                        .filter((item) => item.name.includes(searchData))
                        .sort((a, b) => a.grade - b.grade || a.room - b.room)
                        .map((item) => (
                          <MemberItem
                            value={item}
                            type="PICKER"
                            pickerStatus={false}
                            key={item.id}
                            onClick={() => handlers.handleMemberSelect(item.id)}
                          />
                        ))}
                    </S.CreateClubMemberList>
                  </S.CreateClubMemberSearch>
                  <S.CreateClubMemberSelected>
                    {allMember!
                      .filter(
                        (item) =>
                          fields.studentIds.value.indexOf(item.id) !== -1,
                      )
                      .map((item) => (
                        <MemberItem
                          value={item}
                          type="PICKER"
                          pickerStatus={true}
                          key={item.id}
                          onClick={() => handlers.handleMemberSelect(item.id)}
                        />
                      ))}
                  </S.CreateClubMemberSelected>
                </S.CreateClubMemberContainer>
                {fieldStates.studentIdsState.error
                  ? fieldStates.studentIdsState.error.message
                  : `창체는 자신을 포함해 최대 9명 선택 가능합니다.
                모든 선택된 부원이 수락해야 선생님께 승인 신청을 올릴 수 있습니다.`}
              </S.CreateClubCustomInputContainer>
            )}

            <S.CreateClubSubmit type="submit">
              <DodamFilledButton
                size="Medium"
                text={!clubId ? "개설 완료하기" : "수정 완료하기"}
                width={144}
                textTheme="staticWhite"
                typography={["Body1", "Bold"]}
                enabled={isValid && fields.studentIds.value.length !== 0}
              />
            </S.CreateClubSubmit>
          </S.CreateClubForm>
        )}
      </S.CreateClubContainer>
    </S.CreateClubPaddingContainer>
  );
}

export default ManageClubPage
