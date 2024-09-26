import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const NotFoundPageStyles = styled.div`
  color: #fff;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #000;
  .heading {
    font-weight: 600;
    font-size: 48px;
    color: red;
    margin-bottom: 40px;
  }

  .logo {
    filter: drop-shadow(2px 4px 10px red);
    max-width: 150px;
    margin-bottom: 40px;
  }

  .back {
    text-decoration: none;
    border-radius: 10px;
    color: #fff;
    background-color: ${(props) => props.theme.primary};
    padding: 20px 40px;
    font-weight: bold;
  }

  .description {
    max-width: 800px;
    margin: 0 auto 40px;
    text-align: center;
  }
`;

export default function NotFoundPage() {
  return (
    <NotFoundPageStyles>
      <NavLink to={"/"}>
        <img
          srcSet="https://mof.bus.ku.ac.th/th/images/img_404.png"
          alt="House-cat"
          className="logo"
        />
      </NavLink>
      <h1 className="heading">Opps! Page not Found</h1>
      <p className="description">
        Maybe this page used to exist or you just spelled something wrong.
        Chances are your spelled something wrong, so can you double check the
        URL?
      </p>
      <NavLink to={"/"} className={"back"}>
        <span>Back to Home</span>
      </NavLink>
    </NotFoundPageStyles>
  );
}
