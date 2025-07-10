import { motion } from "framer-motion";
import { FaUsers } from "react-icons/fa";
import { MdContactMail } from "react-icons/md";
import { RiAdminLine } from "react-icons/ri";
import { Outlet } from "react-router-dom";
import { NavItem } from "../../componentss/common/NavItem.jsx";
import { HiOutlineDocumentText } from "react-icons/hi";
import { AiOutlineLayout } from "react-icons/ai";

export default function CMS() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className={"max-w-[90%] mx-auto"}>
        <div className="mb-6">
          <motion.h3
            className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-1"
            initial={{ y: -5, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            Content Management System
          </motion.h3>
          <motion.p
            className="text-md text-para font-light"
            initial={{ y: -5, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Manage your website content, users, and system configurations with
            our intuitive CMS interface
          </motion.p>
        </div>

        {/* Main Container */}
        <div className="flex flex-col lg:flex-row   bg-gray-900 text-gray-200 rounded-xl overflow-hidden shadow-2xl border border-gray-700">
          {/* Sidebar - Enhanced with subtle gradient */}
          <aside className="w-full lg:w-72  p-6 bg-gradient-to-b from-gray-800 to-gray-900 border-b lg:border-b-0 lg:border-r border-gray-700">
            <nav className="space-y-1 mt-3">
              <NavItem to="hosts" label="Manage Hosts" icon={<RiAdminLine />} />
              <NavItem
                to="footer"
                label="Footer Content"
                icon={<AiOutlineLayout />}
              />
              <NavItem
                to="contact"
                label="ContactUS Content"
                icon={<MdContactMail />}
              />
              <NavItem
                to="pages"
                label="Manage Pages"
                icon={<HiOutlineDocumentText />}
              />
            </nav>

            {/* Help Card - More prominent */}
            <motion.div
              className="mt-auto pt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="p-4 bg-gray-800/80 rounded-lg border border-gray-700 hover:border-teal-400/30 transition-all duration-300 group">
                <h4 className="text-xs font-medium text-teal-400 mb-1">
                  Need help?
                </h4>
                <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
                  Contact our support team for assistance
                </p>
                <motion.div
                  className="mt-2 text-teal-400/50 group-hover:text-teal-400 transition-colors text-xs"
                  whileHover={{ x: 3 }}
                >
                  support@example.com
                </motion.div>
              </div>
            </motion.div>
          </aside>

          {/* Main Content - Improved layout */}
          <main className="flex-1 py-3 md:py-8 bg-gray-900/95 relative">
            {/* Decorative elements */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-teal-900/20 rounded-full filter blur-xl"></div>
            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-indigo-900/20 rounded-full filter blur-xl"></div>

            {/* Content container with subtle border */}
            <motion.div
              className="h-full overflow-auto max-w-full px-1.5 md:px-4"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Outlet />
            </motion.div>
          </main>
        </div>
      </div>
      {/* Header Section */}
    </motion.section>
  );
}
