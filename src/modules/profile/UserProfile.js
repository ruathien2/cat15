import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Field } from "../../components/field";
import { useAuth } from "../../contexts/authContext";
import { userRole, userStatus } from "../../untils/constant";
import styled from "styled-components";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { db } from "../../firebase-app/firebaseConfig";
import ActionView from "../../components/action/ActionView";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import ActionEdit from "../../components/action/ActionEdit";
import ActionDelete from "../../components/action/ActionDelete";
import LabelStatus from "../../components/lable-status/LabelStatus";
import { Button } from "../../components/button";
import Table from "../../components/table/Table";

const UserProfileStyle = styled.div`
  .info {
    margin-top: 50px;
  }
  span {
    font-weight: 600;
  }
  @media only screen and (max-width: 800px) {
    font-size: 14px;
  }
`;
const USER_PER_PAGE = 1;
export default function UserProfile() {
  const { control } = useForm();
  const { userInfo } = useAuth();

  const renderLabelRole = (role) => {
    switch (Number(role)) {
      case userRole.ADMIN:
        return "Admin";
      case userRole.MOD:
        return "Moration";
      case userRole.USER:
        return "User";
      default:
        break;
    }
  };

  const [postInfo, setPostInfo] = useState([]);
  const [total, setTotal] = useState(0);
  const [lastDoc, setLastDoc] = useState();

  const navigate = useNavigate();

  const handleUpdate = (docId) => {
    navigate(`/manage/update-post?id=${docId}`);
  };

  const handleDeletePost = async (docId) => {
    const colRef = doc(db, "posts", docId);
    await deleteDoc(colRef);
  };

  const renderLabelStatus = (status) => {
    switch (Number(status)) {
      case userStatus.ACTIVE:
        return <LabelStatus type="success">Hoạt Động</LabelStatus>;
      case userStatus.PENDING:
        return <LabelStatus type="warning">Đang Chờ</LabelStatus>;
      case userStatus.BAN:
        return <LabelStatus type="danger">Từ Chối</LabelStatus>;
      default:
        break;
    }
  };

  const handleLoadmore = async () => {
    // Construct a new query starting at this document,
    // get the next 25 categories.
    const next = query(
      collection(db, "categories"),
      startAfter(lastDoc || 0),
      limit(USER_PER_PAGE)
    );

    onSnapshot(next, (snapshot) => {
      const result = [];

      snapshot.forEach((doc) => {
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      setPostInfo([...postInfo, ...result]);
    });
    const documentSnapshots = await getDocs(next);

    // Get the last visible document
    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];
    setLastDoc(lastVisible);
  };

  useEffect(() => {
    async function fetchData() {
      if (!userInfo.uid) return;
      const colRef = query(
        collection(db, "posts"),
        where("user.id", "==", userInfo.uid)
        // limit(USER_PER_PAGE)
      );
      // onSnapshot(colRef, (snapshot) => {
      //   snapshot.forEach((doc) => {
      //     doc.data() &&
      //       setPostInfo({
      //         id: doc.id,
      //         ...doc.data(),
      //       });
      //   });
      // });

      onSnapshot(colRef, (snapshot) => {
        let results = [];
        snapshot.forEach((doc) => {
          results.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setPostInfo(results);
      });

      onSnapshot(colRef, (snapshot) => {
        setTotal(snapshot.size);
      });
    }
    fetchData();
  }, [userInfo.uid]);
  return (
    <UserProfileStyle>
      <img
        className="object-cover w-full rounded-lg h-[300px]"
        srcSet={userInfo.avatar}
        alt="avatar"
      />
      <div>
        <div className="info">
          <span>Học Và Tên: </span>
          {userInfo.fullname}
        </div>
        <div>
          <span>Email: </span>
          {userInfo.email}
        </div>
        <div>
          <span>Quyền Hành: </span>
          {renderLabelRole(userInfo.role)}
        </div>
        <div>
          <span>Giới Thiệu: </span>
          {renderLabelRole(userInfo?.description)}
        </div>
        <div>
          <span>Tổng số Bài Viết: </span>
          {postInfo.length}
        </div>
        <button
          className="px-5 py-2 my-3 text-white bg-orange-400 rounded-md"
          onClick={() => {
            navigate(`/manage/update-user?id=${userInfo.uid}`);
          }}
        >
          Cập Nhật Thông Tin
        </button>
        <br />
        <Table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Bài Viết</th>
              <th>Thể Loại</th>
              <th>Tác Giả</th>
              <th>Trạng Thái</th>
              <th>Xử Lý</th>
            </tr>
          </thead>
          <tbody>
            {postInfo &&
              postInfo.map((item) => {
                return (
                  <tr key={item.id}>
                    <td title={item.id}>{item.id.slice(0, 5) + "..."}</td>
                    <td className="flex gap-2">
                      <div className="w-10 h-10">
                        <img
                          srcSet={item.image}
                          alt="avavart"
                          loading="lazy"
                          className="rounded-lg "
                        />
                      </div>
                      <div>
                        <h3 title={item.title}>
                          {item.title.slice(0, 5) + "..."}
                        </h3>
                        <span className="font-sans text-sm text-gray-400">
                          {new Date(
                            item.createdAt?.seconds * 1000
                          ).toLocaleDateString("vi-VI")}
                        </span>
                      </div>
                    </td>
                    <td>{item.category?.name}</td>
                    <td>{item.user?.fullname}</td>
                    <td>{renderLabelStatus(item.user?.status)}</td>
                    <td>
                      <div className="flex items-center gap-x-3">
                        <ActionView
                          onClick={() => {
                            navigate(`/${item?.slug}`);
                          }}
                        ></ActionView>
                        <ActionEdit
                          onClick={() => handleUpdate(item.id)}
                        ></ActionEdit>
                        <ActionDelete
                          onClick={() => handleDeletePost(item.id)}
                        ></ActionDelete>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
        {total > postInfo.length && (
          <Button type="button" kind="primary" onClick={() => handleLoadmore()}>
            Load More
          </Button>
        )}
      </div>
    </UserProfileStyle>
  );
}
