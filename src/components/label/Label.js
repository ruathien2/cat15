import React from "react";
import styled from "styled-components";

const LabelStyles = styled.div`
  color: ${(props) => props.theme.grayDark};
  font-weight: 600;
  cursor: pointer;
`;

export default function Label({ htmlFor = "", children, ...props }) {
  return (
    <LabelStyles htmlFor={htmlFor} {...props}>
      {children}
    </LabelStyles>
  );
}
