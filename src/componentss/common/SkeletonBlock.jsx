import PropTypes from "prop-types";

export const SkeletonBlock = ({ height = "h-12", width = "w-full", rounded = "rounded-lg" }) => (
    <div className={`animate-pulse bg-gray-200 ${height} ${width} ${rounded}`} />
);

SkeletonBlock.propTypes = {
    height: PropTypes.string,
    width: PropTypes.string,
    rounded: PropTypes.string,
}