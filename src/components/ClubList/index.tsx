import { Suspense, useState } from "react";
import * as S from "./style";
import {  DodamSegmentedButton } from "@b1nd/dds-web";
import ClubItem from "./ClubItem";
import { ClubResponse } from "src/types/club/club.type";
import { EClub } from "src/enum/club/club.enum";
import { Link } from "react-router-dom";
import { useGetClubsQuery } from "src/queries/useClub";
import ClubItemSkeleton from "src/components/Common/ClubItemSkeleton";
import { useClubTime } from "src/hooks/club/useClubTime";


const ClubList = ({isCreativeClubPage}: {isCreativeClubPage: boolean}) => {
  const { data: clubData } = useGetClubsQuery();
  const { timeData, today } = useClubTime();
  
  return (
    <>
      {clubData!.length > 0 ? (
        clubData!
          .filter((item: ClubResponse) =>
            isCreativeClubPage
              ? item.type === EClub.CREATIVE_CLUB
              : item.type === EClub.SELF_DIRECT_CLUB
          )
          .map((item: ClubResponse) => (
            <Link
              to={`/${item.id}`}
              key={item.id}
              style={{
                height: "fit-content",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textDecoration: 'none'
              }}
            >
              <ClubItem value={item} isEnded={timeData!.applicantStart < today} />
            </Link>
          ))
      ) : (
        <S.NoClubMessage>올라온 동아리가 없습니다.</S.NoClubMessage>
      )}
    </>
  );
};

export default ClubList;