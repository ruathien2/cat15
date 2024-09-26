import React, { useEffect, useState } from "react";
import Category from "../../modules/post/category/Category";
import DescCard from "../../modules/post/desc/DescCard";
import DateAuthor from "../../modules/post/date-author/DateAuthor";
import styled, { css } from "styled-components";
import PostImgae from "../../modules/post/PostImgae";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../firebase-app/firebaseConfig";
import PostMeta from "../../modules/post/PostMeta ";
import slugify from "slugify";

const CardItemStyles = styled.div`
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  padding: 10px;
  border-radius: 10px;
  .news-img-list-1 {
    ${(props) =>
      props.height === props.height &&
      css`
        max-height: ${props.height}px;
      `};
    width: 100%;
    border-radius: 8px;
    object-fit: cover;
  }

  .item-news-1 {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .tool-1 {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .tool_nav-1 {
    background-color: #f3edff;
    color: #6b6b6b;
    padding: 5px 10px;
    font-size: 12px;
    border-radius: 10px;
    max-width: 80px;
    width: 100%;
    text-align: center;
  }
  &:hover {
    opacity: 0.8;
  }
`;

export default function CardItem({ item, ...props }) {
  const date = item?.createdAt?.seconds
    ? new Date(item?.createdAt?.seconds * 1000)
    : new Date();
  const formatDate = new Date(date).toLocaleDateString("vi-VI");
  return (
    <CardItemStyles height={props.height}>
      <div className="item-news-1">
        <PostImgae
          url={item.image || ""}
          heightsize="200px"
          widthsize="100%"
        ></PostImgae>

        <div className="desc-1">
          <div className="tool-1">
            <Category kind="cardPriamry">{item.category.name}</Category>
            <div className="descrip">
              <DescCard type={props.type}>{item.title}</DescCard>
            </div>
            <PostMeta
              to={slugify(item?.user?.username || "", { lower: true })}
              authorName={item?.user?.fullname}
              date={formatDate}
            ></PostMeta>
          </div>
        </div>
      </div>
    </CardItemStyles>
  );
}
