import React, { useEffect, useRef, useState } from 'react';
import * as S from './style';
import { Close, DodamFilledButton, DodamFilledTextField } from '@b1nd/dds-web';
import { useForm } from 'react-hook-form';
import { EClub } from 'src/enum/club/club.enum';
import { Club } from 'src/types/club/club.type';
import MDEditor from '@uiw/react-md-editor';
import { useRecoilValue } from "recoil";
import { themeModeAtom } from "src/store/theme/themeStore";
import { useImageUpload } from 'src/hooks/image/useImageUpload';
import imagePreviewAlt from 'src/assets/imagePreviewAlt.png';
import MemberItem from '@components/MemberItem';
import { Link } from 'react-router-dom';
import useClubForm from 'src/hooks/club/useClubForm';
import { useTheme } from 'styled-components';
import { B1ndToast } from '@b1nd/b1nd-toastify';
import { useCreateClubMutation } from 'src/queries/createClub/createClub.query';
import { useGetMyClubApplyQuery } from 'src/queries/useClub';
import { useGetAllMemberQuery } from 'src/queries/member/member.query';
import CreateClubSkeleton from '@components/Common/CreateClubSkeleton';

const CreateClubPage = () => {
  const theme = useTheme();
  const currentTheme = useRecoilValue(themeModeAtom);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const { previewUrl, handleImageChange } = useImageUpload();
  
  const [ searchData, setSearchData ] = useState<string>('');
  const [ isSelf, setIsSelf ] = useState<boolean>(true);
  
  const { data:clubApplyData, isLoading:applyDataIsLoading } = useGetMyClubApplyQuery();
  const { data:allMember, isLoading:allMemberLoading } = useGetAllMemberQuery({
    isSelf: isSelf
  });

  const createClubMutation = useCreateClubMutation();

  // form 관리
  const methods = useForm<Club>({
    defaultValues: {
      name: "",
      image: "",
      subject: "",
      shortDescription: "",
      description: "",
      type: EClub.SELF_DIRECT_CLUB,
      studentIds: []
    }
  });

  const {
    handleSubmit,
    formState: { isValid, isSubmitting },
    watch,
    setValue,
    getValues,
    setError,
    clearErrors
  } = methods;

  const { fields, fieldStates, handlers } = useClubForm({
    control: methods.control,
    setValue,
    watch,
    getValues,
    setError,
    clearErrors
  });

  const typeWatch = watch("type")

  useEffect(() => {
    setIsSelf((prev) => !prev)
  }, [typeWatch])

  useEffect(() => {
    handlers.updateImage(previewUrl);
  }, [previewUrl]);

  return (
    <S.CreateClubPaddingContainer>
      <S.CreateClubContainer
        data-color-mode={currentTheme.toLowerCase()}
      >
        <Link to={'/'} style={{display:'flex', width:'24px'}}><Close $svgStyle={{cursor:'pointer'}} color={theme.labelNormal}/></Link>
        <S.CreateClubHeader>동아리 개설</S.CreateClubHeader>
        {(applyDataIsLoading || allMemberLoading)
        ? <CreateClubSkeleton/>
        : (
          <S.CreateClubForm
            onSubmit={handleSubmit(
              (data) => {
                createClubMutation.mutate(data);
              },
              () => {
                B1ndToast.showError('동아리 생성에 실패하였습니다!')
              }
            )}
          >
            <DodamFilledTextField
              label='동아리명'
              placeholder='개설할 동아리 이름을 입력해주세요.'
              type='text'
              isError={fieldStates.nameState.error ? true : false}
              supportingText={
                fieldStates.nameState.error
                ? fieldStates.nameState.error.message
                : "9자 이하, 특수문자 & 숫자 가능"
              }
              value={fields.name.value}
              onChange={fields.name.onChange}
            />

            <S.CreateClubCustomInputContainer
              $isError={fieldStates.typeState.error === undefined}
            >
              동아리 유형
              <S.CreateClubTypeSelect
                value={fields.type.value}
                onChange={fields.type.onChange}
                onBlur={fields.type.onBlur}
                name={fields.type.name}
                $isError={fieldStates.typeState.error === undefined}
              >
                <option value={EClub.SELF_DIRECT_CLUB}>자율 동아리</option>
                {clubApplyData!.filter((item) => item.type === EClub.CREATIVE_CLUB).length === 1 || <option value={EClub.CREATIVE_CLUB}>창체 동아리</option>}
              </S.CreateClubTypeSelect>
              {fieldStates.typeState.error
              ? fieldStates.typeState.error.message
              : "동아리 유형에 따라 필요한 인원 수가 달라집니다."}
            </S.CreateClubCustomInputContainer>

            <DodamFilledTextField
              label='동아리 주제'
              placeholder='개설할 동아리의 주제를 입력해주세요.'
              type='text'
              isError={fieldStates.subjectState.error ? true : false}
              supportingText={
                fieldStates.subjectState.error
                ? fieldStates.subjectState.error.message
                : '4자 이하, ex) 전공, 게임, 체스'
              }
              value={fields.subject.value}
              onChange={fields.subject.onChange}
            />

            <DodamFilledTextField
              label='간략한 소개'
              placeholder='동아리를 간략하게 소개해주세요. 목록에 표시됩니다.'
              type='text'
              isError={fieldStates.shortDescriptionState.error ? true : false}
              supportingText={
                fieldStates.shortDescriptionState.error
                ? fieldStates.shortDescriptionState.error.message
                : '14자 이하'
              }
              value={fields.shortDescription.value}
              onChange={fields.shortDescription.onChange}
            />

            <S.CreateClubCustomInputDivider>
              <S.CreateClubCustomInputContainer
                $isError={fieldStates.imageState.error === undefined}
              >
                대표 사진
                <S.CreateClubCustomInput
                  onClick={() => inputRef.current?.click()}
                  style={{cursor:'pointer'}}
                  $isError={fieldStates.imageState.error === undefined}
                >
                  <input 
                    ref={inputRef}
                    type='file'
                    accept='image/*'
                    onChange={(e) => {
                      const files = e.target.files;
                      if (files && files.length > 0) {
                        fields.image.onChange(files[0]);
                        handleImageChange(files[0]);
                      }
                    }}
                    style={{ display:'none' }}
                  />
                </S.CreateClubCustomInput>
                {fieldStates.imageState.error
                ? fieldStates.imageState.error.message
                : "대표 사진 ( 로고 등 ) 을 첨부해주세요. 동아리 목록에 표시됩니다. 1:1 비율을 사용하세요."}
              </S.CreateClubCustomInputContainer>
              <S.PreviewClubImage src={previewUrl || imagePreviewAlt}/>
            </S.CreateClubCustomInputDivider>

            <S.CreateClubCustomInputContainer
              $isError={fieldStates.descriptionState.error === undefined}
            >
              설명
              <MDEditor
                height={500}
                style={{
                  width:'100%',
                  background:theme.backgroundNormal
                }}
                visibleDragbar={false}
                value={fields.description.value}
                onChange={fields.description.onChange}
                onBlur={fields.description.onBlur}
              />
              {fieldStates.descriptionState.error
              ? fieldStates.descriptionState.error.message
              : "후에 지원자와 선생님이 보게 될 동아리의 설명 / 홍보글을 작성해주세요. 마크다운 문법을 사용 가능합니다."}
            </S.CreateClubCustomInputContainer>

            <S.CreateClubCustomInputContainer
              $isError={fieldStates.studentIdsState.error === undefined}
            >
              부원 선택
              <S.CreateClubMemberContainer
                $isError={fieldStates.studentIdsState.error === undefined}
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
                    {allMember!
                    .filter((item) => fields.studentIds.value.indexOf(item.id) === -1)
                    .filter((item) => item.name.includes(searchData))
                    .map((item) => (
                      <MemberItem
                        value={item}
                        type='PICKER'
                        pickerStatus={false} 
                        key={item.id}
                        onClick={() => handlers.handleMemberSelect(item.id)}
                      />
                    ))}
                  </S.CreateClubMemberList>
                </S.CreateClubMemberSearch>
                <S.CreateClubMemberSelected>
                  {allMember!
                  .filter((item) => fields.studentIds.value.indexOf(item.id) !== -1)
                  .map((item) => (
                    <MemberItem
                      value={item}
                      type='PICKER'
                      pickerStatus={true} 
                      key={item.id}
                      onClick={() => handlers.handleMemberSelect(item.id)}
                    />
                  ))}
                </S.CreateClubMemberSelected>
              </S.CreateClubMemberContainer>
              {fieldStates.studentIdsState.error
              ? fieldStates.studentIdsState.error.message
              : `창체는 자신을 포함해 최소 5명, 최대 18명 선택 가능합니다. 자율은 자신을 포함해 최소 10명을 선택해야 합니다.
              모든 선택된 부원이 수락해야 선생님께 승인 신청을 올릴 수 있습니다.`}
            </S.CreateClubCustomInputContainer>

            <S.CreateClubSubmit
              type='submit'
              onClick={() => handlers.validateStudentIds(isSubmitting)}
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
        )}
      </S.CreateClubContainer>
    </S.CreateClubPaddingContainer>
  )
}

export default CreateClubPage;