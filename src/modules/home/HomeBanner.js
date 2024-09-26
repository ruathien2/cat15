import React from "react";
import styled from "styled-components";
import { Button } from "../../components/button";
import { useAuth } from "../../contexts/authContext";

const HomeBannerStyles = styled.div`
  height: 100%;
  margin-bottom: 40px;
  .banner {
    height: 100%;
    margin-top: 40px;
    border-radius: 10px;
    /* background-image: linear-gradient(0deg, #c89cf247 0%, #ffa733 90%); */
    background-color: #ffa733;

    padding: 40px;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    color: #fff;
    &-content {
      width: 100%;
    }
    &-heading {
      font-size: 32px;
      margin-bottom: 40px;
    }
    &-desc {
      line-height: 1.5;
      width: 70%;
      margin-bottom: 40px;
      text-align: justify;
    }
    &-img {
    }
  }

  .logo {
    filter: drop-shadow(2px 4px 10px #fff);
  }

  /* .banner-content {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  } */

  @media only screen and (max-width: 800px) {
    margin-top: 100px;
    font-size: 14px;
    .banner {
      display: flex;
      flex-direction: column;
    }
    .banner-desc {
      text-align: justify;
      width: 100%;
    }
    .banner-content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .logo {
      display: none;
      width: 50%;
    }
    .banner-img {
      display: flex;
      justify-content: center;
    }
  }
  /* @media only screen and (min-width: 914.98px) {
    
      align-items: center;
    }
    .wrap {
    }
    @media only screen and (min-width: 1023.98px) {
      display: flex;
      flex-direction: row;
      .logo {
        display: block;
      }
      .right,
      .left {
        width: 50%;
      }
    }
  } */
`;

export default function HomeBanner() {
  const { userInfo } = useAuth();
  return (
    <HomeBannerStyles>
      <div className="container-wrap">
        <div className="banner">
          <div className="banner-content">
            <h1 className="banner-heading">
              <strong>House's Cat</strong>
            </h1>
            <p className="banner-desc">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi.
            </p>
            <Button kind="secondary" type="button" to="/sign-up">
              <span className="p-3 text-orange-500 bg-white rounded-lg">
                Get Started
              </span>
            </Button>
          </div>
          <div className="banner-img">
            <img alt="" srcSet="./logomeow.png" className="logo" />
          </div>
        </div>
      </div>
    </HomeBannerStyles>
  );
}
