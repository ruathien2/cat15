import React from "react";
import { useForm } from "react-hook-form";
import DashboardHeading from "../dashboard/DashboardHeading";
import { Field } from "../../components/field";
import { Label } from "../../components/label";
import Input from "../../components/input/Input";
import Radio from "../../components/check-box/Radio";
import { Button } from "../../components/button";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase-app/firebaseConfig";
import { categoryStatus } from "../../untils/constant";
import slugify from "slugify";
import { toast } from "react-toastify";
import styled from "styled-components";

const CategoryAddNewStyle = styled.div`
  @media only screen and (max-width: 800px) {
    font-size: 14px;
  }
`;

const CategoryAddNew = () => {
  const {
    control,
    setValue,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    mode: "onChange",
  });

  const watchStatus = watch("status");

  const handleAddCategory = async (values) => {
    try {
      const docRef = await addDoc(collection(db, "categories"), {
        name: values.name,
        slug:
          slugify(values.name, { lower: true }) ||
          slugify(values.slug, { lower: true }),
        status: 1,
      });
      toast.success("Add category successfully");
    } catch (error) {
      toast.error("Add category fail");
      console.log(error);
    }
  };

  return (
    <CategoryAddNewStyle>
      <div className="flex flex-col gap-[50px]">
        <DashboardHeading
          title="Tạo Thể Loại Mới"
          desc="Thêm mới "
        ></DashboardHeading>
        <form onSubmit={handleSubmit(handleAddCategory)}>
          <div className="grid grid-cols-2 gap-5 form-layout">
            <Field>
              <Label>Tên Thể Loại</Label>
              <Input
                type="text"
                control={control}
                name="name"
                placeholder="Nhập Vào Tên Thể Loại"
                className={"input"}
              ></Input>
            </Field>
            <Field>
              <Label>Đường Dẫn</Label>
              <Input
                type="text"
                control={control}
                name="slug"
                placeholder="Nhập Vào Đường Dẫn (Không Bắt Buộc)"
                className={"input"}
              ></Input>
            </Field>
          </div>
          <div className="form-layout">
            <Field>
              <Label>Status</Label>
              <div className="flex flex-wrap gap-x-5">
                <Radio
                  name="status"
                  control={control}
                  checked={categoryStatus.APPROVED === Number(watchStatus)}
                  value={categoryStatus.APPROVED}
                >
                  Chấp Nhận
                </Radio>
                <Radio
                  name="status"
                  control={control}
                  checked={categoryStatus.UNAPPROVED === Number(watchStatus)}
                  value={categoryStatus.UNAPPROVED}
                >
                  Không Chấp Nhận
                </Radio>
              </div>
            </Field>
          </div>
          <Button kind="primary" type="submit" className="mx-auto">
            Add new category
          </Button>
        </form>
      </div>
    </CategoryAddNewStyle>
  );
};

export default CategoryAddNew;
