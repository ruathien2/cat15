import React from "react";
import styled from "styled-components";

const HeadingCategoryStyles = styled.div`
  position: relative;
  display: inline-block;
  font-size: 24px;
  font-weight: 600;
  color: ${(props) => props.theme.textTitle};
  margin-bottom: 20px;
  &:before {
    position: absolute;
    content: "";
    width: 30px;
    border-top: 3px solid #00d1ed;
    margin-top: -5px;
  }
`;

export default function HeadingCategory({ children }) {
  return (
    <HeadingCategoryStyles>
      <h2>{children}</h2>
    </HeadingCategoryStyles>
  );
}
