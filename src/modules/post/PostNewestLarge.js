import React from "react";
import slugify from "slugify";
import styled from "styled-components";
import PostImgae from "./PostImgae";
import Category from "./category/Category";
import PostMeta from "./PostMeta ";
import PostTitle from "./PostTitle";

const PostNewestLargeStyles = styled.div`
  .post {
    &-image {
      display: block;
      margin-bottom: 20px;
      height: 433px;
      border-radius: 16px;
    }
    &-category {
      margin: 10px;
    }
    &-title {
      margin-bottom: 20px;
    }
    &:hover {
      cursor: pointer;
      opacity: 0.8;
    }
    @media screen and (max-width: 1023.98px) {
      &-image {
        height: 250px;
      }
    }
  }
`;

const PostNewestLarge = ({ data }) => {
  if (!data.id) return null;
  const date = data?.createdAt?.seconds
    ? new Date(data?.createdAt?.seconds * 1000)
    : new Date();
  const formatDate = new Date(date).toLocaleDateString("vi-VI");
  return (
    <PostNewestLargeStyles>
      <PostImgae
        url={data?.image}
        alt=""
        to={data?.slug}
        widthsize="100%"
        heightsize="100%"
      ></PostImgae>
      <Category to={data?.category?.slug}>{data?.category?.name}</Category>
      <PostTitle to={data?.slug} size="big">
        {data?.title}
      </PostTitle>
      <PostMeta
        to={slugify(data?.user?.username || "", { lower: true })}
        authorName={data?.user?.fullname}
        date={formatDate}
      ></PostMeta>
    </PostNewestLargeStyles>
  );
};

export default PostNewestLarge;
