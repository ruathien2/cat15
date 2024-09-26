import React, { useEffect, useState } from "react";
import PostImgae from "../PostImgae";
import Category from "../category/Category";
import DateAuthor from "../date-author/DateAuthor";
import DescCard from "../desc/DescCard";
import styled from "styled-components";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase-app/firebaseConfig";
import { Link, useNavigate } from "react-router-dom";
import PostMeta from "../PostMeta ";
import slugify from "slugify";

const FeatureItemStyles = styled.div`
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  padding: 10px;
  border-radius: 10px;
  .feature-img {
    position: relative;
    border-radius: 8px;
    max-width: 500px;
    max-height: 200px;
    width: 100%;
    height: 100%;
    object-fit: cover;
    margin-bottom: 10px;
  }

  .feature-item {
    position: relative;
    border-radius: 8px;
    max-width: 500px;
    max-height: 200px;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .feature-tool {
    position: absolute;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    top: 0;
    width: 100%;
  }
  &:hover {
    opacity: 0.8;
  }
  .feature-desc {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-top: 10px;
  }
`;

export default function FeatureItem({ data }) {
  const navigate = useNavigate();

  const date = data?.createdAt?.seconds
    ? new Date(data?.createdAt?.seconds * 1000)
    : new Date();
  const formatDate = new Date(date).toLocaleDateString("vi-VI");

  if (!data || !data.id) return null;
  return (
    <FeatureItemStyles>
      <Link to={`/${data?.slug}`}>
        <div className="cursor-pointer feature-item ">
          <PostImgae
            url={data.image}
            widthsize={"500px"}
            heightsize={"200px"}
            className={"feature-img"}
          ></PostImgae>
          <div className="feature-tool">
            {data?.category?.name && (
              <Category kind="secondary">{data?.category?.name}</Category>
            )}
          </div>
        </div>
        <div className="feature-desc">
          <DescCard color="#000">{data.title}</DescCard>
          <PostMeta
            authorName={data?.user?.fullname}
            date={formatDate}
          ></PostMeta>
        </div>
      </Link>
    </FeatureItemStyles>
  );
}
