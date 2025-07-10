import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { IoSettingsOutline } from "react-icons/io5";
import { RiMenuFoldLine } from "react-icons/ri";
import Dropdown from "../componentss/header/Dropdown.jsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = ({ isOpen, setIsOpen }) => {
  const { userData, isUserDataLoading } = useSelector((state) => state.user);
  const [currentTime, setCurrentTime] = useState("");
  const [greeting, setGreeting] = useState("");
  const navigate = useNavigate();

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const handleSettings = () => {
    navigate("/dashboard/settings");
  };

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, "0");

      setCurrentTime(`${hours}:${minutes}`);

      if (hours < 12) {
        setGreeting("Good morning");
      } else if (hours < 18) {
        setGreeting("Good afternoon");
      } else {
        setGreeting("Good evening");
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 60000); // update every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-40 backdrop-blur-lg bg-[#F5F5F5]">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Left side - Sidebar toggle and welcome message */}
        <div className="flex items-center w-full space-x-4">
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-full text-slate-600 hover:bg-slate-100 transition-colors lg:hidden block duration-200"
          >
            <RiMenuFoldLine className="text-xl" />
          </motion.button>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="hidden md:flex flex-col"
          >
            <div className="flex items-center space-x-1">
              <span className="text-xl font-medium text-gray-500">
                {greeting},
              </span>
              {isUserDataLoading ? (
                <span className="w-24 h-6 bg-gray-200 rounded animate-pulse"></span>
              ) : (
                <span className="text-xl font-[600] text-primary">
                  {userInfo.fullName || "User"}
                </span>
              )}
            </div>
            <div className="text-xs text-slate-500">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}{" "}
              • {currentTime}
            </div>
          </motion.div>
        </div>

        {/* Right side - Settings and profile dropdown */}
        <div className="flex items-center justify-end w-full space-x-5">
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              handleSettings();
            }}
            className="p-2.5 rounded-full text-slate-600 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 transition-colors duration-200 relative"
            whileHover={{ scale: 1.1, transition: { delay: 0.1 } }}
            whileTap={{ scale: 0.9 }}
          >
            <IoSettingsOutline className="text-xl" />
          </motion.button>
          <Dropdown />
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
};

export default Header;
