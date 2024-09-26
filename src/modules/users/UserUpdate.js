import React, { useEffect, useState } from "react";
import DashboardHeading from "../dashboard/DashboardHeading";
import { Field } from "../../components/field";
import { Label } from "../../components/label";
import Input from "../../components/input/Input";
import { useForm } from "react-hook-form";
import { Button } from "../../components/button";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import ImageUpload from "../../components/image/ImageUpload";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase-app/firebaseConfig";
import useFirebaseImage from "../../hooks/useFirebaseImage";
import { toast } from "react-toastify";
import Radio from "../../components/check-box/Radio";
import { userRole, userStatus } from "../../untils/constant";
import TextArea from "../../components/textarea/Textarea";
import slugify from "slugify";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styled from "styled-components";
import { useAuth } from "../../contexts/authContext";

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

const UserUpdateStyle = styled.div`
  @media only screen and (max-width: 800px) {
    font-size: 14px;
  }
`;

export default function UserUpdate() {
  const {
    control,
    handleSubmit,
    reset,
    getValues,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schemaValidation),
  });
  const [params] = useSearchParams();

  const navigate = useNavigate();

  const watchStatus = watch("status");
  const watchRole = watch("role");

  const imageUrl = getValues("avatar");

  const idUser = params.get("id");

  const imageRegex = /%2F(\S+)\?/gm.exec(imageUrl); //name img
  const imageName = imageRegex ? imageRegex[1] : "";
  console.log(imageName);

  const {
    image,
    setImage,
    progress,
    setProrgess,
    handleDeleteImage,
    handleUploadImage,
    onSelectImage,
  } = useFirebaseImage(setValue, getValues, imageName, deleteAvatar);

  const handleUpdateUser = async (values) => {
    if (!isValid) return;
    const cloneValues = { ...values };
    cloneValues.status = Number(values.status);
    cloneValues.role = Number(values.role);
    cloneValues.userName = slugify(values.fullname || values.userName);
    try {
      const colRef = doc(db, "users", idUser);
      await updateDoc(colRef, {
        ...values,
        avatar: image,
      });
      navigate("/manage/user");
      toast.success("Update success");
    } catch (error) {
      toast.error("Update fail");
    }
  };

  async function deleteAvatar() {
    const colRef = doc(db, "users", idUser);
    await updateDoc(colRef, {
      avatar: "",
    });
  }

  useEffect(() => {
    setImage(imageUrl);
  }, [imageUrl, setImage]);

  useEffect(() => {
    async function fetchData() {
      const colRef = doc(db, "users", idUser);
      const dataCategory = await getDoc(colRef);
      reset(dataCategory.data());
    }
    fetchData();
  }, [idUser, reset]);
  const { userInfo } = useAuth();
  return (
    <UserUpdateStyle>
      <DashboardHeading
        title="Account information"
        desc="Update your account information"
      ></DashboardHeading>
      <form className="flex flex-col" onSubmit={handleSubmit(handleUpdateUser)}>
        <div className="w-full h-[200px] mx-auto rounded-full mb-10">
          <ImageUpload
            onChange={onSelectImage}
            className="!rounded-full h-full"
            handleDeleteImage={handleDeleteImage}
            // progress={progress}
            image={image}
          ></ImageUpload>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Họ và Tên</Label>
            <Input
              type="text"
              name="fullname"
              placeholder="Nhập Vào Họ và Tên"
              control={control}
              className={"input"}
            ></Input>
            <p className="errors-validation">{errors.fullname?.message}</p>
          </Field>
          <Field>
            <Label>Tên Người Dùng</Label>
            <Input
              type="text"
              name="username"
              placeholder="Nhập Vào Tên Người Dùng"
              control={control}
              className={"input"}
            ></Input>
            <p className="errors-validation">{errors.username?.message}</p>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Email</Label>
            <Input
              name="email"
              placeholder="Nhập Vào Email"
              control={control}
              type="email"
              className={"input"}
            ></Input>
            <p className="errors-validation">{errors.email?.message}</p>
          </Field>
          <Field>
            <Label>Mật Khẩu</Label>
            <Input
              name="password"
              placeholder="Nhập Vào Mật Khẩu"
              control={control}
              type="password"
              className={"input"}
            ></Input>
            <p className="errors-validation">{errors.password?.message}</p>
          </Field>
        </div>
        {Number(userInfo?.role) === Number(userRole.ADMIN) && (
          <div className="form-layout">
            <Field>
              <Label>Trạng Thái</Label>
              <div className="flex flex-wrap gap-5">
                <Radio
                  name="status"
                  control={control}
                  checked={Number(watchStatus) === userStatus.ACTIVE}
                  value={userStatus.ACTIVE}
                >
                  Hoạt Động
                </Radio>
                <Radio
                  name="status"
                  control={control}
                  checked={Number(watchStatus) === userStatus.PENDING}
                  value={userStatus.PENDING}
                >
                  Chờ
                </Radio>
                <Radio
                  name="status"
                  control={control}
                  checked={Number(watchStatus) === userStatus.BAN}
                  value={userStatus.BAN}
                >
                  Bị Cấm
                </Radio>
              </div>
            </Field>
            <Field>
              <Label>Quyền</Label>
              <div className="flex flex-wrap gap-5">
                <Radio
                  name="role"
                  control={control}
                  checked={Number(watchRole) === userRole.ADMIN}
                  value={userRole.ADMIN}
                >
                  Quản Trị
                </Radio>
                <Radio
                  name="role"
                  control={control}
                  checked={Number(watchRole) === userRole.MOD}
                  value={userRole.MOD}
                >
                  Người Điều Hành
                </Radio>
                <Radio
                  name="role"
                  control={control}
                  checked={Number(watchRole) === userRole.USER}
                  value={userRole.USER}
                >
                  Người Dùng
                </Radio>
              </div>
            </Field>
          </div>
        )}
        <Label>Giới Thiệu</Label>
        <TextArea
          control={control}
          name="description"
          placeholder="Giới Thiệu Bản Thân (Không Bắt Buộc)"
          className="input"
        ></TextArea>
        <br />
        <Button
          kind="primary"
          type="submit"
          className="mx-auto w-[200px]"
          // isLoading={isSubmitting}
          // disabled={isSubmitting}
        >
          Cập Nhật
        </Button>
      </form>
    </UserUpdateStyle>
  );
}
