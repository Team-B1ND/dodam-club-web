import React from "react";
import * as S from "./style";
import ClubList from "@components/ClubList";
import { useThemes } from "src/hooks/theme/usetheme";
import { useRecoilValue } from "recoil";
import { themeModeAtom } from "src/store/theme/themeStore";
import ClubMenu from "@components/ClubMenu";
import { DodamFilledButton } from "@b1nd/dds-web";

const MainPage = () => {
  const { handleTheme } = useThemes();
  const currentTheme = useRecoilValue(themeModeAtom);

  const examples = [
    {
      subject: "전공",
      name: "B1ND",
      description: "코딩을 좋아하는 우리 바인드팀 여러분",
      state: "OK",
      image: "",
      isCreativeClub: true,
    },
    {
      subject: "체스",
      name: "B2ND",
      description: "코딩을 좋아하는 우리 바인드팀 여러분",
      state: "OK",
      image: "",
      isCreativeClub: false,
    },
    {
      subject: "체스",
      name: "B3ND",
      description: "코딩을 좋아하는 우리 바인드팀 여러분",
      state: "OK",
      image: "",
      isCreativeClub: false,
    },
    {
      subject: "체스",
      name: "B4ND",
      description: "코딩을 좋아하는 우리 바인드팀 여러분",
      state: "OK",
      image: "",
      isCreativeClub: false,
    },
    {
      subject: "체스",
      name: "B5ND",
      description: "코딩을 좋아하는 우리 바인드팀 여러분",
      state: "OK",
      image: "",
      isCreativeClub: false,
    },
    {
      subject: "체스",
      name: "B6ND",
      description: "코딩을 좋아하는 우리 바인드팀 여러분",
      state: "OK",
      image: "",
      isCreativeClub: false,
    },
    {
      subject: "체스",
      name: "B7ND",
      description: "코딩을 좋아하는 우리 바인드팀 여러분",
      state: "OK",
      image: "",
      isCreativeClub: false,
    },
    {
      subject: "체스",
      name: "B8ND",
      description: "코딩을 좋아하는 우리 바인드팀 여러분",
      state: "OK",
      image: "",
      isCreativeClub: true,
    },
    {
      subject: "체스",
      name: "B9ND",
      description: "코딩을 좋아하는 우리 바인드팀 여러분",
      state: "OK",
      image: "",
      isCreativeClub: false,
    },
    {
      subject: "체스",
      name: "B10ND",
      description: "코딩을 좋아하는 우리 바인드팀 여러분",
      state: "OK",
      image: "",
      isCreativeClub: false,
    },
    {
      subject: "체스",
      name: "B11ND",
      description: "코딩을 좋아하는 우리 바인드팀 여러분",
      state: "OK",
      image: "",
      isCreativeClub: false,
    },
  ];

  return (
    <S.main>
      <S.exampleSidebar />
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
      <S.themechange onClick={handleTheme}>{currentTheme}</S.themechange>
    </S.main>
  );
};

export default MainPage;
