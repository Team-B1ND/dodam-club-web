import { useController, Control, UseFormSetValue, UseFormWatch, UseFormGetValues, UseFormSetError, UseFormClearErrors } from 'react-hook-form';
import { EClub } from 'src/enum/club/club.enum';
import { Club } from 'src/types/club/club.type';

interface UseClubFormProps {
  control: Control<Club>;
  setValue: UseFormSetValue<Club>;
  watch: UseFormWatch<Club>;
  getValues: UseFormGetValues<Club>;
  setError: UseFormSetError<Club>;
  clearErrors: UseFormClearErrors<Club>;
}

export default function useClubForm({
  control,
  setValue,
  watch,
  getValues,
  setError,
  clearErrors,
}: UseClubFormProps) {
  // 동아리 이름 필드
  const { field: name, fieldState: nameState } = useController({
    name: "name",
    control,
    rules: {
      required: {
        value: true,
        message: "동아리 명은 필수 입력입니다."
      },
      maxLength: {
        value: 9,
        message: "9자리 이하만 가능합니다."
      }
    }
  });

  // 동아리 유형 필드
  const { field: type, fieldState: typeState } = useController({
    name: "type",
    control,
    rules: {
      required: {
        value: true,
        message: "동아리 유형 선택은 필수입니다."
      }
    }
  });

  // 동아리 주제 필드
  const { field: subject, fieldState: subjectState } = useController({
    name: "subject",
    control,
    rules: {
      required: {
        value: true,
        message: "주제는 필수 입력입니다."
      },
      maxLength: {
        value: 4,
        message: "4자리 이하만 가능합니다."
      }
    }
  });

  // 간략 소개 필드
  const { field: shortDescription, fieldState: shortDescriptionState } = useController({
    name: "shortDescription",
    control,
    rules: {
      required: {
        value: true,
        message: "간략 소개는 필수 입력입니다."
      },
      maxLength: {
        value: 14,
        message: "14자리 이하만 가능합니다."
      }
    }
  });

  // 이미지 필드
  const { field: image, fieldState: imageState } = useController({
    name: "image",
    control,
    rules: {
      required: {
        value: true,
        message: "동아리 대표 사진은 필수입니다."
      }
    }
  });

  // 설명 필드
  const { field: description, fieldState: descriptionState } = useController({
    name: "description",
    control,
    rules: {
      required: {
        value: true,
        message: "설명은 필수 입력입니다."
      }
    }
  });

  // 부원 선택 필드
  const { field: studentIds, fieldState: studentIdsState } = useController({
    name: "studentIds",
    control
  });

  // 부원 선택 핸들러
  const handleMemberSelect = (studentId: number): void => {
    const currentIds = watch('studentIds');
    if (currentIds.indexOf(studentId) === -1) {
      setValue('studentIds', [...currentIds, studentId]);
    } else {
      setValue('studentIds', [...currentIds].filter((item) => item !== studentId));
    }
  };

  // 유효성 검사 함수
  const validateStudentIds = (isSubmitting: boolean) => {
    if (isSubmitting === true) {
      const currentIds = watch('studentIds');
      const currentType = getValues('type');

      if (currentType === EClub.CREATIVE_CLUB) {
        if (currentIds.length < 4 || currentIds.length > 17) {
          setError('studentIds', { 
            type: 'creativeClub', 
            message: '창체동아리는 5명 이상, 18명 이하의 인원으로만 개설 가능합니다. ( 자신 포함 )' 
          });
        } else {
          clearErrors('studentIds');
        }
      } else if (currentType === EClub.SELF_DIRECT_CLUB) {
        if (currentIds.length < 9) {
          setError('studentIds', { 
            type: 'selfDirectClub', 
            message: '자율동아리는 10명 이상의 인원이 개설 가능합니다. ( 자신 포함 )' 
          });
        } else {
          clearErrors('studentIds');
        }
      }
    }
  };

  // 이미지 업데이트 함수
  const updateImage = (previewUrl: string): void => {
    if (previewUrl !== '') {
      setValue('image', previewUrl);
    }
  };

  return {
    fields: {
      name,
      type,
      subject,
      shortDescription,
      image,
      description,
      studentIds
    },
    fieldStates: {
      nameState,
      typeState,
      subjectState,
      shortDescriptionState,
      imageState,
      descriptionState,
      studentIdsState
    },
    handlers: {
      handleMemberSelect,
      validateStudentIds,
      updateImage
    }
  };
}