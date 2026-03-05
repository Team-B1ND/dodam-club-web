import { useGetClubsQuery } from "src/queries/useClub";
import * as S from "./style";

interface ApplyClubListProps {
  onClick: (id: number, name: string) => void;
  selectedClubId: number;
}

const ApplyClubList = ({
  onClick,
  selectedClubId
}: ApplyClubListProps) => {
  const { data } = useGetClubsQuery();
  return (
    <S.Container>
      {data?.map(item => (
        <S.ClubItem $selected={(selectedClubId === item.id).toString()} onClick={() => onClick(item.id, item.name)} key={item.id}>
          {item.name}
        </S.ClubItem>
      ))}
    </S.Container>
  )
}

export default ApplyClubList