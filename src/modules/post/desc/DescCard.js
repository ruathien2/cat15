import React from "react";
import styled from "styled-components";

const DescCardStyles = styled.div`
  .desccript {
    color: ${(props) => props.color};
    font-weight: 500;
  }
`;

export default function DescCard({ children, color, size, type, ...props }) {
  return (
    <DescCardStyles color={color} size={size}>
      <div
        className={`${
          type ? "text-[28px] text-[#019575] font-semibold mobile" : "desccript"
        }`}
        {...props}
      >
        {children}
      </div>
    </DescCardStyles>
  );
}
