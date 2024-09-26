import React from "react";
import { useController } from "react-hook-form";
import styled from "styled-components";
import PropTypes from "prop-types";

const InputStyles = styled.div`
  position: relative;
  max-width: 800px;
  width: 100%;
  .input {
    outline: none;
    border: transparent;
    padding: 16px 40px 16px 16px;
    width: 100%;
    border-radius: 8px;
    transition: all 0.2s linear;
    background-color: ${(props) => props.theme.grayLight};
  }

  .input:focus {
    border: 1px solid ${(props) => props.theme.primary};
    color: #6dbfb8;
    background-color: #fff;
  }

  .input::-webkit-input-placeholder {
    color: #84878b;
  }
  .input::-moz-placeholder {
    color: #84878b;
  }

  .input-icon {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    cursor: pointer;
  }
`;
/**
 * @param {string} placeholder --placeholder of input type === text
 * @param {*} children
 * @requires
 * @param {string} name -- props name for id and name of input
 * @param {*} control -- control of react-hook-form in useController
 * @param {string} type -- Type of input "text" | "checkbox" | "radio" | "password" | "email"
 * @returns
 */

export default function Input({
  name = "",
  type = "text",
  placeholder,
  control,
  children,
  ...props
}) {
  const { field } = useController({
    name,
    control,
    defaultValue: "",
  });
  return (
    <InputStyles>
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        {...field}
        {...props}
      />
      {children ? <div className="input-icon">{children}</div> : null}
    </InputStyles>
  );
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["text", "checkbox", "radio", "password", "email"])
    .isRequired,
  placeholder: PropTypes.string,
  children: PropTypes.node,
};
