import * as S from "./style"

interface Skeleteon {
  width: string;
  height: string;
  type: "square" | "circle"
}

const Skeleton = ({ width = "150px", height = "72px", type = "square"} : Skeleteon) => {
  return (
    <S.SkeleteonContainer
      $width={width}
      $height={height}
      $type={type}
    >
      <S.shimmer />
    </S.SkeleteonContainer>
  )
}

export default Skeleton