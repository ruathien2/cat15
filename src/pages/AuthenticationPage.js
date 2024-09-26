import React, { Children } from "react";
import styled from "styled-components";

const AuthenticationPageStyles = styled.div`
  max-height: 100vh;
  display: flex;
  justify-content: center;

  .wrap {
    display: flex;
    border: 1px solid rgba(255, 167, 51, 0.5);
    width: 100%;
    padding: 40px 40px 40px 0px;
    border-radius: 1rem;
    box-shadow: rgba(255, 167, 51, 0.4) -5px 5px,
      rgba(255, 167, 51, 0.3) -10px 10px, rgba(255, 167, 51, 0.2) -15px 15px,
      rgba(255, 167, 51, 0.1) -20px 20px, rgba(255, 167, 51, 0.05) -25px 25px;
  }
  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px;
    width: 50%;
  }
  .logo {
    display: block;
    margin: 0 auto;
    margin-bottom: 20px;
    filter: drop-shadow(2px 4px 6px ${(props) => props.theme.primary});
  }
  .heading {
    text-align: center;
    color: ${(props) => props.theme.primary};
    font-weight: 600;
    font-size: 28px;
    margin-bottom: 80px;
    filter: drop-shadow(1px 1px 1px rgb(255, 167, 51));
  }

  .form {
    max-width: 600px;
    margin: 0 auto;
    width: 100%;
    padding: 30px;
    border-left: 1px solid rgba(46, 186, 193, 0.2);
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .errors-validation {
    color: red;
    font-size: 12px;
  }
  @media screen and (max-width: 800px) {
    .wrapper {
      width: 100%;
    }
    .heading {
    }
  }
`;

export default function AuthenticationPage({ children }) {
  return (
    <AuthenticationPageStyles>
      <div className="container">
        <div className="wrap">
          <div className="wrapper">
            <img
              srcSet="./notfound.png"
              alt="monkey-blogging"
              className="logo"
            />
            <h1 className="heading">House's Cat</h1>
          </div>
          {children}
        </div>
      </div>
    </AuthenticationPageStyles>
  );
}
