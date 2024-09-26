import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { IconSearch } from "../icon";
import { Button } from "../button";
import { useAuth } from "../../contexts/authContext";
import DropDown from "../dropdown/DropDown";
import useShow from "../../hooks/useShow";

const HeaderStyles = styled.div`
  padding: 5px;
  height: 100%;
  width: 100%;
  /* background-image: linear-gradient(0deg, #c89cf247 0%, #ffa733 90%); */
  background-color: #ffa733;
  margin-bottom: 40px;

  .header-main {
    display: flex;
    align-items: center;
  }

  .logo {
    max-width: 60px;
    display: block;
    filter: drop-shadow(2px 4px 10px #fff);
  }

  .menu {
    display: flex;
    gap: 20px;
    margin-left: 40px;
  }

  a {
    text-decoration: none;
    color: inherit;
    font-weight: 500;
    font-size: 16px;
    color: #fff;
  }

  .header-right {
    margin-left: auto;
    display: flex;
    align-items: center;
  }

  .search {
    position: relative;
    display: flex;
    align-items: center;
  }

  .search-input {
    font-size: 12px;
    position: relative;
    padding: 10px 40px 10px 10px;
    border-radius: 8px;
    border: none;
    outline: none;
    transition: all 0.5s linear;
  }

  .search-input:focus {
    width: 500px;
    border: 1px solid ${(props) => props.theme.primary};
    color: #6dbfb8;
    animation: width 2s;
    padding: 10px 40px 10px 20px;
  }

  .search-input::-webkit-input-placeholder {
    color: #84878b;
  }
  .search-input::-moz-placeholder {
    color: #84878b;
  }

  @keyframes width {
    from {
      width: 100%;
    }
    to {
      width: 500px;
    }
  }

  .search-icon {
    position: absolute;
    right: 10px;
    cursor: pointer;
  }

  .btn-sign {
    max-width: 350px;
    width: 100px;
    padding: 10px 20px;
    margin-left: 20px;
    background-color: #fff;
    border: 1px solid ${(props) => props.theme.primary};

    color: ${(props) => props.theme.primary};
    font-weight: 600;
  }

  .btn-sign:hover {
    background-color: pink;
    transition: all 0.2s linear;
    color: #fff;
  }

  .header-auth {
    font-size: 14px;
    margin-left: 20px;
    color: #fff;
    padding-right: 20px;
  }

  /* .header-auth::before {
    content: "";
    position: absolute;
    border-top: 5px solid #fff;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 5px transparent;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  } */

  .wrap {
    position: relative;
  }

  .dropdown {
    position: absolute;
    top: 150%;
    right: 0;
    background-color: #fff;
    width: 200px;
    border-radius: 10px;
    color: #01acbb;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    padding: 10px;
  }

  .dropdown-item {
    padding: 10px;
  }
  .dropdown-item:not(:last-child) {
    border-bottom: 1px solid #ccc;
  }

  @media only screen and (max-width: 800px) {
    position: fixed;
    top: 0;
    height: 70px;
    z-index: 10;
    .account {
      display: none;
    }
    .menu-item:first-child {
      display: none;
    }
  }
`;

const menuLink = [
  {
    url: "/#",
    title: "Trang Chủ",
  },
  {
    url: "/category-write/all",
    title: "Bài Viết",
  },
  // {
  //   url: "/contact",
  //   title: "Contact",
  // },
];

export default function Header() {
  const { userInfo } = useAuth();
  const { showDrop, handleShowDrop } = useShow();
  return (
    <HeaderStyles>
      <div className="container-wrap">
        <div className="header-main">
          <NavLink to={"/"}>
            <img srcSet="../notfound.png" alt="house-cat" className="logo" />
          </NavLink>
          <ul className="menu">
            {menuLink.map((item, index) => {
              return (
                <li className="menu-item" key={index}>
                  <NavLink to={item.url}>{item.title}</NavLink>
                </li>
              );
            })}
          </ul>
          <div className="header-right">
            <div className="search">
              {/* <input className="search-input" placeholder="Search posts..." /> */}
              <span className="search-icon">
                <IconSearch></IconSearch>
              </span>
            </div>
            {userInfo ? (
              <div className="wrap">
                <span
                  className="flex flex-row gap-5 cursor-pointer header-auth"
                  onClick={handleShowDrop}
                >
                  <strong className="account">
                    Chào mừng trở lại, {userInfo?.displayName}
                  </strong>
                  {!showDrop ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="font-bold cursor-pointer size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m19.5 8.25-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="font-bold cursor-pointer size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m4.5 15.75 7.5-7.5 7.5 7.5"
                      />
                    </svg>
                  )}
                </span>
                {showDrop ? <DropDown></DropDown> : ""}
              </div>
            ) : (
              <Button to="/sign-in" type="button" className={"btn-sign"}>
                Sign In
              </Button>
            )}
          </div>
        </div>
      </div>
    </HeaderStyles>
  );
}
