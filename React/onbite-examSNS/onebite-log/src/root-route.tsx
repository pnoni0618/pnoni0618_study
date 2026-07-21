import { Navigate, Route, Routes } from "react-router";
import SignUpPage from "./pages/sign-up-page";
import SignInPage from "./pages/sign-in-page";
import ForgetPasswordPage from "./pages/forget-password-page";
import PostDetailPage from "./pages/post-detail-page";
import ProfileDetailPage from "./pages/profile-detail-page";
import ResetPasswordPage from "./pages/reset-password-page";
import IndexPage from "./pages/index-page";
import GlobalLayout from "./components/layout/global-layout";
import GuestOnlyLayout from "./components/layout/guest-only-layout";
import MemberOnlyLayout from "./components/layout/member-only-layout";

export default function RootRoute() {
  return (
    <Routes>
      <Route element={<GlobalLayout />}>
        <Route element={<GuestOnlyLayout />}>
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/forget-password" element={<ForgetPasswordPage />} />
        </Route>

        <Route element={<MemberOnlyLayout />}>
          <Route path="/" element={<IndexPage />} />
          <Route path="/post/:postId" element={<PostDetailPage />} />
          <Route path="/profile/:userId" element={<ProfileDetailPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
        </Route>
        <Route path="*" element={<Navigate to={"/"} />} />
      </Route>
    </Routes>
  );
}

// 3단계 중첩상자 (Nested Routes)구조 _ 상자 안에 상자가 있고 그 안에 실제 페이지가 있는 형태
// 가장 바깥 GlobalLayout _ 로그인 유무와 관계X, 기본 배경(네비게이션 바, 기본 레이아웃 배경)
//
