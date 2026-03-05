import { Dialog, DodamModal } from "@b1nd/dds-web"
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { QUERY_KEYS } from "src/queries/queryKey";

interface ApplyClubDialogProps {
  name: string;
  onSubmit: () => void;
  isOpen: boolean;
  close: () => void;
}

const ApplyClubDialog = ({
  name,
  onSubmit,
  isOpen,
  close
}: ApplyClubDialogProps) => {
  const nav = useNavigate();
  const queryClient = useQueryClient();

  return (
    <DodamModal isOpen={isOpen} background>
      <Dialog
        title="정말 제출하시겠습니까?"
        text={`${name} 에 지원할까요? 결과가 나오기 전까지 취소할 수 없습니다.`}
        type={{
          dialog: "CONFIRM",
          confirm: {
            content: "제출",
            onClick: () => {
              onSubmit();
              close();
              nav("/club");
              queryClient.invalidateQueries(QUERY_KEYS.joinRequest.getJoinRequests, { refetchInactive: true })
            }
          },
          dismiss: {
            content: "취소",
            onClick: close
          }
        }}
      />
    </DodamModal>
  );
}

export default ApplyClubDialog