import React, { useEffect, useState } from "react";
import styled from "styled-components";
import HomeFeatureList from "./HomeFeatureList";
import Category from "../post/category/Category";
import HeadingCategory from "../post/heading-category/HeadingCategory";
import DateAuthor from "../post/date-author/DateAuthor";
import DescCard from "../post/desc/DescCard";
import PostImgae from "../post/PostImgae";
import {
  collection,
  getDocs,
  limit,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase-app/firebaseConfig";
import FeatureItem from "../post/feature-item/FeatureItem";

const HomeFeatureStyles = styled.div`
  margin-bottom: 40px;
  .feature {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }

  @media only screen and (max-width: 800px) {
    .feature {
      grid-template-columns: repeat(1, 1fr);
    }
  }
  @media (max-width: 1023px) and (min-width: 700px) {
    .feature {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`;

export default function HomeFeature() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const colRef = collection(db, "posts");
    const q = query(
      colRef,
      where("status", "==", 1),
      where("hot", "==", true),
      limit(3)
    );

    onSnapshot(q, (snapshot) => {
      const result = [];
      snapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setPosts(result);
    });
  }, []);

  if (posts.length <= 0) return null;
  return (
    <HomeFeatureStyles>
      <div className="container-wrap">
        <div>
          <HeadingCategory>Bài Viết Nổi Bật</HeadingCategory>
          <div className="feature">
            {posts &&
              posts.map((item) => {
                return <FeatureItem key={item.id} data={item}></FeatureItem>;
              })}
          </div>
        </div>
      </div>
    </HomeFeatureStyles>
  );
}
