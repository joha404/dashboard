import PageTitle from "./PageTitle.jsx";
import PropTypes from "prop-types";

const PageWithTitle = ({ Component, title }) => (
    <>
        <PageTitle title={title} />
        <Component />
    </>
);

PageWithTitle.propTypes = {
    Component: PropTypes.func,
    title: PropTypes.string,
}

export default PageWithTitle;