import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PostImgae from "./PostImgae";
import Category from "./category/Category";
import DescCard from "./desc/DescCard";
import DateAuthor from "./date-author/DateAuthor";
import HeadingCategory from "./heading-category/HeadingCategory";
import CardItem from "../../components/card-item/CardItem";
import { Link, useParams, useSearchParams } from "react-router-dom";
import {
  collection,
  limit,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase-app/firebaseConfig";
import { useAuth } from "../../contexts/authContext";
import { NotFoundPage } from "../../pages";
import parse from "html-react-parser";
import PostItem from "./postItem/PostItem";
import { userRole } from "../../untils/constant";
import PostNewestLarge from "./PostNewestLarge";

const PostDetailsStyles = styled.div`
  .wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
  .left,
  .right {
    width: 100%;
  }

  .right {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .desc {
    font-size: 16px;
  }

  .desccription {
    font-size: 16px;
  }
  .wrap-desc {
    margin-bottom: 40px;
    font-family: "Times New Roman", Georgia, Serif;
    line-height: 1.5;
    font-size: 20px;
    text-align: justify;
  }

  .wrap-similar {
  }

  .list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }
  img {
    width: 50%;
    border-radius: 10px;
  }
  h1 {
    font-size: 32px;
    font-weight: 500;
  }
  h2 {
    font-size: 24px;
    font-weight: 600;
  }
  h3 {
    font-size: 16px;
    font-weight: 500;
  }

  h4 {
    font-size: 12px;
    font-weight: 600;
  }

  h5 {
    font-size: 12px;
    font-size: 500;
  }

  padding-bottom: 100px;

  .post {
    &-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 40px;
      margin: 40px 0;
    }
    &-feature {
      width: 100%;
      max-width: 640px;
      height: 466px;
      border-radius: 20px;
    }
    &-heading {
      font-weight: bold;
      font-size: 36px;
      margin-bottom: 16px;
    }
    &-info {
      flex: 1;
    }
    &-content {
      max-width: 700px;
      margin: 80px auto;
    }
  }
  .author {
    margin-bottom: 80px;
    display: flex;
    border-radius: 20px;
    background-color: ${(props) => props.theme.grayF3};
    &-image {
      width: 200px;
      height: 200px;
      flex-shrink: 0;
      border-radius: inherit;
    }
    &-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: inherit;
    }
    &-content {
      flex: 1;
      padding: 20px;
    }
    &-name {
      font-weight: bold;
      margin-bottom: 10px;
      font-size: 20px;
    }
    &-desc {
      font-size: 14px;
      line-height: 2;
    }
  }
  @media only screen and (max-width: 800px) {
    margin-top: 100px;
    padding-bottom: 40px;
    .post {
      &-header {
        flex-direction: column;
      }
      &-feature {
        height: auto;
      }
      &-heading {
        font-size: 26px;
      }
      &-content {
        margin: 40px 0;
      }
    }
    .author {
      flex-direction: column;
      &-image {
        width: 100%;
        height: auto;
      }
    }

    .desc {
      font-size: 15px;
    }

    .wrap {
      gap: 20px;
    }

    .list {
      display: grid;
      grid-template-columns: repeat(1, 1fr);
      gap: 20px;
    }

    .wrap-desc {
      line-height: 1.5;
      font-size: 15px;
    }
    .ql-align-center img {
      width: 500px;
    }
    .desccript {
      font-size: 12px;
    }

    .mobile {
      font-size: 20px;
    }

    h1 {
      font-size: 20px;
    }
    h2 {
      font-size: 18px;
      font-weight: 600;
    }
    .ql-align-right span {
      font-size: 12px;
    }
    .news-img-list {
      height: 80%;
    }
  }
`;

export default function PostDetails() {
  const { slug } = useParams();
  const [postInfo, setPostInfo] = useState({});
  useEffect(() => {
    async function fetchData() {
      if (!slug) return;
      const colRef = query(
        collection(db, "posts"),
        where("slug", "==", slug),
        limit(3)
      );
      onSnapshot(colRef, (snapshot) => {
        snapshot.forEach((doc) => {
          doc.data() &&
            setPostInfo({
              id: doc.id,
              ...doc.data(),
            });
        });
      });
    }
    fetchData();
  }, [slug]);
  useEffect(() => {
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [slug]);
  if (!slug) return <NotFoundPage></NotFoundPage>;
  if (!postInfo.title) return null;

  return (
    <PostDetailsStyles>
      <div className="container-wrap">
        <div className="wrap">
          <div className="bg-top left">
            <PostImgae
              url={postInfo.image}
              widthsize="100%"
              heightsize="300px"
            ></PostImgae>
          </div>
          <div className="w-full">
            <Category kind="cardPriamry">{postInfo?.category?.name}</Category>
            <DescCard size="32px" color={`rgb(1, 149, 117)`} type="big">
              {postInfo.title}
            </DescCard>
            <DateAuthor
              date={new Date(
                postInfo.createdAt?.seconds * 1000
              ).toLocaleDateString("vi-VI")}
              author={postInfo.user.fullname}
            ></DateAuthor>
          </div>
        </div>
        <div className="flex flex-col wrap-desc">
          {parse(`${postInfo?.content}`)}
        </div>
        <div className="wrap-similar">
          <PostItem categoryId={postInfo?.category?.id}></PostItem>
        </div>
      </div>
    </PostDetailsStyles>
  );
}
