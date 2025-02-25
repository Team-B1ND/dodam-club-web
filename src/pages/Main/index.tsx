import React from "react";
import * as S from "./style";
import ClubList from "@components/ClubList";
import ClubMenu from "@components/ClubMenu";
import { DodamFilledButton } from "@b1nd/dds-web";
import { EClub } from "src/enum/club/club.enum";

const MainPage = () => {
  const examples = [
    {
      subject: "전공",
      name: "B1ND",
      shortDescription: "코딩을 좋아하는 우리 바인드팀 여러분",
      description: '.',
      state: "OK",
      image: "",
      type: EClub.CREATIVE_CLUB,
    },
    {
      subject: "체스",
      name: "B2ND",
      shortDescription: "코딩을 좋아하는 우리 바인드팀 여러분",
      description: '.',
      state: "OK",
      image: "",
      type: EClub.SELF_DIRECT_CLUB,
    },
    {
      subject: "체스",
      name: "B5ND",
      shortDescription: "코딩을 좋아하는 우리 바인드팀 여러분",
      description: '.',
      state: "OK",
      image: "",
      type: EClub.SELF_DIRECT_CLUB,
    },
    {
      subject: "체스",
      name: "B6ND",
      shortDescription: "코딩을 좋아하는 우리 바인드팀 여러분",
      description: '.',
      state: "OK",
      image: "",
      type: EClub.SELF_DIRECT_CLUB,
    },
    {
      subject: "체스",
      name: "B7ND",
      shortDescription: "코딩을 좋아하는 우리 바인드팀 여러분",
      description: '.',
      state: "OK",
      image: "",
      type: EClub.SELF_DIRECT_CLUB,
    },
    {
      subject: "체스",
      name: "B8ND",
      shortDescription: "코딩을 좋아하는 우리 바인드팀 여러분",
      description: '.',
      state: "OK",
      image: "",
      type: EClub.CREATIVE_CLUB,
    },
  ];

  return (
    <>
      <ClubList />
      <S.clubMenubar>
        <DodamFilledButton
          size={"Large"}
          text="동아리 개설 신청하기"
          customStyle={{ color: "#fff" }}
          typography={["Body1", "Bold"]}
        />
        <ClubMenu name="내 개설 신청" value={examples} />
      </S.clubMenubar>
    </>
  );
};

export default MainPage;
