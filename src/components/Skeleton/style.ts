import styled, { keyframes } from "styled-components";

const loading = keyframes`
  0% {
    transform: translateX(-150%);
  }
  50% {
    transform: translateX(-60%);
  }
  100% {
    transform: translate(150%);
  }
`

export const SkeleteonContainer = styled.div<{$width:string, $height:string, $type:string}>`
  width: $width;
  height: $height;
  border-radius: ${({ $type }) => $type === "square" ? "8px" : "999px"};
  background-color: #EFF1F6;
  animation: ${loading} 1s linear infinite;
`

export const shimmer = styled.div`
  width : 50%;
  height: 100%;
  background-color: rgba(118, 108, 108, 0.05);
  transform: skewX(-20deg);
  box-shadow: 0 0 30px 30px rgba(255, 255, 255, 0.05);
`

