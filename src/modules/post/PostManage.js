import React, { useEffect, useState } from "react";
import ActionDelete from "../../components/action/ActionDelete";
import ActionEdit from "../../components/action/ActionEdit";
import ActionView from "../../components/action/ActionView";
import { Button } from "../../components/button";
import Table from "../../components/table/Table";
import DashboardHeading from "../dashboard/DashboardHeading";
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
import { userStatus } from "../../untils/constant";
import LabelStatus from "../../components/lable-status/LabelStatus";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import styled from "styled-components";

const POST_PER_PAGE = 10;

const PostManageStyle = styled.div`
  @media only screen and (max-width: 800px) {
    font-size: 14px;
  }
`;

export default function PostManage() {
  const [postList, setPostList] = useState([]);
  const [filter, setFilter] = useState("");
  const [lastDoc, setLastDoc] = useState();
  const [total, setTotal] = useState(0);

  const navigate = useNavigate();

  const handleUpdate = (docId) => {
    navigate(`/manage/update-post?id=${docId}`);
  };

  const handleDeletePost = async (docId) => {
    const colRef = doc(db, "posts", docId);
    swal({
      title: "Bạn Đã Chắc Chắn?",
      text: "Bạn Chắc Chắn Xóa Bài Viết ?",
      icon: "warning",
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        swal("Đã Xóa!", "Bài Viết Của Bạn Đã Xóa!", "success");
        await deleteDoc(colRef);
      }
    });
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
      collection(db, "posts"),
      startAfter(lastDoc || 0),
      limit(POST_PER_PAGE)
    );

    onSnapshot(next, (snapshot) => {
      const result = [];

      snapshot.forEach((doc) => {
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      setPostList([...postList, ...result]);
    });
    const documentSnapshots = await getDocs(next);

    // Get the last visible document
    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];
    setLastDoc(lastVisible);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const colRef = collection(db, "posts");

        const newRef = filter
          ? query(colRef, where("userName", "==", filter))
          : query(colRef, limit(POST_PER_PAGE));
        const documentSnapshots = await getDocs(newRef);

        // Get the last visible document
        const lastVisible =
          documentSnapshots.docs[documentSnapshots.docs.length - 1];

        onSnapshot(colRef, (snapshot) => {
          setTotal(snapshot.size);
        });

        onSnapshot(newRef, (snapshot) => {
          let results = [];
          snapshot.forEach((doc) => {
            results.push({
              id: doc.id,
              ...doc.data(),
            });
          });
          setPostList(results);
        });
        setLastDoc(lastVisible);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [filter]);

  useEffect(() => {
    const colRef = collection(db, "posts");
    onSnapshot(colRef, (snapshot) => {
      let results = [];
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setPostList(results);
    });

    onSnapshot(colRef, (snapshot) => {
      setTotal(snapshot.size);
    });
  }, []);
  return (
    <PostManageStyle>
      <div>
        <DashboardHeading
          title="Quản Lý Bài Viết"
          desc="Quản Lý Bài Viết Của Tất Cả Người Dùng"
        ></DashboardHeading>
        <div className="flex justify-between mb-2">
          {/* <input
            placeholder="Tìm Kiếm Bài Viết ..."
            className=" border-[1px] text-sm border-gray-300 rounded-lg w-full px-3 py-2 focus:border-[#2EBAC1] outline-none"
            // onChange={searchCategory}
          /> */}
        </div>
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
            {postList &&
              postList.map((item) => {
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
                        <span className="text-sm text-gray-400">
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
        {total > postList.length && (
          <Button type="button" kind="primary" onClick={() => handleLoadmore()}>
            Xem Thêm
          </Button>
        )}
        <span className="text-sm text-gray-300">Số Bài Viết: {total}</span>
      </div>
    </PostManageStyle>
  );
}
