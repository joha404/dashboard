import { Outlet } from "react-router-dom";
import { RiContactsBook2Line, RiUserSettingsLine } from "react-icons/ri";
import { motion } from "framer-motion";
import { MdOutlineDescription } from "react-icons/md";
import Breadcrumb from "../../shared/Breadcrumb.jsx";
import { NavItem } from "../../componentss/common/NavItem.jsx";
import { FaUsers } from "react-icons/fa";
import { GiChoice } from "react-icons/gi";
export default function AboutPage() {
  return (
    <section className="min-h-screen ">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb
          pageName={"About Page"}
          text={"Customize your About Page and About Us Section"}
          icon={<RiUserSettingsLine className="text-indigo-400" size={20} />}
        />

        {/* Navigation Tabs */}
        <motion.nav
          className="flex items-center overflow-x-auto w-full select-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
          <div className="flex space-x-1 bg-gradient-to-r from-indigo-950 via-gray-950 to-slate-900 backdrop-blur-lg w-full rounded-t-xl px-2 py-3 shadow-sm border border-gray-100">
            <NavItem
              to="about-hero"
              label="About Hero "
              icon={<MdOutlineDescription size={20} />}
            />
            <NavItem
              to="about-content"
              label="About Content"
              icon={<RiContactsBook2Line size={20} />}
            />
            <NavItem
              to="who-we-are"
              label="Who We Are"
              icon={<FaUsers size={20} />}
            />
            <NavItem
              to="why-choice-us"
              label="Why Choice Us"
              icon={<GiChoice size={20} />}
            />
          </div>
        </motion.nav>

        {/* Main Content Area */}
        <motion.div className="backdrop-blur-sm sm:p-5   border border-gray-100 overflow-hidden"></motion.div>
        <div className="bg-white p-8 rounded-xl">
          <Outlet />
        </div>
      </div>
    </section>
  );
}
