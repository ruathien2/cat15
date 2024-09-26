import React from "react";
import styled from "styled-components";

const PostImgaeStyles = styled.div`
  .news-img-list {
    max-width: ${(props) => props.widthsize && `${props.widthsize}`};
    max-height: ${(props) => props.heightsize && `${props.heightsize}`};
    width: 100%;
    height: ${(props) => props.heightsize && `${props.heightsize}`};
    border-radius: 8px;
    object-fit: cover;
  }
`;

export default function PostImage({
  url = "",
  alt = "",
  widthsize = "200px",
  heightsize = "100px",
  className,
}) {
  return (
    <PostImgaeStyles
      className={className}
      widthsize={widthsize}
      heightsize={heightsize}
    >
      <img srcSet={url} alt="" loading="lazy" className="news-img-list" />
    </PostImgaeStyles>
  );
}
