import { Outlet } from "react-router-dom";
import { RiUserSettingsLine } from "react-icons/ri";
import { motion } from "framer-motion";
import Breadcrumb from "../../shared/Breadcrumb.jsx";

export default function SettingsPage() {
  return (
    <section className="min-h-screen ">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb
          pageName={"Settings"}
          text={"Customize your settings and manage security preferences"}
          icon={<RiUserSettingsLine className="text-indigo-400" size={20} />}
        />

        {/* Main Content Area */}
        <motion.div className="backdrop-blur-sm sm:p-5   border border-gray-100 overflow-hidden"></motion.div>
        <div className="bg-white p-8 rounded-xl">
          <Outlet />
        </div>
      </div>
    </section>
  );
}
