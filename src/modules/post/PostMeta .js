import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
const PostMetaStyles = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  font-weight: 400;
  .post {
    &-dot {
      display: inline-block;
      width: 4px;
      height: 4px;
      background-color: currentColor;
      border-radius: 100rem;
    }
  }
  @media screen and (max-width: 1023.98px) {
    font-size: 10px;
    gap: 6px;
  }
`;

const PostMeta = ({
  date = "Mar 23",
  authorName = "Andiez Le",
  className = "",
}) => {
  return (
    <PostMetaStyles className={`post-meta ${className}`}>
      <span className="text-gray-400 post-time">{date}</span>
      <span className="post-dot"></span>
      <span className="text-gray-400 post-author">{authorName}</span>
    </PostMetaStyles>
  );
};

export default PostMeta;
