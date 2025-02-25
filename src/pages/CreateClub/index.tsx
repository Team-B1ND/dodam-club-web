import React, { useEffect, useRef, useState } from 'react'
import * as S from './style'
import { DodamFilledButton, DodamFilledTextField } from '@b1nd/dds-web'
import { useForm, Controller } from 'react-hook-form'
import { EClub } from 'src/enum/club/club.enum'
import { Club } from 'src/types/club/club.type'
import MDEditor from '@uiw/react-md-editor'
import { useRecoilValue } from "recoil";
import { themeModeAtom } from "src/store/theme/themeStore";
import { useImageUpload } from 'src/hooks/image/useImageUpload'
import imagePreviewAlt from 'src/assets/imagePreviewAlt.png'
import clubApi from 'src/api/Club/club.api'
import { userDummy } from 'src/constants/dummy/dummy'
import MemberItem from '@components/MemberItem'
import useGetMember from 'src/hooks/member/useGetMember'

const CreateClubPage = () => {
  const currentTheme = useRecoilValue(themeModeAtom);
  const inputRef = useRef<HTMLInputElement>(null);
  const { previewUrl, handleImageChange } = useImageUpload();
  const { memberList } = useGetMember({ type:'SEARCH' })
  const [ searchData, setSearchData ] = useState<string>('')

  const {
    handleSubmit,
    formState: { isValid, errors, isSubmitting },
    control,
    watch,
    setValue,
    getValues,
    setError,
    clearErrors
  } = useForm<Club>({
    defaultValues: {
      name: "",
      image: "",
      subject: "",
      shortDescription: "",
      description: "",
      type: EClub.CREATIVE_CLUB,
      studentIds: []
    }
  })

  // 부원 선택 로직
  const studentIds = watch('studentIds')

  const handleMemberSelect = (studentId: number) => {
    if(studentIds.indexOf(studentId) === -1){
      setValue('studentIds', [...studentIds, studentId])
    }else{
      setValue('studentIds', [...studentIds].filter((item) => item != studentId))
    }
  }

  useEffect(() => {
    if(isSubmitting === true){
      if(getValues('type') === EClub.CREATIVE_CLUB){
        if(studentIds.length < 4 || studentIds.length > 17){
          setError('studentIds', { type:'creativeClub', message:'창체동아리는 5명 이상, 18명 이하의 인원으로만 개설 가능합니다. ( 자신 포함 )' })
        }else{
          clearErrors('studentIds')
        }
      }else if(getValues('type') === EClub.SELF_DIRECT_CLUB){
        if(studentIds.length < 9 ){
          setError('studentIds', { type:'selfDirectClub', message:'자율동아리는 10명 이상의 인원이 개설 가능합니다. ( 자신 포함 )' })
        }else{
          clearErrors('studentIds')
        }
      }
    }
  }, [isSubmitting])

  useEffect(() => {
    if(previewUrl !== ''){
      setValue('image', previewUrl)
    }
  }, [previewUrl])

  return (
    <S.CreateClubContainer
      data-color-mode={currentTheme.toLowerCase()}
    >
      동아리 개설
      <S.CreateClubForm
        onSubmit={handleSubmit(data => clubApi.postClub(data))}
      >
        <Controller
          name="name"
          control={control}
          rules={{  
            required: {
              value: true,
              message: "동아리 명은 필수 입력입니다."
            },
            maxLength: { 
              value: 9,
              message: "9자리 이하만 가능합니다."
            }
          }}
          render={({ field, fieldState }) => (
            <DodamFilledTextField
              label='동아리명'
              placeholder='개설할 동아리 이름을 입력해주세요.'
              type='text'
              isError={ fieldState.error && true }
              supportingText={
                fieldState.error
                ? fieldState.error.message
                : "9자 이하, 특수문자 & 숫자 가능"
              }
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />

        <Controller
          name="type"
          control={control}
          rules={{
            required: {
              value: true,
              message: "동아리 유형 선택은 필수입니다."
            }
          }}
          render={({ field, fieldState }) => (
            <S.CreateClubCustomInputContainer
              $isError={fieldState.error === undefined}
            >
              동아리 유형
              <S.CreateClubTypeSelect
                value={field.value}
                onChange={field.onChange}
                $isError={fieldState.error === undefined}
              >
                <option value={EClub.CREATIVE_CLUB}>창체 동아리</option>
                <option value={EClub.SELF_DIRECT_CLUB}>자율 동아리</option>
              </S.CreateClubTypeSelect>
              {fieldState.error
              ? fieldState.error.message
              : "동아리 유형에 따라 필요한 인원 수가 달라집니다."}
            </S.CreateClubCustomInputContainer>
          )}
        />

        <Controller
          name="subject"
          control={control}
          rules={{
            required: {
              value: true,
              message: "주제는 필수 입력입니다."
            },
            maxLength: { 
              value: 4,
              message: "4자리 이하만 가능합니다."
            }
          }}
          render={({ field, fieldState }) => (
            <DodamFilledTextField
              label='동아리 주제'
              placeholder='개설할 동아리의 주제를 입력해주세요.'
              type='text'
              isError={ fieldState.error && true }
              supportingText={
                fieldState.error
                ? fieldState.error.message
                : '4자 이하, ex) 전공, 게임, 체스'
              }
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />

        <Controller
          name="shortDescription"
          control={control}
          rules={{
            required: {
              value: true,
              message: "간략 소개는 필수 입력입니다."
            },
            maxLength: { 
              value: 14,
              message: "14자리 이하만 가능합니다."
            }
          }}
          render={({ field, fieldState }) => (
            <DodamFilledTextField
              label='간략한 소개'
              placeholder='동아리를 간략하게 소개해주세요. 목록에 표시됩니다.'
              type='text'
              isError={ fieldState.error && true }
              supportingText={
                fieldState.error
                ? fieldState.error.message
                : '14자 이하'
              }
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />

        <Controller
          name="image"
          control={control}
          rules={{
            required: {
              value: true,
              message: "동아리 대표 사진은 필수입니다."
            },
          }}
          render={({ field : { onChange }, fieldState }) => (
            <S.CreateClubCustomInputDivider>
              <S.CreateClubCustomInputContainer
                $isError={fieldState.error === undefined}
              >
                대표 사진
                <S.CreateClubCustomInput
                  onClick={() => inputRef.current?.click()}
                  style={{cursor:'pointer'}}
                  $isError={fieldState.error === undefined}
                >
                  <input 
                    ref={inputRef}
                    type='file'
                    accept='image/*'
                    onChange={(e) => {
                      onChange(e.target.files?.[0]);
                      handleImageChange(e.target.files?.[0] || null);
                    }}
                    style={{ display:'none' }}
                  />
                </S.CreateClubCustomInput>
                {fieldState.error
                ? fieldState.error.message
                : "대표 사진 ( 로고 등 ) 을 첨부해주세요. 동아리 목록에 표시됩니다. 1:1 비율을 사용하세요."}
              </S.CreateClubCustomInputContainer>
              <S.PreviewClubImage src={previewUrl || imagePreviewAlt}/>
            </S.CreateClubCustomInputDivider>
          )}
        />

        <Controller
          name="description"
          control={control}
          rules={{
            required: {
              value: true,
              message: "설명은 필수 입력입니다."
            },
          }}
          render={({ field, fieldState }) => (
            <S.CreateClubCustomInputContainer
              $isError={fieldState.error === undefined}
            >
              설명
              <MDEditor
                height={500}
                style={{ width:'100%' }}
                visibleDragbar={false}
                value={field.value}
                onChange={field.onChange}
              />
              {fieldState.error
              ? fieldState.error.message
              : "후에 지원자와 선생님이 보게 될 동아리의 설명 / 홍보글을 작성해주세요. 마크다운 문법을 사용 가능합니다."}
            </S.CreateClubCustomInputContainer>
          )}
        />

        <S.CreateClubCustomInputContainer
          $isError={errors.studentIds === undefined}
        >
          부원 선택
          <S.CreateClubMemberContainer
            $isError={errors.studentIds === undefined}
          >
            <S.CreateClubMemberSearch>
              <DodamFilledTextField
                type='text'
                label=''
                value={searchData}
                onChange={(e) => setSearchData(e.target.value)}
                placeholder='이름으로 검색'
              />
              <S.CreateClubMemberList>
                {memberList
                .filter((item) => studentIds.indexOf(item.id) === -1)
                .filter((item) => item.name.includes(searchData))
                .map((item) => (
                  <MemberItem
                    value={item}
                    type='PICKER'
                    pickerStatus={false} 
                    key={item.id}
                    onClick={() => handleMemberSelect(item.id)}
                  />
                ))}
              </S.CreateClubMemberList>
            </S.CreateClubMemberSearch>
            <S.CreateClubMemberSelected>
              {memberList
              .filter((item) => studentIds.indexOf(item.id) !== -1)
              .map((item) => (
                <MemberItem
                  value={item}
                  type='PICKER'
                  pickerStatus={true} 
                  key={item.id}
                  onClick={() => handleMemberSelect(item.id)}
                />
              ))}
            </S.CreateClubMemberSelected>
          </S.CreateClubMemberContainer>
          {errors.studentIds
          ? errors.studentIds.message
          : `창체는 자신을 포함해 최소 5명, 최대 18명 선택 가능합니다. 자율은 자신을 포함해 최소 10명을 선택해야 합니다.
          모든 선택된 부원이 수락해야 선생님께 승인 신청을 올릴 수 있습니다.`}
        </S.CreateClubCustomInputContainer>

        <S.CreateClubSubmit
          type='submit'
        >
          <DodamFilledButton
            size="Medium"
            text="개설 완료하기"
            width={144}
            customStyle={{ color: "#fff" }}
            typography={["Body1", "Bold"]}
            enabled={isValid}
          />
        </S.CreateClubSubmit>
      </S.CreateClubForm>
    </S.CreateClubContainer>
  )
}

export default CreateClubPage