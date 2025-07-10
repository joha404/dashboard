import { motion, AnimatePresence } from "framer-motion";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { HiOutlineTemplate } from "react-icons/hi";

const Sidebar = ({ isOpen, setIsOpen, links }) => {
  const [dropdownOpenIndex, setDropdownOpenIndex] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleDropdown = (index) => {
    setDropdownOpenIndex((prev) => (prev === index ? null : index));
  };
  const mainLinks = links.slice(0, 3);
  const contentLinks = links.slice(3);

  return (
    <>
      <aside
        className={`fixed top-0 left-0 z-50 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 w-[250px] md:w-[280px] xl:w-[300px] min-h-screen max-w-full flex flex-col justify-between transition-transform ease-in-out duration-500 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static`}
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5, ease: "easeIn" }}
          onClick={() => navigate("/")}
          className="relative flex items-center justify-center cursor-pointer px-5 h-24 border-b border-slate-700"
        >
          <h1 className="font-bold uppercase text-lg md:text-xl xl:text-2xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-300 via-gray-100 to-white">
            Admin Dashboard
          </h1>
          <div className="absolute bottom-0 left-1/2 w-20 h-0.5 bg-gradient-to-r from-transparent via-teal-400 to-transparent transform -translate-x-1/2" />
        </motion.div>

        {/* Links */}
        <div className="flex-1 overflow-y-auto scrollbar-hide w-full p-5 relative z-10">
          <ul className="space-y-1">
            {/* Main Links */}
            {mainLinks.map((link, index) => {
              const isActive =
                location.pathname === link.path ||
                location.pathname.startsWith(link.path + "/");

              const isDropdownOpen = dropdownOpenIndex === index;

              const hasActiveChild =
                link.children &&
                link.children.some(
                  (child) =>
                    location.pathname === child.path ||
                    location.pathname.startsWith(child.path + "/")
                );

              return (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.3 + index * 0.05,
                    duration: 0.3,
                    ease: "easeInOut",
                  }}
                  onMouseEnter={() => setHoveredItem(index)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className="relative group"
                >
                  {/* Hover highlight effect */}
                  {hoveredItem === index && (
                    <motion.div
                      layoutId="sidebarHighlight"
                      className="absolute inset-0 bg-slate-700/50 rounded-lg"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}

                  {!link.children ? (
                    <NavLink
                      onClick={() =>
                        window.innerWidth < 1024 && setIsOpen(false)
                      }
                      to={link.path}
                      className={`flex items-center py-3 px-4 font-medium transition-all relative z-10`}
                    >
                      <motion.span
                        whileHover={{ scale: 1.1 }}
                        className={`mr-3 text-lg ${
                          isActive ? "text-teal-300" : "text-slate-300"
                        }`}
                      >
                        {link.icon}
                      </motion.span>
                      <span
                        className={`text-base ${
                          isActive
                            ? "text-white font-semibold"
                            : "text-slate-300"
                        }`}
                      >
                        {link.name}
                      </span>
                      {isActive && (
                        <motion.div
                          layoutId="sidebarActiveIndicator"
                          className="absolute right-4 w-1.5 h-6 bg-teal-400 rounded-full"
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 30,
                          }}
                        />
                      )}
                    </NavLink>
                  ) : (
                    <div className="relative">
                      <motion.div
                        onClick={() => toggleDropdown(index)}
                        className={`flex items-center justify-between w-full py-3 px-4 transition-all cursor-pointer relative z-10`}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center text-base">
                          <span
                            className={`mr-3 text-lg ${
                              isDropdownOpen || hasActiveChild
                                ? "text-teal-300"
                                : "text-slate-300"
                            }`}
                          >
                            {link.icon}
                          </span>
                          <span
                            className={`${
                              isDropdownOpen || hasActiveChild
                                ? "text-white font-semibold"
                                : "text-slate-300"
                            }`}
                          >
                            {link.name}
                          </span>
                        </div>
                        <motion.span
                          animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                          className={`${
                            isDropdownOpen || hasActiveChild
                              ? "text-teal-300"
                              : "text-slate-300"
                          }`}
                        >
                          <IoIosArrowDown />
                        </motion.span>
                      </motion.div>

                      {/* Dropdown Items */}
                      <AnimatePresence>
                        {isDropdownOpen && (
                          <motion.ul
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="ml-7 overflow-hidden"
                          >
                            {link.children.map((child, childIndex) => {
                              const isChildActive =
                                location.pathname === child.path ||
                                location.pathname.startsWith(child.path + "/");

                              return (
                                <motion.li
                                  key={childIndex}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: childIndex * 0.05 }}
                                >
                                  <NavLink
                                    onClick={() =>
                                      window.innerWidth < 1024 &&
                                      setIsOpen(false)
                                    }
                                    to={child.path}
                                    className={`flex items-center gap-3 py-2 pl-4 pr-2 transition-all relative group`}
                                  >
                                    <motion.span
                                      animate={{
                                        backgroundColor: isChildActive
                                          ? "#5eead4"
                                          : "#cbd5e1",
                                        scale: isChildActive ? 1.2 : 1,
                                      }}
                                      className={`w-2 h-2 rounded-full transition-all`}
                                    />
                                    <span
                                      className={`text-sm ${
                                        isChildActive
                                          ? "text-white font-medium"
                                          : "text-slate-300"
                                      }`}
                                    >
                                      {child.name}
                                    </span>
                                    {isChildActive && (
                                      <motion.div
                                        layoutId="sidebarChildActiveIndicator"
                                        className="absolute right-0 w-1 h-4 bg-teal-400 rounded-full"
                                        transition={{
                                          type: "spring",
                                          stiffness: 500,
                                          damping: 30,
                                        }}
                                      />
                                    )}
                                  </NavLink>
                                </motion.li>
                              );
                            })}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                </motion.li>
              );
            })}

            {/* Content Management Section Title */}
            {/* <motion.li
                            className="px-4 mb-3"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5, duration: 0.3 }}
                        >
                            <div className="flex mt-5  items-center gap-3 text-slate-400 uppercase text-xs tracking-wider">
                                <HiOutlineTemplate className="text-base" />
                                <span>Content Management:</span>
                            </div>
                            <div className="mt-1 h-px bg-slate-700"></div>
                        </motion.li> */}

            {/* Content Management Links */}
            {contentLinks.map((link, index) => {
              const isActive =
                location.pathname === link.path ||
                location.pathname.startsWith(link.path + "/");

              return (
                <motion.li
                  key={`content-${index}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.55 + index * 0.05,
                    duration: 0.3,
                    ease: "easeInOut",
                  }}
                  onMouseEnter={() => setHoveredItem(`content-${index}`)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className="relative group"
                >
                  {/* Hover highlight effect */}
                  {hoveredItem === `content-${index}` && (
                    <motion.div
                      layoutId="sidebarContentHighlight"
                      className="absolute inset-0 bg-slate-700/50 rounded-lg"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}

                  <NavLink
                    onClick={() => window.innerWidth < 1024 && setIsOpen(false)}
                    to={link.path}
                    className={`flex items-center py-3 px-4 font-medium transition-all relative z-10`}
                  >
                    <motion.span
                      whileHover={{ scale: 1.1 }}
                      className={`mr-3 text-lg ${
                        isActive ? "text-teal-300" : "text-slate-300"
                      }`}
                    >
                      {link.icon}
                    </motion.span>
                    <span
                      className={`text-base ${
                        isActive ? "text-white font-semibold" : "text-slate-300"
                      }`}
                    >
                      {link.name}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="sidebarActiveIndicator"
                        className="absolute right-4 w-1.5 h-6 bg-teal-400 rounded-full"
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                        }}
                      />
                    )}
                  </NavLink>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </aside>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
