import styled from "styled-components";
import { Label } from "../label";
import { Field } from "../field";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase-app/firebaseConfig";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import { userRole } from "../../untils/constant";

const DropDownStyles = styled.div`
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
    z-index: 10;
  }

  .dropdown-item {
    /* padding: 10px; */
  }
  .dropdown-item:not(:last-child) {
    border-bottom: 1px solid #ccc;
  }
  .menu-item {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 12px 20px;
    font-weight: 500;
    color: #000;
    cursor: pointer;
    &.active,
    &:hover {
      background: #f1fbf7;
      color: ${(props) => props.theme.primary};
    }
  }
  .menu-text {
    font-size: 13px;
  }
  @media only screen and (max-width: 800px) {
    .dropdown {
      position: absolute;
      background-color: red;
      border-radius: 10px;
      color: #01acbb;
      background-color: red;
      box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
      padding: 10px;
      z-index: 10;
    }
  }
`;

export default function DropDown() {
  const sidebarLinks = [
    {},
    {
      title: "Bài Viết",
      url: "/manage/posts",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      ),
    },
    {
      title: "Thể Loại",
      url: "/manage/category",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
          />
        </svg>
      ),
    },
    {
      title: "Người Dùng",
      url: "/manage/user",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
    },
    {
      title: "Đăng Xuất",
      url: "/",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          />
        </svg>
      ),
      onClick: () => signOut(auth),
    },
  ];

  const sidebarLinksUser = [
    {},
    {
      title: "Bài Viết",
      url: "/manage/add-posts",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      ),
    },
    {
      title: "Người Dùng",
      url: "/manage/user",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
    },
    {
      title: "Đăng Xuất",
      url: "/",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          />
        </svg>
      ),
      onClick: () => signOut(auth),
    },
  ];

  const { userInfo } = useAuth();
  return (
    <DropDownStyles>
      <div className="dropdown">
        {Number(userInfo.role) === userRole.ADMIN &&
          sidebarLinks.map((link, index) => {
            if (link.onClick)
              return (
                <div className="menu-item" onClick={link.onClick} key={index}>
                  <span className="menu-icon">{link.icon}</span>
                  <span className="menu-text">{link.title}</span>
                </div>
              );
            return (
              <NavLink to={link.url} className="menu-item" key={link.title}>
                <span className="menu-icon">{link.icon}</span>
                <span className="menu-text">{link.title}</span>
              </NavLink>
            );
          })}
        {userInfo.role === userRole.USER &&
          sidebarLinksUser.map((link) => {
            if (link.onClick)
              return (
                <div
                  className="menu-item"
                  onClick={link.onClick}
                  key={link.title}
                >
                  <span className="menu-icon">{link.icon}</span>
                  <span className="menu-text">{link.title}</span>
                </div>
              );
            return (
              <NavLink to={link.url} className="menu-item" key={link.title}>
                <span className="menu-icon">{link.icon}</span>
                <span className="menu-text">{link.title}</span>
              </NavLink>
            );
          })}
      </div>
    </DropDownStyles>
  );
}
