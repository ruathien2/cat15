import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../../components/button";
import { useAuth } from "../../contexts/authContext";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase-app/firebaseConfig";

const DashboardHeaderStyles = styled.div`
  background-color: white;
  padding: 10px 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  gap: 20px;
  .logo {
    display: flex;
    align-items: center;
    gap: 20px;
    font-size: 18px;
    font-weight: 600;
    img {
      max-width: 40px;
    }
  }
  .header-avatar {
    width: 52px;
    height: 52px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 100rem;
    }
  }
  .header-right {
    display: flex;
    align-items: center;
    gap: 20px;
  }
`;

export default function DashboardHeader() {
  const { userInfo } = useAuth();

  if (!userInfo.uid) return null;
  return (
    <DashboardHeaderStyles>
      <NavLink to="/" className="logo">
        <img srcSet="../notfound.png" alt="house-cat" className="logo" />
        <span className="hidden lg:inline-block">House's Cat</span>
      </NavLink>
      <div className="header-right">
        <Button
          kind="primary"
          type="button"
          to="/manage/add-posts"
          className="header-button"
          height="52px"
        >
          Tạo Bài Viết
        </Button>
        <Link to="/profile" className="header-avatar">
          <img srcSet={userInfo?.avatar} alt="" />
        </Link>
      </div>
    </DashboardHeaderStyles>
  );
}
