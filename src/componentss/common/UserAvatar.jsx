import { motion } from "framer-motion";
import PropTypes from "prop-types";

const getInitials = (name = "") => {
    return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase();
};

const UserAvatar = ({ avatar, fullName, isOpen , styleCSS }) => {
    if (avatar) {
        return (
            <img
                src={avatar}
                alt={fullName}
                className={`${styleCSS} rounded-full object-cover border border-slate-300 shadow-md`}
            />
        );
    }

    return (
        <motion.div
            className={`${styleCSS} rounded-full bg-gradient-to-br from-teal-400 via-green-400 to-indigo-400 flex items-center justify-center text-white font-semibold shadow-md group-hover:shadow-lg relative`}
            animate={{ rotate: isOpen ? 360 : 0, scale: 1.05 }}
            transition={{
                type: "spring",
                stiffness: 300,
                damping: 10,
                delay: 0.1,
            }}
        >
            <span className="text-sm">{getInitials(fullName)}</span>
            {isOpen && (
                <motion.span
                    className="absolute inset-0 rounded-full bg-white opacity-20"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1.5, opacity: 0 }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                />
            )}
        </motion.div>
    );
};

UserAvatar.propTypes = {
    avatar: PropTypes.string,
    fullName: PropTypes.string,
    isOpen: PropTypes.bool,
    styleCSS: PropTypes.string,
};

export default UserAvatar;
