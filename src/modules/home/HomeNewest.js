import React, { useEffect, useState } from "react";
import styled from "styled-components";
import HeadingCategory from "../post/heading-category/HeadingCategory";
import PostNewestLarge from "../post/PostNewestLarge";
import {
  collection,
  limit,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase-app/firebaseConfig";
import PostNewestItem from "../post/PostNewestItem ";
import { v4 } from "uuid";

const HomeNewestStyles = styled.div`
  .wrap {
    display: flex;
    flex-direction: row;
    gap: 20px;
    margin-bottom: 40px;
  }

  .left {
    width: 50%;
    height: 100%;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    padding: 10px;
    border-radius: 10px;
  }

  .right {
    width: 50%;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    border-radius: 10px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .news-img {
    position: relative;
    border-radius: 10px;
    width: 100%;
    max-height: 500px;
    object-fit: cover;
    margin-bottom: 10px;
  }

  .item-news {
    display: flex;
    gap: 15px;
    height: auto;
  }

  .item-news:not(:last-child) {
    border-bottom: 1px solid #ccc;
    padding-bottom: 20px;
  }

  /* ================================ */
  .tool {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 15px;
  }

  .desc {
    color: #6b6b6b;
  }

  /* ======================================= */

  .grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 20px;
  }

  @media only screen and (max-width: 800px) {
    .wrap {
      display: flex;
      flex-direction: column;
    }
    .left,
    .right {
      width: 100%;
    }
  }
`;

export default function HomeNewest() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const colRef = collection(db, "posts");
    const queries = query(
      colRef,
      where("status", "==", 1),
      where("hot", "==", false),
      limit(4)
    );
    onSnapshot(queries, (snapshot) => {
      const results = [];
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setPosts(results);
    });
  }, []);
  if (posts.length <= 0) return null;
  const [first, ...other] = posts;
  return (
    <HomeNewestStyles>
      <div className="container-wrap">
        <HeadingCategory>Bài Viết Mới Cập Nhật</HeadingCategory>

        <div className="wrap">
          <div className="left">
            <PostNewestLarge data={first}></PostNewestLarge>
          </div>
          <div className="right">
            {other.length > 0 &&
              other.map((item) => (
                <PostNewestItem key={v4()} data={item}></PostNewestItem>
              ))}
          </div>
        </div>
        <div className="grid">{/* <CardItem height="180"></CardItem> */}</div>
      </div>
    </HomeNewestStyles>
  );
}
