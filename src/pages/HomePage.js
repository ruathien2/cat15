import React from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase-app/firebaseConfig";
import styled from "styled-components";
import { Layout } from "../components/layout";
import { HomeBanner, HomeFeature } from "../modules/home";
import HomeFeatureList from "../modules/home/HomeFeatureList";

const HomeStyles = styled.div``;

export default function HomePage() {
  const navigate = useNavigate();
  const handleSignOut = async () => {
    await signOut(auth);
  };
  return (
    <div>
      <Layout>
        <HomeBanner></HomeBanner>
        <HomeFeatureList></HomeFeatureList>
      </Layout>
    </div>
  );
}
