import React, { useEffect, useState } from "react";
import DashboardHeading from "../dashboard/DashboardHeading";
import Table from "../../components/table/Table";
import ActionDelete from "../../components/action/ActionDelete";
import ActionEdit from "../../components/action/ActionEdit";
import ActionView from "../../components/action/ActionView";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  onSnapshot,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { db } from "../../firebase-app/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/button";
import { userRole, userStatus } from "../../untils/constant";
import LabelStatus from "../../components/lable-status/LabelStatus";
import { debounce } from "lodash";
import { useAuth } from "../../contexts/authContext";
import UserProfile from "../profile/UserProfile";
import swal from "sweetalert";
import styled from "styled-components";

const USERS_PER_PAGE = 10;

const UserManageStyle = styled.div`
  @media only screen and (max-width: 800px) {
    font-size: 14px;
  }
`;

export default function UserManage() {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [lastDoc, setLastDoc] = useState();
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  const handleDeleteCategory = async (docId) => {
    const docRef = doc(db, "users", docId);
    const willDelete = await swal({
      title: "Bạn Chắc Chắn Chứ ?",
      text: "Bạn Có Chắc Chắn Muốn Xóa Người Dùng Này?",
      icon: "warning",
      dangerMode: true,
    });

    if (willDelete) {
      swal("Đã Xóa!", "Bạn Đã Xóa Người Dùng!", "success");
      await deleteDoc(docRef);
    }
  };

  const handleUpdate = (docId) => {
    navigate(`/manage/update-user?id=${docId}`);
  };

  const handleCreateUser = () => {
    navigate(`/manage/create-user`);
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

  const handleLoadmore = async () => {
    // Construct a new query starting at this document,
    // get the next 25 categories.
    const next = query(
      collection(db, "users"),
      startAfter(lastDoc || 0),
      limit(USERS_PER_PAGE)
    );

    onSnapshot(next, (snapshot) => {
      const result = [];

      snapshot.forEach((doc) => {
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      setUsers([...users, ...result]);
    });
    const documentSnapshots = await getDocs(next);

    // Get the last visible document
    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];
    setLastDoc(lastVisible);
  };

  const searchCategory = debounce((e) => {
    setFilter(e.target.value);
  }, 5000);

  useEffect(() => {
    async function fetchData() {
      try {
        const colRef = collection(db, "users");

        const newRef = filter
          ? query(
              colRef,
              where("userName", "==", filter)
              // where("name", ">=", "end" + "utf8")
            )
          : query(colRef, limit(USERS_PER_PAGE));
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
          setUsers(results);
        });
        setLastDoc(lastVisible);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [filter]);

  useEffect(() => {
    const colRef = collection(db, "users");
    onSnapshot(colRef, (snapshot) => {
      let results = [];
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setUsers(results);
    });
  }, []);
  const { userInfo } = useAuth();
  if (Number(userInfo.role) !== Number(userRole.ADMIN))
    return (
      <>
        <UserProfile></UserProfile>
      </>
    );
  return (
    <UserManageStyle>
      <div>
        <DashboardHeading
          title="Quản Lý Người Dùng"
          desc="Quản Lý Tất Cả Người Dùng"
        >
          <div className="flex items-end">
            <Button type="button" onClick={handleCreateUser}>
              Tạo Người Dùng
            </Button>
          </div>
        </DashboardHeading>
        <div className="flex justify-between mb-2">
          {/* <input
            placeholder="Search user ..."
            className=" border-[1px] text-sm border-gray-300 rounded-lg w-full px-3 py-2 focus:border-[#2EBAC1] outline-none"
            onChange={searchCategory}
          /> */}
        </div>
        <Table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Thông Tin</th>
              <th>Tên</th>
              <th>Email</th>
              <th>Trạng Thái</th>
              <th>Quyền</th>
              <th>Xử Lý</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 &&
              users.map((item) => {
                return (
                  <tr key={item.id}>
                    <td title={item.id}>{item.id.slice(0, 5) + "..."}</td>
                    <td className="flex gap-2">
                      <div className="w-10 h-10">
                        <img
                          srcSet={item.avatar}
                          alt="avavart"
                          loading="lazy"
                          className="rounded-lg "
                        />
                      </div>
                      <div>
                        <h3>{item.fullname}</h3>
                        <span className="text-sm text-gray-400">
                          {new Date(
                            item.created?.seconds * 1000
                          ).toLocaleDateString("vi-VI")}
                        </span>
                      </div>
                    </td>
                    <td>{item.userName}</td>
                    <td title={item.email}>{item.email.slice(0, 5) + "..."}</td>
                    <td>{renderLabelStatus(item?.status)}</td>
                    <td>{renderLabelRole(item?.role)}</td>
                    <td>
                      <div className="flex items-center gap-x-3">
                        <ActionEdit
                          onClick={() => handleUpdate(item.id)}
                        ></ActionEdit>
                        <ActionDelete
                          onClick={() => handleDeleteCategory(item.id)}
                        ></ActionDelete>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
        {total > users.length && (
          <Button type="button" kind="primary" onClick={() => handleLoadmore()}>
            Xem Thêm
          </Button>
        )}
        <span className="text-sm text-gray-300">
          Số Lượng Người Dùng: {total}
        </span>
      </div>
    </UserManageStyle>
  );
}
