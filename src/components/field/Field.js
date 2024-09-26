import React from "react";
import styled from "styled-components";

const FieldStyles = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  align-items: flex-start;
  margin-bottom: 16px;
  &:last-child {
    margin-bottom: 0;
  }
`;

export default function Field({ children, ...props }) {
  return <FieldStyles {...props}>{children}</FieldStyles>;
}
