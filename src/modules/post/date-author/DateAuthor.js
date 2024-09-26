import React from "react";
import styled, { css } from "styled-components";

const DateAuthorStyles = styled.div`
  color: gray;
  .date-author {
    height: 50px;
    display: flex;
    font-size: 12px;
  }
  .date {
    margin-right: 10px;
  }
  .author {
    position: relative;
    margin-left: 10px;
    /* padding-left: 15px; */
  }
  /* .author::before {
    position: absolute;
    content: "";
    width: 5px;
    height: 5px;
    background-color: #000;
    color: #000;
    border-radius: 100%;
    left: 0;
    top: -100%;
    transform: translateY(100%);
  } */
`;

export default function DateAuthor({ date, author, color, ...props }) {
  return (
    <DateAuthorStyles color={color}>
      <div className="date-author">
        <span className="date">{date}</span>-
        <span className="author">{author}</span>
      </div>
    </DateAuthorStyles>
  );
}
