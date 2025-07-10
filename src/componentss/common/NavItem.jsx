import PropTypes from "prop-types";
import {NavLink, useLocation} from "react-router-dom";
import { motion } from "framer-motion";

export const NavItem = ({ to, label, icon }) => {
    const location = useLocation();
    const isActive = location.pathname.includes(to);

    return (
        <motion.div className={"rounded-md"}
        >
            <NavLink
                to={to}
                className={`relative  flex items-center px-4 py-3 rounded-lg transition-all duration-300 group  ${
                    isActive
                        ? "text-white bg-gradient-to-r from-primary to-primary-hover font-medium"
                        : "text-gray-300 hover:text-body hover:bg-slate-100"
                } text-sm`}
            >
                {/* Icon */}
                <span
                    className={`text-lg mr-3 transition-colors duration-300 ${
                        isActive ? "text-white" : "text-gray-300 group-hover:text-body"
                    }`}
                >
                {icon}
            </span>

                {/* Label */}
                <span>{label}</span>

                {/* Active Indicator */}
                {isActive && (
                    <span className="absolute right-0 top-2.5 bottom-2.5 w-1 rounded-l bg-primary-hover" />
                )}
            </NavLink>
        </motion.div>
    );
};

NavItem.propTypes = {
    to: PropTypes.string,
    label: PropTypes.string,
    icon: PropTypes.node,
};