import React, { useState } from "react";
import * as S from "./style";
import { DodamSegmentedButton } from "@b1nd/dds-web";
import ClubItem from "./ClubItem";
import { Club } from "src/types/club/club.type";

const ClubList = () => {
  const [ isCreativeClub, setIsCreativeClub ] = useState(true);

  const changePage = () => {
    setIsCreativeClub(prev=>!prev)
  }

  const examples : Club[] = [
    {
      subject: "전공",
      name: "B1ND",
      description: "코딩을 좋아하는 우리 바인드팀 여러분",
      state: "OK",
      image: '',
      isCreativeClub: true
    },
    {
      subject: "체스",
      name: "B2ND",
      description: "코딩을 좋아하는 우리 바인드팀 여러분",
      state: "OK",
      image: '',
      isCreativeClub: false
    },
    {
      subject: "체스",
      name: "B3ND",
      description: "코딩을 좋아하는 우리 바인드팀 여러분",
      state: "OK",
      image: '',
      isCreativeClub: false
    },
    {
      subject: "체스",
      name: "B4ND",
      description: "코딩을 좋아하는 우리 바인드팀 여러분",
      state: "OK",
      image: '',
      isCreativeClub: false
    },
    {
      subject: "체스",
      name: "B5ND",
      description: "코딩을 좋아하는 우리 바인드팀 여러분",
      state: "OK",
      image: '',
      isCreativeClub: false
    },
    {
      subject: "체스",
      name: "B6ND",
      description: "코딩을 좋아하는 우리 바인드팀 여러분",
      state: "OK",
      image: '',
      isCreativeClub: false
    },
    {
      subject: "체스",
      name: "B7ND",
      description: "코딩을 좋아하는 우리 바인드팀 여러분",
      state: "OK",
      image: '',
      isCreativeClub: false
    },
    {
      subject: "체스",
      name: "B8ND",
      description: "코딩을 좋아하는 우리 바인드팀 여러분",
      state: "OK",
      image: '',
      isCreativeClub: true
    },
    {
      subject: "체스",
      name: "B9ND",
      description: "코딩을 좋아하는 우리 바인드팀 여러분",
      state: "OK",
      image: '',
      isCreativeClub: false
    },
    {
      subject: "체스",
      name: "B10ND",
      description: "코딩을 좋아하는 우리 바인드팀 여러분",
      state: "OK",
      image: '',
      isCreativeClub: false
    },
    {
      subject: "체스",
      name: "B11ND",
      description: "코딩을 좋아하는 우리 바인드팀 여러분",
      state: "OK",
      image: '',
      isCreativeClub: false
    },
  ];

  return (
    <S.ClubListContainer>
      <S.ClubListHead>동아리</S.ClubListHead>
      <S.ClubMenu>
        <DodamSegmentedButton
          num={2}
          type="block"
          data={[
            { text: '창체동아리', isAtv: isCreativeClub },
            { text: '자율동아리', isAtv: !isCreativeClub }
          ]}
          width={280}
          height={56}
          onClick={changePage}
        />
      </S.ClubMenu>
      <S.ClubItemContainer>
        {examples.filter((item) => (
          item.isCreativeClub === isCreativeClub
        )).map((item) => (
          <ClubItem
          key={item.name}
          value={item}
          />
        ))}
      </S.ClubItemContainer>

    </S.ClubListContainer>
  );
};

export default ClubList;
