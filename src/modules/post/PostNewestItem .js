import React from "react";
import slugify from "slugify";
import styled from "styled-components";

import PostTitle from "./PostTitle";
import PostMeta from "./PostMeta ";
import PostImage from "./PostImgae";
import Category from "./category/Category";
const PostNewestItemStyles = styled.div`
  display: flex;
  gap: 15px;
  padding-bottom: 28px;
  border-bottom: 1px solid #ddd;
  &:last-child {
    padding-bottom: 0;
    margin-bottom: 0;
    border-bottom: 0;
  }
  .post {
    &-image {
      display: block;
      flex-shrink: 0;
      width: 180px;
      height: 130px;
      border-radius: 12px;
    }
    &-category {
      margin-bottom: 8px;
    }
    &-content {
      flex: 1;
    }

    &-title {
      margin-bottom: 8px;
    }
  }
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
  @media screen and (max-width: 1023.98px) {
    margin-bottom: 14px;
    padding-bottom: 14px;
    .post {
      &-image {
        width: 140px;
        height: 100px;
      }
    }
  }
`;
const PostNewestItem = ({ data }) => {
  if (!data.id) return null;
  const date = data?.createdAt?.seconds
    ? new Date(data?.createdAt?.seconds * 1000)
    : new Date();
  const formatDate = new Date(date).toLocaleDateString("vi-VI");
  return (
    <PostNewestItemStyles>
      <div className="w-2/4">
        <PostImage
          widthsize="100%"
          heightsize="150px"
          url={data.image}
          alt=""
          to={data?.slug}
        ></PostImage>
      </div>

      <div className="items-start w-2/4 post-content">
        <Category to={data?.category?.slug} type="secondary">
          {data.category?.name}
        </Category>
        <PostTitle to={data?.slug}>{data.title}</PostTitle>
        <PostMeta
          to={slugify(data?.user?.username || "", { lower: true })}
          authorName={data?.user?.fullname}
          date={formatDate}
        ></PostMeta>
      </div>
    </PostNewestItemStyles>
  );
};

export default PostNewestItem;
