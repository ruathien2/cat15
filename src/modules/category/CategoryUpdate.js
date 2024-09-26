import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Field } from "../../components/field";
import { Label } from "../../components/label";
import { useForm } from "react-hook-form";
import DashboardHeading from "../dashboard/DashboardHeading";
import Input from "../../components/input/Input";
import Radio from "../../components/check-box/Radio";
import { categoryStatus } from "../../untils/constant";
import { Button } from "../../components/button";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase-app/firebaseConfig";
import slugify from "slugify";
import { toast } from "react-toastify";

export default function CategoryUpdate() {
  const { control, handleSubmit, watch, reset } = useForm({
    mode: "onChange",
    defaultValues: {},
  });
  const [params] = useSearchParams();
  const idCategory = params.get("id");

  const watchStatus = watch("status");

  const navigate = useNavigate();

  const handleUpdateCategory = async (values) => {
    const colRef = doc(db, "categories", idCategory);
    await updateDoc(colRef, {
      name: values.name,
      slug: slugify(values.name || values.slug, { lower: true }),
      status: Number(values.status),
    });
    // toast.success("Update successfully");
    navigate("/manage/category");
  };

  useEffect(() => {
    async function fetchData() {
      const colRef = doc(db, "categories", idCategory);
      const dataCategory = await getDoc(colRef);
      reset(dataCategory.data());
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="flex flex-col gap-[50px]">
      <DashboardHeading
        title="Cập Nhật Thể Loại"
        desc={`Cập Nhật Thể Loại id: ${idCategory}`}
      ></DashboardHeading>
      <form onSubmit={handleSubmit(handleUpdateCategory)}>
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
  );
}
