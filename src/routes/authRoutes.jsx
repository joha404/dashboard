import LoginPage from "../pages/LoginPage/LoginPage.jsx";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword.jsx";
import OTPVerification from "../pages/OTPVerification/OTPVerification.jsx";
import ResetPassword from "../pages/ResetPassword/ResetPassword.jsx";
import PageWithTitle from "../shared/PageWithTitle.jsx";

const authRoutes = [
    {
        path: "/login",
        element: <PageWithTitle Component={LoginPage} title={"Admin || Login"} />,
    },
    {
        path: "/forgot-password",
        element: (
            <PageWithTitle
                Component={ForgotPassword}
                title={"Admin || ForgotPassword"}
            />
        ),
    },
    {
        path: "/otp-verification",
        element: (
            <PageWithTitle
                Component={OTPVerification}
                title={"Admin || OTPVerification"}
            />
        ),
    },
    {
        path: "/reset-password",
        element: (
            <PageWithTitle
                Component={ResetPassword}
                title={"Admin || ResetPassword"}
            />
        ),
    },
];

export default authRoutes;
