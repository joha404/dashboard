import { Link } from "react-router-dom";
import { FaHome, FaChevronRight } from "react-icons/fa";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

const Breadcrumb = ({ pageName, text = "" }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
      duration:0.5
      },
    },
  };

  return (
    <motion.div
      className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div>
        <motion.h2
          className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
          variants={itemVariants}
        >
          {pageName}
        </motion.h2>
        <motion.p
          className="text-md text-para font-light"
          variants={itemVariants}
        >
          {text}
        </motion.p>
      </div>

      <motion.nav variants={itemVariants}>
        <ol className="flex items-center gap-2">
          {pageName !== "Dashboard" && (
            <motion.li
              className="group"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              <Link
                className="flex items-center gap-2 font-medium text-gray-500 hover:text-indigo-600 transition-colors duration-300"
                to="/"
              >
                <motion.span
                  className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-50 group-hover:bg-indigo-100 transition-colors duration-300"
                  whileHover={{ rotate: 360 }}
                >
                  <FaHome className="text-indigo-600" />
                </motion.span>
                <span>Dashboard</span>
                <FaChevronRight className="text-xs text-gray-400 mx-1" />
              </Link>
            </motion.li>
          )}
          <motion.li
            className="flex items-center gap-2 font-medium text-indigo-600"
            variants={itemVariants}
          >
            <motion.span
              className="px-3 py-1 rounded-full bg-indigo-50"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {pageName}
            </motion.span>
          </motion.li>
        </ol>
      </motion.nav>
    </motion.div>
  );
};

Breadcrumb.propTypes = {
  pageName: PropTypes.string.isRequired,
  text: PropTypes.string,
};

export default Breadcrumb;
