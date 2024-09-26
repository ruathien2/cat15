import React, { useEffect, useState } from "react";
import { Header } from "../components/layout";
import PostItem from "../modules/post/postItem/PostItem";
import { useNavigate, useParams } from "react-router-dom";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase-app/firebaseConfig";
import NotFoundPage from "./NotFoundPage";
import PostNewestLarge from "../modules/post/PostNewestLarge";
import styled from "styled-components";
import PostNewestItem from "../modules/post/PostNewestItem ";
import Category from "../modules/post/category/Category";
import HeadingCategory from "../modules/post/heading-category/HeadingCategory";

const CategoryWriteStyle = styled.div`
  padding-bottom: 20px;

  .wrap {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0px 20px;
  }

  @media only screen and (max-width: 800px) {
    margin-top: 100px;
    .wrap {
      width: 100%;
      display: grid;
      grid-template-columns: repeat(1, 1fr);
    }
  }
`;

export default function CategoryWrite() {
  const { slug } = useParams();
  const [postInfo, setPostInfo] = useState([]);
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const colRef = collection(db, "posts");
    onSnapshot(colRef, (snapshot) => {
      let results = [];
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setPostInfo(results);
    });

    // onSnapshot(colRef, (snapshot) => {
    //   setTotal(snapshot.size);
    // });
  }, []);

  //   const { userInfo } = useAuth();
  //
  //   if (!postInfo.title) return null;

  useEffect(() => {
    const colRef = collection(db, "categories");

    onSnapshot(colRef, (snapshot) => {
      const result = [];

      snapshot.forEach((doc) => {
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      setCategories(result);
    });
  }, []);

  useEffect(() => {
    async function fetchData() {
      const colRef = query(
        collection(db, "posts"),
        where("category.slug", "==", slug)
      );
      await onSnapshot(colRef, (snapshot) => {
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
  if (!slug) return <NotFoundPage></NotFoundPage>;
  return (
    <>
      <Header></Header>
      <CategoryWriteStyle>
        <div className="container-wrap">
          <HeadingCategory>Lựa chọn loại bài viết</HeadingCategory>
          <div className="border-b-[1px] border-gray-300 mb-10 flex gap-x-1 gap-y-1 items-center flex-wrap pb-2 transition-all">
            {categories.map((item) => {
              return (
                <div
                  className="flex flex-wrap"
                  onClick={() => {
                    navigate(`/category-write/${item.slug}`);
                  }}
                  key={item.id}
                >
                  <Category
                    className={`${
                      slug === item.slug && " text-purple-500 font-semibold"
                    }`}
                  >
                    {item.name}
                  </Category>
                </div>
              );
            })}
          </div>
          {slug === "all" ? (
            <div className="wrap">
              {postInfo.map((item) => {
                return (
                  <PostNewestItem key={item.id} data={item}></PostNewestItem>
                );
              })}
            </div>
          ) : (
            <div className="wrap-similar">
              <PostItem categoryId={postInfo?.category?.id}> </PostItem>
            </div>
          )}
        </div>
      </CategoryWriteStyle>
    </>
  );
}
