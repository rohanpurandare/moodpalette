import React from "react";
import styled from "styled-components";
import MooPalImg from "./MooPal.jpeg";

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const LogoImg = styled.div`
  width: 90px;
  height: 90px;

  img {
    width: 100%;
    height: 100%;
  }
`;

const LogoText = styled.h2`
  font-size: 30px;
  margin: 0;
  margin-left: 4px;
  color: #222;
  font-weight: 500;
`;

export default function Logo(props) {
  return (
    <LogoWrapper>
      <LogoImg>
        <img src={MooPalImg} alt="Moo Pal Logo" />
      </LogoImg>
      <LogoText>Moo Pal</LogoText>
    </LogoWrapper>
  );
}