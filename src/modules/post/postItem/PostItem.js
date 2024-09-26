import React, { useEffect, useState } from "react";
import HeadingCategory from "../heading-category/HeadingCategory";
import CardItem from "../../../components/card-item/CardItem";
import {
  collection,
  limit,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../../firebase-app/firebaseConfig";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const PostItemStyle = styled.div`
  .list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }
  @media only screen and (max-width: 800px) {
    .list {
      display: grid;
      grid-template-columns: repeat(1, 1fr);
    }
  }
`;

export default function PostItem({ categoryId = "", ...props }) {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const docRef = query(
      collection(db, "posts"),
      where("category.id", "==", categoryId),
      limit(3)
    );
    onSnapshot(docRef, (snapshot) => {
      const results = [];
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setPosts(results);
    });
  }, [categoryId]);
  if (!categoryId || posts.length <= 0) return null;
  return (
    <>
      <HeadingCategory>Bài viết liên quan</HeadingCategory>
      <PostItemStyle>
        <div className="list">
          {posts &&
            posts.map((item) => {
              return (
                <div
                  key={item.id}
                  onClick={() => navigate(`/${item.slug}`)}
                  className="cursor-pointer"
                >
                  <CardItem item={item} type={props.type}></CardItem>
                </div>
              );
            })}
        </div>
      </PostItemStyle>
    </>
  );
}
