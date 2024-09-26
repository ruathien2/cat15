import React, { Suspense } from "react";

import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/authContext";

const HomePage = React.lazy(() => import("./pages/HomePage"));
const NotFoundPage = React.lazy(() => import("./pages/NotFoundPage"));
const SignInPage = React.lazy(() => import("./pages/SignInPage"));
const SignUpPage = React.lazy(() => import("./pages/SignUpPage"));

const DetailsPage = React.lazy(() => import("./pages/DetailsPage"));

const DashboardLayout = React.lazy(() =>
  import("./modules/dashboard/DashboardLayout")
);
const Dashboard = React.lazy(() => import("./pages/Dashboard"));

const PostAddNews = React.lazy(() => import("./modules/post/PostAddNews"));
const PostManage = React.lazy(() => import("./modules/post/PostManage"));
const PostUpdate = React.lazy(() => import("./modules/post/PostUpdate"));

const CategoryManage = React.lazy(() =>
  import("./modules/category/CategoryManage")
);
const CategoryAddNew = React.lazy(() =>
  import("./modules/category/CategoryAddNew")
);
const CategoryUpdate = React.lazy(() =>
  import("./modules/category/CategoryUpdate")
);
const CategoryWrite = React.lazy(() => import("./pages/CategoryWrite"));

const UserManage = React.lazy(() => import("./modules/users/UserManage"));
const UserAddNew = React.lazy(() => import("./modules/users/UserAddNew"));
const UserUpdate = React.lazy(() => import("./modules/users/UserUpdate"));
const UserProfile = React.lazy(() => import("./modules/profile/UserProfile"));

function App() {
  return (
    <div>
      <AuthProvider>
        <Suspense>
          <Routes>
            <Route path="/" element={<HomePage></HomePage>}></Route>
            <Route path="/sign-up" element={<SignUpPage></SignUpPage>}></Route>
            <Route path="/sign-in" element={<SignInPage></SignInPage>}></Route>
            <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>

            <Route path="/:slug" element={<DetailsPage></DetailsPage>}></Route>
            <Route
              path="/category-write/:slug"
              element={<CategoryWrite></CategoryWrite>}
            ></Route>

            <Route element={<DashboardLayout></DashboardLayout>}>
              <Route path="/dasboard" element={<Dashboard></Dashboard>}></Route>
              <Route
                path="/manage/add-posts"
                element={<PostAddNews></PostAddNews>}
              ></Route>
              <Route
                path="/manage/add-category"
                element={<CategoryAddNew></CategoryAddNew>}
              ></Route>
              <Route
                path="/manage/category"
                element={<CategoryManage></CategoryManage>}
              ></Route>
              <Route
                path="/manage/update-category"
                element={<CategoryUpdate></CategoryUpdate>}
              ></Route>
              <Route
                path="/manage/user"
                element={<UserManage></UserManage>}
              ></Route>
              <Route
                path="/manage/create-user"
                element={<UserAddNew></UserAddNew>}
              ></Route>
              <Route
                path="/manage/update-user"
                element={<UserUpdate></UserUpdate>}
              ></Route>
              <Route
                path="/manage/posts"
                element={<PostManage></PostManage>}
              ></Route>
              <Route
                path="/manage/update-post"
                element={<PostUpdate></PostUpdate>}
              ></Route>
              <Route
                path="/profile"
                element={<UserProfile></UserProfile>}
              ></Route>
            </Route>
          </Routes>
        </Suspense>
      </AuthProvider>
    </div>
  );
}

export default App;
