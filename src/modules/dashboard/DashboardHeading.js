import React from "react";
import styled from "styled-components";

const DashboardHeaderStyles = styled.div`
  margin-bottom: 10px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

export default function DashboardHeading({ title, desc, children, ...props }) {
  return (
    <DashboardHeaderStyles>
      <div className={props.className}>
        <h1 className="dashboard-heading">{title}</h1>
        <p className="dashboard-short-desc">{desc}</p>
      </div>
      {children}
    </DashboardHeaderStyles>
  );
}
