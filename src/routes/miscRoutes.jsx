import NotFoundPage from "../shared/NotFoundPage.jsx";
import UnauthorizedPage from "../shared/UnauthorizedPage.jsx";
import PageWithTitle from "../shared/PageWithTitle.jsx";
import UserDetails from "../pages/UserDetails/UserDetails.jsx";

const miscRoutes = [
    {
        path: "/unauthorized",
        element: (
            <PageWithTitle
                Component={UnauthorizedPage}
                title={"Admin || Unauthorized"}
            />
        ),
    },
    {
        path: "*",
        element: (
            <PageWithTitle Component={NotFoundPage} title={"Admin || Not Found"} />
        ),
    },
    {
        path: "user-details/:id",
        element: (
            <PageWithTitle Component={UserDetails} title={"Admin || User Details"} />
        ),
    },
];

export default miscRoutes;
