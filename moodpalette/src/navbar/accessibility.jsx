import React from "react";
import styled from "styled-components";

const AccessibilityContainer = styled.div`
  display: flex;
  margin-left: 10px;
`;

const LogoutButton = styled.button`
  border: 0;
  outline: 0;
  padding: 8px 1em;
  color: #222;
  font-size: 18px;
  font-weight: 500;
  border-radius: 20px;
  background-color: transparent;
  border: 2px solid #2ecc71;
  transition: all 240ms ease-in-out;
  cursor: pointer;

  &:hover {
    color: #fff;
    background-color: #2ecc71;
  }

  &:not(:last-of-type) {
    margin-right: 7px;
  }
`;

export default function Accessibility(props) {
  return (
    <AccessibilityContainer>
      <LogoutButton>Logout</LogoutButton>
    </AccessibilityContainer>
  );
}