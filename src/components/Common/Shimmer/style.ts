import styled from "styled-components";
import { skeletonAnimtaion } from "@b1nd/b1nd-styled-components-util";



export const ShimmerWrapper = styled.div`
  position: absolute;
  top: 0;
  left : 0;
  width : 100%;
  height : 100%;
  ${skeletonAnimtaion}
`
export const Shimmer = styled.div`
  width : 50%;
  height: 100%;
`