import { Navigate } from "react-router-dom";
import ManageUsers from "../pages/SettingsPage/ManageUsers/ManageUsers.jsx";
import DashboardLayout from "../layouts/DashboardLayout.jsx";
import LandingPage from "../pages/LandingPage/LandingPage.jsx";
import ProfilePage from "../pages/ProfilePage/ProfilePage.jsx";
import SettingsPage from "../pages/SettingsPage/SettingsPage.jsx";
import ChangePassword from "../pages/SettingsPage/ChangePassword.jsx";
import PageWithTitle from "../shared/PageWithTitle.jsx";
import AuthGuard from "../shared/AuthGuard.jsx";
import ErrorBoundary from "../shared/ErrorBoundary.jsx";
import SignInAndSignUp from "../pages/CMS/Auth/SignInAndSignUp.jsx";
import NotificationPage from "../pages/Notification/NotificationPage.jsx";

const dashboardRoutes = {
  path: "/dashboard",
  element: (
    <AuthGuard>
      <DashboardLayout />
    </AuthGuard>
  ),
  errorElement: <ErrorBoundary />,
  children: [
    { index: true, element: <Navigate to="landing-page" replace /> },
    {
      path: "landing-page",
      element: (
        <PageWithTitle Component={LandingPage} title="Admin || Dashboard" />
      ),
    },
    {
      path: "profile",
      element: (
        <PageWithTitle Component={ProfilePage} title="Admin || Profile" />
      ),
    },
    {
      path: "users",
      element: <PageWithTitle Component={ManageUsers} title="Admin || Users" />,
    },

    {
      path: "signin-signup",
      element: (
        <PageWithTitle Component={SignInAndSignUp} title="Auth || Page" />
      ),
    },
    {
      path: "notification",
      element: (
        <PageWithTitle
          Component={NotificationPage}
          title="Admin || Notification"
        />
      ),
    },
    {
      path: "settings",
      element: <SettingsPage />,
      children: [
        { index: true, element: <Navigate to="change-password" replace /> },
        { path: "change-password", element: <ChangePassword /> },
        { path: "users", element: <ManageUsers /> },
      ],
    },
  ],
};

export default dashboardRoutes;
