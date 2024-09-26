import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/authContext";
import { NavLink, useNavigate } from "react-router-dom";
import AuthenticationPage from "./AuthenticationPage";
import { Field } from "../components/field";
import { Label } from "../components/label";
import Input from "../components/input/Input";
import { useForm } from "react-hook-form";
import { Button } from "../components/button";
import { IconEyeClose, IconEyeOpen } from "../components/icon";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-app/firebaseConfig";
import { toast } from "react-toastify";
import styled from "styled-components";

const getCharacterValidationError = (string) => {
  return `Your password must have at least 1 ${string} character`;
};

const schemaValidation = yup.object({
  email: yup.string().email().required("Please enter your email"),
  password: yup
    .string()
    .required("Please enter a password")
    // check minimum characters
    .min(8, "Password must have at least 8 characters")
    // different error messages for different requirements
    .matches(/[0-9]/, getCharacterValidationError("digit"))
    .matches(/[a-z]/, getCharacterValidationError("lowercase"))
    .matches(/[A-Z]/, getCharacterValidationError("uppercase")),
});

const SignInPageStyle = styled.div`
  margin-bottom: 0;
  @media screen and (max-width: 800px) {
    font-size: 14px;
    .wrap {
      display: flex;
      flex-direction: column;
      padding: 0;
      box-shadow: none;
      border: none;
    }

    .wrapper {
      width: 100%;
      padding: 0;
    }
    .logo {
      width: 30%;
    }
  }
`;

export default function SignInPage() {
  const { userInfo, setUserInfo } = useAuth();
  const [togglePassword, setTogglePassword] = useState(false);
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schemaValidation),
  });

  const handleSignIn = async (e) => {
    if (!isValid) return;
    await signInWithEmailAndPassword(auth, e.email, e.password);
    navigate("/");
    toast.success("Sign In Success");
  };

  useEffect(() => {
    if (!userInfo?.email) {
      navigate("/sign-in");
    } else {
      navigate("/");
    }

    document.title = "Sign In Page";
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <SignInPageStyle>
      <AuthenticationPage>
        <form
          autoComplete="off"
          className="form"
          onSubmit={handleSubmit(handleSignIn)}
        >
          <Field>
            <Label htmlFor="fullname">Email</Label>
            <Input
              control={control}
              name={"email"}
              type={"text"}
              placeholder={"Nhập Vào Email Của Bạn"}
              className={"input"}
            ></Input>
            <p className="errors-validation">{errors.email?.message}</p>
          </Field>
          <Field>
            <Label htmlFor="fullname">Mật Khẩu</Label>
            <Input
              control={control}
              name={"password"}
              type={togglePassword ? "text" : "password"}
              placeholder={"Nhập Vào Mật Khẩu Của Bạn"}
              className={"input"}
            >
              {togglePassword ? (
                <IconEyeOpen
                  onClick={() => setTogglePassword(false)}
                ></IconEyeOpen>
              ) : (
                <IconEyeClose
                  onClick={() => setTogglePassword(true)}
                ></IconEyeClose>
              )}
            </Input>
            <p className="errors-validation">{errors.password?.message}</p>
          </Field>
          <span className="mb-4">
            Bạn Chưa Có Tài Khoản ?
            <NavLink to="/sign-up">
              <span className="text-orange-400 "> Đăng Ký</span>
            </NavLink>
          </span>
          <Button
            kind="primary"
            type="submit"
            style={{ maxWidth: "300px", width: "300px" }}
            isLoading={isSubmitting}
            disabled={isSubmitting}
          >
            Đăng Nhập
          </Button>
        </form>
      </AuthenticationPage>
    </SignInPageStyle>
  );
}
