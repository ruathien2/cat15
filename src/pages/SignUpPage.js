import React, { useEffect, useState } from "react";
import { Label } from "../components/label";
import Input from "../components/input/Input";
import { useForm } from "react-hook-form";
import { IconEyeClose, IconEyeOpen } from "../components/icon";
import { Field } from "../components/field";
import { Button } from "../components/button";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Bounce, toast } from "react-toastify";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase-app/firebaseConfig";
import { NavLink, useNavigate } from "react-router-dom";
import { addDoc, collection, doc, setDoc, Timestamp } from "firebase/firestore";
import AuthenticationPage from "./AuthenticationPage";
import slugify from "slugify";
import styled from "styled-components";

const getCharacterValidationError = (string) => {
  return `Your password must have at least 1 ${string} character`;
};

const schemaValidation = yup.object({
  fullname: yup.string().required("Please enter your fullname"),
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

const SignUpPageStyle = styled.div`
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
    .heading {
      margin-bottom: 0;
    }
  }
`;

export default function SignUpPage() {
  const [togglePassword, setTogglePassword] = useState(false);
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    watch,
  } = useForm({ mode: "onChange", resolver: yupResolver(schemaValidation) });

  const handleSignUp = async (e) => {
    if (!isValid) return;
    try {
      await createUserWithEmailAndPassword(auth, e.email, e.password);
      await updateProfile(auth.currentUser, {
        //create user
        displayName: e.fullname,
        photoURL:
          "https://th.bing.com/th/id/OIP.kxT5HIWQVJKRtE1tU_mpDwHaHa?rs=1&pid=ImgDetMain",
      });
      const colRef = collection(db, "users");
      await setDoc(doc(colRef, auth.currentUser.uid), {
        fullname: e.fullname,
        email: e.email,
        password: e.password,
        userName: slugify(e.fullname, { lower: true }),
        avatar:
          "https://th.bing.com/th/id/OIP.kxT5HIWQVJKRtE1tU_mpDwHaHa?rs=1&pid=ImgDetMain",
        status: 1,
        role: 3,
        created: Timestamp.now(),
      });
      // await addDoc(colRef, {
      //   fullname: e.fullname,
      //   email: e.email,
      //   password: e.password,
      //   created: Timestamp.now(),
      // });
      toast.success("Create Register Success");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // const arrErroes = Object.values(errors);
    // if (arrErroes.length > 0) {
    //   toast.error(arrErroes[0]?.message, {
    //     position: "bottom-right",
    //     autoClose: 3000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "colored",
    //     transition: Bounce,
    //     pauseOnHover: false,
    //   });
    // }
    document.title = "Register Page";
  }, [errors]);

  return (
    <SignUpPageStyle>
      <AuthenticationPage>
        <form
          autoComplete="off"
          className="form"
          onSubmit={handleSubmit(handleSignUp)}
        >
          <Field>
            <Label htmlFor="fullname">Họ và Tên</Label>
            <Input
              control={control}
              name={"fullname"}
              type={"text"}
              placeholder={"Nhập Vào Họ và Tên Của Bạn"}
              className={"input"}
            ></Input>
            <p className="errors-validation">{errors.fullname?.message}</p>
          </Field>
          <Field>
            <Label htmlFor="email">Địa Chỉ Email</Label>
            <Input
              control={control}
              name={"email"}
              type={"email"}
              placeholder={"Nhập Vào Email Của Bạn"}
              className={"input"}
            ></Input>
            <p className="errors-validation">{errors.email?.message}</p>
          </Field>
          <Field>
            <Label htmlFor="password">Mật Khẩu</Label>
            <Input
              control={control}
              name={"password"}
              type={togglePassword ? "text" : "password"}
              placeholder={"Nhập vào Mật Khẩu Của Bạn"}
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
            Bạn Đã Có Tài Khoản ?
            <NavLink to="/sign-in">
              <span className="text-orange-400 "> Đăng Nhập</span>
            </NavLink>
          </span>
          <Button
            kind="primary"
            type="submit"
            style={{ maxWidth: "300px", width: "300px" }}
            isLoading={isSubmitting}
            disabled={isSubmitting}
          >
            Register Account
          </Button>
        </form>
      </AuthenticationPage>
    </SignUpPageStyle>
  );
}
