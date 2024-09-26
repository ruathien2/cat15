import React from "react";
import styled from "styled-components";

const ToolStyles = styled.div`
  .tool {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    gap: 20px;
  }

  .tool_nav {
    width: 80px;
    text-align: center;
    background-color: #f3edff;
    color: #6b6b6b;
    padding: 5px 10px;
    font-size: 12px;
    border-radius: 8px;
  }

  .date-author {
    right: 10px;
    color: #6b6b6b;
    font-size: 12px;
  }

  .desc {
    color: #6b6b6b;
  }

  .author {
    position: relative;
    margin-left: 10px;
    padding-left: 15px;
  }
  .author::before {
    position: absolute;
    content: "";
    width: 5px;
    height: 5px;
    background-color: #6b6b6b;
    border-radius: 100%;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }
`;

export default function Tool() {
  return (
    <ToolStyles>
      <div className="tool">
        <span className="tool_nav">Kiến thức</span>
        <div className="desc">
          Hướng dẫn setup phòng cực chill dành cho người mới toàn tập
        </div>
        <div className="date-author h-[50px]">
          <span className="date">Mar 23</span>
          <span className="author">Andiez Le</span>
        </div>
      </div>
    </ToolStyles>
  );
}
