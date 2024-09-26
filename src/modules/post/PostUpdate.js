import React, { useEffect, useMemo, useState } from "react";
import DashboardHeading from "../dashboard/DashboardHeading";
import { Field } from "../../components/field";
import { Label } from "../../components/label";
import ImageUpload from "../../components/image/ImageUpload";
import DropDownInput from "../../components/dropdown/DropDownInput";
import DropDownSelect from "../../components/dropdown/DropDownSelect";
import DropDownList from "../../components/dropdown/DropDownList";
import DropDownOption from "../../components/dropdown/DropDownOption";
import Category from "./category/Category";
import Input from "../../components/input/Input";
import Radio from "../../components/check-box/Radio";
import Toggle from "../../components/toggle/Toggle";
import { Button } from "../../components/button";
import { useForm } from "react-hook-form";
import useShow from "../../hooks/useShow";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import useFirebaseImage from "../../hooks/useFirebaseImage";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../../firebase-app/firebaseConfig";
import { postStatus, userRole } from "../../untils/constant";
import slugify from "slugify";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageUploader from "quill-image-uploader";
import axios from "axios";
import { imgbbAPI } from "../../untils/apiConfig";
import styled from "styled-components";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "../../contexts/authContext";
Quill.register("modules/imageUploader", ImageUploader);

const schemaValidation = yup.object({
  image: yup.mixed().required("Please enter your image"),

  title: yup.string().required("Please enter your title for write's"),
});

const PostUpdateStyle = styled.div`
  @media only screen and (max-width: 800px) {
    font-size: 14px;
    .list {
      display: flex;
      flex-direction: column;
    }
  }
`;

