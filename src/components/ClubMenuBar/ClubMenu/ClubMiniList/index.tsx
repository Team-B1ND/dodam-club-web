import * as S from "./style";
import { useCallback, useState } from "react";
import {
  ClubJoinResponse,
  ClubMenuItemMyClubProps,
  ClubMenuItemProps,
  ClubResponse,
} from "src/types/club/club.type";
import {
  CheckmarkCircleFilled,
  Clock,
  Dialog,
  DodamColor,
  DodamModal,
  XmarkCircle,
} from "@b1nd/dds-web";
import { Link } from "react-router-dom";
import { EClubState } from "src/enum/club/club.enum";
import ClubDetail from "@components/ClubDetail";
import { useDeleteJoinRequestQuery, usePostJoinRequestQuery } from "@/queries/joinRequest/joinRequest.query";
import { transToObject } from "src/utils/transToObject/transToObject";

const ClubMiniList = ({
  name,
  value,
  type,
}: ClubMenuItemProps | ClubMenuItemMyClubProps) => {
  const [isOpen, setIsopen] = useState({
    REQUEST_ACCEPT: transToObject(value),
    REQUEST_REJECT: transToObject(value),
    CLUB: transToObject(value),
  });
  const [requestModal, setRequestModal] = useState<"ACCEPT" | "REJECT" | "CLUB">("ACCEPT");
  const [miniList] = useState<ClubResponse[] | ClubJoinResponse[]>(value);

  const postJoinRequestMutation = usePostJoinRequestQuery()
  const deleteJoinRequestMutation = useDeleteJoinRequestQuery()

  const requestHandle = useCallback(
    ({ type, id }: { type: "ACCEPT" | "REJECT" | "CLUB"; id?: number }) => {
      setRequestModal(type);
      if (type === "ACCEPT") {
        setIsopen((prev) => ({
          ...prev,
          REQUEST_ACCEPT: {...prev.REQUEST_ACCEPT, [id!]:!prev.REQUEST_ACCEPT[id!]},
        }));
      } else if (type === "REJECT") {
        setIsopen((prev) => ({
          ...prev,
          REQUEST_REJECT: {...prev.REQUEST_REJECT, [id!]:!prev.REQUEST_REJECT[id!]},
        }));
      } else if (type === "CLUB") {
        setIsopen((prev) => ({
          ...prev,
          CLUB: {...prev.CLUB, [id!]:!prev.CLUB[id!]},
        }));
      }
    },
    []
  );

  const isMyClubType = (
    props: ClubResponse | ClubJoinResponse
  ): props is ClubJoinResponse => {
    return "club" in props;
  };

  return (
    value.length > 0 && (
      <S.ClubListContainer>
        {name}
        {miniList.map((item) => (
          <S.ClubMiniItem key={item.id}>
            {type === "Request" && isMyClubType(item)
            ? (
              <>
                <Link to={`/${item.club.id}`}>
                  <S.ClubMiniItemName>{item.club.name}</S.ClubMiniItemName>
                </Link>
                <S.ClubMiniItemRequestContainer>
                  <div
                    onClick={() => requestHandle({ type: "ACCEPT", id: item.id })}
                    style={{ cursor: "pointer" }}
                  >
                    <CheckmarkCircleFilled color={DodamColor.blue50} />
                  </div>
                  <div
                    onClick={() => requestHandle({ type: "REJECT", id: item.id })}
                    style={{ cursor: "pointer" }}
                  >
                    <XmarkCircle color={DodamColor.red50} />
                  </div>
                  <DodamModal
                    isOpen={
                      requestModal === "ACCEPT"
                        ? isOpen.REQUEST_ACCEPT[item.id]
                        : isOpen.REQUEST_REJECT[item.id]
                    }
                    background={true}
                  >
                    <Dialog
                      title={`정말 ${item.club.name}의 입부 신청을 ${
                        requestModal === "ACCEPT" ? "수락" : "거절"
                      }하시겠습니까?`}
                      text="이 선택은 되돌릴 수 없습니다. 신중히 선택해주세요."
                      type={{
                        dialog: "CONFIRM",
                        confirm: {
                          content: requestModal === "ACCEPT" ? "수락" : "거절",
                          onClick: () => {
                            if (requestModal === "ACCEPT") {
                              postJoinRequestMutation.mutate({id: item.id})
                            } else {
                              deleteJoinRequestMutation.mutate({id: item.id});
                            }
                            requestHandle({ type: requestModal, id: item.id });
                          },
                        },
                        dismiss: {
                          content: "취소",
                          onClick: () => requestHandle({ type: requestModal, id: item.id }),
                        },
                      }}
                    />
                  </DodamModal>
                </S.ClubMiniItemRequestContainer>
              </>
            )
            : type === "MyClub" && !isMyClubType(item)
            ? (
              <Link to={`/${item.id}`}>
                <S.ClubMiniItemName>{item.name}</S.ClubMiniItemName>
              </Link>
            )
            : (
              (type === "LeaderApply" && !isMyClubType(item))
              && (
                <S.ClubMiniItem
                  onClick={() => requestHandle({ type: "CLUB", id: item.id })}
                >
                  <S.ClubMiniItemName>{item.name}</S.ClubMiniItemName>
                  {(item.state === EClubState.PENDING || item.state === EClubState.WAITING)
                  ? (
                    <Clock color={DodamColor.yellow50} size={20} />
                  )
                  : (item.state === EClubState.DELETED || item.state === EClubState.REJECTED)
                    ? (
                      <XmarkCircle color={DodamColor.red50} size={20} />
                    ) 
                    : (
                      <CheckmarkCircleFilled color={DodamColor.green50} size={20}/>
                    )
                  }
                  <DodamModal isOpen={isOpen.CLUB[item.id]} background={true}>
                    <ClubDetail type="MODAL" modalId={item.id} />
                  </DodamModal>
                </S.ClubMiniItem>
              )
            )}
          </S.ClubMiniItem>
        ))}
      </S.ClubListContainer>
    )
  );
};

export default ClubMiniList;
