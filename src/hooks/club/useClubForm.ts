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
      updateImage
    }
  };
}