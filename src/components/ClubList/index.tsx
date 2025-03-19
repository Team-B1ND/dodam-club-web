import { DodamTypography } from "@b1nd/dds-web";
import ClubItem from "./ClubItem";
import { ClubResponse } from "src/types/club/club.type";
import { EClub } from "src/enum/club/club.enum";
import { Link } from "react-router-dom";
import { useGetClubsQuery } from "src/queries/useClub";
import { useClubTime } from "src/hooks/club/useClubTime";
import styled from "styled-components";

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
              <ClubItem value={item} isEnded={timeData!.applicantStart < today && timeData!.applicantEnd > today} />
            </Link>
          ))
      ) : (
        <NoClubMessage>올라온 동아리가 없습니다.</NoClubMessage>
      )}
    </>
  );
};

export default ClubList;

const NoClubMessage = styled.div`
  width: 100%;
  text-align: center;
  ${DodamTypography.Body1.Medium};
  color: ${({theme})=>theme.labelNormal};
  margin-top: 20px;
`;