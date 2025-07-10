import { FaCrown, FaShoppingCart, FaStore } from "react-icons/fa";
import PropTypes from "prop-types";

const RoleBadge = ({ user }) => {
    if (!user) return null;

    if (user.isAdmin && user.isSeller && user.isBuyer) {
        return (
            <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full flex items-center text-xs font-medium">
        <FaCrown className="mr-1.5" /> Admin
      </span>
        );
    } else if (user.isSeller) {
        return (
            <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full flex items-center text-xs font-medium">
        <FaStore className="mr-1.5" /> Seller
      </span>
        );
    } else if (user.isBuyer) {
        return (
            <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full flex items-center text-xs font-medium">
        <FaShoppingCart className="mr-1.5" /> Buyer
      </span>
        );
    }

    return null;
};

RoleBadge.propTypes = {
    user: PropTypes.shape({
        isAdmin: PropTypes.bool,
        isSeller: PropTypes.bool,
        isBuyer: PropTypes.bool,
    }),
};

export default RoleBadge;

