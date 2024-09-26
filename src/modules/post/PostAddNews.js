import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import DashboardHeading from "../dashboard/DashboardHeading";
import { Field } from "../../components/field";
import Input from "../../components/input/Input";
import { Label } from "../../components/label";
import { set, useForm } from "react-hook-form";
import Checkbox from "../../components/check-box/Checkbox";
import DropDownList from "../../components/dropdown/DropDownList";
import DropDownInput from "../../components/dropdown/DropDownInput";
import DropDownSelect from "../../components/dropdown/DropDownSelect";
import DropDownOption from "../../components/dropdown/DropDownOption";
import Button from "../../components/button/Button";
import slugify from "slugify";
import { postStatus, userRole } from "../../untils/constant";
import Radio from "../../components/check-box/Radio";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import ImageUpload from "../../components/image/ImageUpload";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { db } from "../../firebase-app/firebaseConfig";
import { toast } from "react-toastify";

import useShow from "../../hooks/useShow";
import Category from "./category/Category";
import Toggle from "../../components/toggle/Toggle";
import { useAuth } from "../../contexts/authContext";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageUploader from "quill-image-uploader";
import axios from "axios";
import { imgbbAPI } from "../../untils/apiConfig";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
Quill.register("modules/imageUploader", ImageUploader);

const schemaValidation = yup.object({
  title: yup.string().required("Please enter your title for write's"),
  category: yup.object().required("Please select category your write"),
});

const PostAddNewsStyles = styled.div`
  @media only screen and (max-width: 800px) {
    font-size: 14px;
    .list {
      display: flex;
      flex-direction: column;
    }
  }
`;

export default function PostAddNews() {
  const { userInfo } = useAuth();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isValid },
    setValue,
    getValues,
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      slug: "",
      status: 1,
      hot: false,
      image: "",
      category: {},
      user: {},
    },
    resolver: yupResolver(schemaValidation),
  });

  const watchStatus = watch("status");
  const watchHot = watch("hot");

  const { show = true, setShow } = useShow();

  const handleAddPost = async (e) => {
    if (!isValid) return;
    const cloneValues = { ...e };
    cloneValues.slug = slugify(e.slug || e.title, { lower: true });
    cloneValues.status = Number(e.status);

    try {
      const colRef = collection(db, "posts");
      await addDoc(colRef, {
        ...cloneValues,
        image,
        content,
        createdAt: serverTimestamp(),
      });
      toast.success("Create new post successfully!");
      reset({
        title: "",
        slug: "",
        status: 2,
        category: {},
        hot: false,
        image: "",
        user: {},
      });
    } catch (err) {
      console.log(err);
    }
  };

  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const [progress, setProgress] = useState(0);

  const [categories, setCategories] = useState([]);
  const [selectCategory, setSelectCategory] = useState("");

  const handleUploadImage = (file) => {
    const storage = getStorage();

    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(storage, "images/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);

        console.log("Upload is " + progress + "% done");
        console.log("progress1", progress);
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            console.log("Nothing at all");
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImage(downloadURL);
        });
      }
    );
  };

  const onSelectImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setValue("image", file.name);
    handleUploadImage(file);
  };

  const handleDeleteImage = () => {
    const storage = getStorage();

    // Create a reference to the file to delete
    const desertRef = ref(storage, "images/" + getValues("image"));

    // Delete the file
    deleteObject(desertRef)
      .then(() => {
        toast.success("Delete successfully");
        setImage("");
        setProgress(0);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error);
      });
  };

  const handleClickOption = async (item) => {
    const colRef = doc(db, "categories", item.id);
    const docData = await getDoc(colRef);
    setValue("category", {
      id: docData.id,
      ...docData.data(),
    });
    setSelectCategory(item.name);
    setShow(false);
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

  useEffect(() => {
    async function fetchUserData() {
      if (!userInfo.email) return;
      const q = query(
        collection(db, "users"),
        where("email", "==", userInfo.email)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setValue("user", {
          id: doc.id,
          ...doc.data(),
        });
      });
    }
    fetchUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo.email]);

  useEffect(() => {
    async function getData() {
      try {
        const colRef = collection(db, "categories");
        const q = query(colRef, where("status", "==", 1));
        let result = [];
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          result.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setCategories(result);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, []);

  return (
    <PostAddNewsStyles>
      <DashboardHeading title="Tạo Bài Viết"></DashboardHeading>
      <form
        className="flex flex-col gap-5"
        onSubmit={handleSubmit(handleAddPost)}
      >
        <div className="grid grid-cols-2 list gap-x-10">
          <Field>
            <Label>Hình Ảnh</Label>
            <ImageUpload
              onChange={onSelectImage}
              name="image"
              image={image}
              // progress={progress}
              handleDeleteImage={handleDeleteImage}
            ></ImageUpload>
          </Field>
          <Field>
            <Label>Thể Loại (chọn 1 thể loại)</Label>
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
                        <p className="errors-validation">
                          {errors.category?.message}
                        </p>
                      </DropDownOption>
                    );
                  })}
                </DropDownList>
              )}
              {selectCategory.length > 0 && selectCategory && (
                <Category kind={"cardPriamry"}>{selectCategory}</Category>
              )}
            </DropDownInput>
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
          Thêm Bài Viết
        </Button>
      </form>
    </PostAddNewsStyles>
  );
}