export default function PostUpdate() {
  const [params] = useSearchParams();
  const postId = params.get("id");
  const { show, setShow } = useShow();
  const [content, setContent] = useState("");
  const [selectCategory, setSelectCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const {
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    getValues,
    formState: { isValid, isSubmitting, errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schemaValidation),
  });

  const imageUrl = getValues("image");

  const imageRegex = /%2F(\S+)\?/gm.exec(imageUrl); //name img
  const imageName = imageRegex ? imageRegex[1] : "";
  const {
    image,
    setImage,
    progress,
    setProrgess,
    handleDeleteImage,
    handleUploadImage,
    onSelectImage,
  } = useFirebaseImage(setValue, getValues, imageName, deletePostImage);
  async function deletePostImage() {
    const colRef = doc(db, "posts", postId);
    await updateDoc(colRef, {
      image: "",
    });
  }

  useEffect(() => {
    setImage(imageUrl);
  }, [imageUrl, setImage]);

  const watchHot = watch("hot");
  const watchStatus = watch("status");
  useEffect(() => {
    async function fetchData() {
      if (!postId) return;
      const docRef = doc(db, "posts", postId);
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.data()) {
        reset(docSnapshot.data());
        setSelectCategory(docSnapshot.data()?.category || "");
        setContent(docSnapshot.data()?.content || "");
      }
    }
    fetchData();
  }, [postId, reset]);

  useEffect(() => {
    async function getCategoriesData() {
      const colRef = collection(db, "categories");
      const q = query(colRef, where("status", "==", 1));
      const querySnapshot = await getDocs(q);
      let result = [];
      querySnapshot.forEach((doc) => {
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setCategories(result);
    }
    getCategoriesData();
  }, []);
  const handleClickOption = async (item) => {
    const colRef = doc(db, "categories", item.id);
    const docData = await getDoc(colRef);
    setValue("category", {
      id: docData.id,
      ...docData.data(),
    });
    setSelectCategory(item);
    setShow(false);
  };
  const updatePostHandler = async (values) => {
    if (!isValid) return;
    const docRef = doc(db, "posts", postId);
    values.status = Number(values.status);
    values.slug = slugify(values.slug || values.title, { lower: true });
    await updateDoc(docRef, {
      ...values,
      image,
      content,
    });
    toast.success("Update post successfully!");
  };
  const modules = useMemo(
    () => ({
      toolbar: [
        ["bold", "italic", "underline", "strike"], // toggled buttons
        ["blockquote", "code-block"],
        ["link", "image", "video", "formula"],

        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
        [{ script: "sub" }, { script: "super" }], // superscript/subscript
        [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
        [{ direction: "rtl" }], // text direction

        [{ size: ["small", false, "large", "huge"] }], // custom dropdown
        [{ header: [1, 2, 3, 4, 5, 6, false] }],

        [{ color: [] }, { background: [] }], // dropdown with defaults from theme
        [{ font: [] }],
        [{ align: [] }],

        ["clean"], // remove formatting button
      ],
      imageUploader: {
        // imgbbAPI
        upload: async (file) => {
          const bodyFormData = new FormData();
          bodyFormData.append("image", file);
          const response = await axios({
            method: "post",
            url: imgbbAPI,
            data: bodyFormData,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          return response.data.data.url;
        },
      },
    }),
    []
  );
  const { userInfo } = useAuth();
  if (!postId) return null;
  return (
    <PostUpdateStyle>
      <DashboardHeading
        title="Cập Nhật Bài Viết"
        desc={`Bài Viết Của Người Dùng: ${userInfo.fullname}`}
      ></DashboardHeading>
      <form
        className="flex flex-col gap-5"
        onSubmit={handleSubmit(updatePostHandler)}
      >
        <div className="grid grid-cols-2 list gap-x-10">
          <Field>
            <Label>Hình Ảnh</Label>
            <ImageUpload
              onChange={onSelectImage}
              handleDeleteImage={handleDeleteImage}
              className="h-[250px]"
              // progress={progress}
              image={image}
            ></ImageUpload>
            <p className="errors-validation">{errors.image?.message}</p>
          </Field>
          <Field>
            <Label>Thể Loại (Chọn 1 thể loại)</Label>
            <DropDownInput>
              <DropDownSelect
                placeholder={"Lựa Chọn Thể Loại"}
              ></DropDownSelect>
              {show && (
                <DropDownList>
                  {categories.map((item) => {
                    return (
                      <DropDownOption
                        key={item.id}
                        onClick={() => {
                          handleClickOption(item);
                        }}
                      >
                        {item.name}
                      </DropDownOption>
                    );
                  })}
                </DropDownList>
              )}
              {selectCategory.length > 0 && selectCategory && (
                <Category>{selectCategory?.name}</Category>
              )}
            </DropDownInput>
            {selectCategory?.name}
          </Field>
          <Field>
            <Label htmlFor="fullname">Tiêu Đề</Label>
            <Input
              control={control}
              name={"title"}
              type={"text"}
              placeholder={"Nhập Vào Tiêu Đề"}
              className={"input"}
            ></Input>
            <p className="errors-validation">{errors.title?.message}</p>
          </Field>
          <Field>
            <Label>Đường Dẫn</Label>
            <Input
              type="text"
              control={control}
              name="slug"
              placeholder="Nhập Vào Đường Dẫn (Không bắt buộc)"
              className={"input"}
            ></Input>
          </Field>

          {Number(userInfo?.role) === Number(userRole.ADMIN) ? (
            <>
              <Field>
                <Label>Trạng Thái</Label>
                <div className="flex items-center gap-10">
                  <Radio
                    control={control}
                    name={"status"}
                    checked={Number(watchStatus) === postStatus.APPROVED}
                    value={postStatus.APPROVED}
                  >
                    Chấp Thuận
                  </Radio>
                  <Radio
                    control={control}
                    name={"status"}
                    checked={Number(watchStatus) === postStatus.PENDING}
                    value={postStatus.PENDING}
                  >
                    Đang Chờ
                  </Radio>
                  <Radio
                    control={control}
                    name={"status"}
                    checked={Number(watchStatus) === postStatus.REJECTED}
                    value={postStatus.REJECTED}
                  >
                    Từ Chối
                  </Radio>
                </div>
              </Field>
              <Field>
                <Label>Bài Viết Nổi Bật</Label>
                <Toggle
                  on={watchHot === true}
                  onClick={() => setValue("hot", !watchHot)}
                ></Toggle>
              </Field>
            </>
          ) : (
            ""
          )}
        </div>
        <div className="w-full entry-content">
          <ReactQuill
            modules={modules}
            theme="snow"
            value={content}
            onChange={setContent}
          />
        </div>

        <Button kind="primary" type="submit">
          Update post
        </Button>
      </form>
    </PostUpdateStyle>
  );
}
