import React, { Children } from "react";
import styled, { css } from "styled-components";
import { Loading } from "../loading";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const ButtonStyles = styled.button`
  cursor: pointer;
  padding: 20px;
  line-height: 1;
  margin: auto;
  color: #fff;
  background-color: #ffa733;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }

  @media only screen and (max-width: 800px) {
    font-size: 12px;
    font-weight: 500;
    padding: 20px 10px;
  }
`;
/**
 * @param {*} onClick -- Handler onClick
 * @param {boolean} isLoading -- loading button
 * @requires
 * @param {string} type Type of Button 'button' | 'submit'
 * @returns
 */

export default function Button({
  type = "button",
  children,

  onClick = () => {},
  ...props
}) {
  const { isLoading, to, kind = "secondary" } = props;
  const child = !!isLoading ? <Loading></Loading> : children;

  if (to !== "" && typeof to === "string") {
    return (
      <NavLink to={to}>
        <ButtonStyles type={type} onClick={onClick} kind={kind} {...props}>
          {child}
        </ButtonStyles>
      </NavLink>
    );
  }

  return (
    <ButtonStyles type={type} onClick={onClick} kind={kind} {...props}>
      {child}
    </ButtonStyles>
  );
}

Button.propTypes = {
  type: PropTypes.oneOf(["button", "submit"]).isRequired,
  isLoading: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node,
};
