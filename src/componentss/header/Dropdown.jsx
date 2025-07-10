import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { CiUser } from "react-icons/ci";
import { FiLogOut } from "react-icons/fi";
import { clearToken } from "../../utils/cookieHelper.js";
import UserAvatar from "../common/UserAvatar.jsx";

const Dropdown = () => {
  const profileRef = useRef(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleDropdown = () => setIsProfileOpen((prev) => !prev);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const logOut = () => {
    clearToken();
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -15, scale: 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 400,
        mass: 0.5,
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.98,
      transition: { duration: 0.2, ease: "easeIn" },
    },
  };

  const menuItemVariants = {
    hidden: { opacity: 0, x: -15 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.07,
        type: "spring",
        stiffness: 300,
        damping: 15,
      },
    }),
    tap: { scale: 0.98 },
  };

  const getInitials = (name = "JD") =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("");

  return (
    <div className="relative" ref={profileRef}>
      {/* Profile Button */}
      <motion.button
        onClick={toggleDropdown}
        className="flex items-center space-x-2 focus:outline-none group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <UserAvatar
          avatar={userInfo?.avatar}
          fullName={userInfo?.fullName}
          isOpen={isProfileOpen}
          styleCSS={"w-12 h-12"}
        />
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isProfileOpen && (
          <motion.div
            className="absolute right-0 mt-3 w-64 origin-top-right bg-white/95 backdrop-blur-xl rounded-xl shadow-xl ring-1 ring-slate-200/80 z-50"
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* User Info */}
            <div className="relative px-4 py-3 border-b border-slate-100/80">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-400/10 via-blue-500/10 to-indigo-600/10 rounded-t-xl pointer-events-none" />
              <p className="text-sm font-medium text-slate-800 relative">
                {userInfo?.fullName}
              </p>
              <p className="text-xs text-slate-500 relative">
                {userInfo?.email}
              </p>
            </div>

            {/* Menu Items */}
            <ul className="py-1 bg-white">
              {/* Profile */}
              <motion.li
                variants={menuItemVariants}
                custom={0}
                initial="hidden"
                animate="visible"
                whileTap="tap"
              >
                <NavLink
                  to="/dashboard/profile"
                  className="flex items-center px-4 py-3 text-sm text-slate-700 hover:bg-slate-100 transition"
                  onClick={() => setIsProfileOpen(false)}
                >
                  <CiUser className="mr-3 text-lg text-primary-hover" />
                  <span>Profile</span>
                  <motion.div
                    className="ml-auto w-1 h-5 bg-primary rounded-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  />
                </NavLink>
              </motion.li>

              {/* Logout */}
              <motion.li
                variants={menuItemVariants}
                custom={1}
                initial="hidden"
                animate="visible"
                whileTap="tap"
              >
                <button
                  className="flex items-center w-full px-4 py-3 text-sm text-rose-500 hover:bg-rose-50 group transition"
                  onClick={logOut}
                >
                  <FiLogOut className="mr-3 text-lg group-hover:animate-pulse" />
                  <span>Logout</span>
                  <motion.div
                    className="ml-auto w-1 h-5 bg-rose-400 rounded-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.35 }}
                  />
                </button>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dropdown;
