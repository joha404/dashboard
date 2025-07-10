import { motion } from "framer-motion";
import { FiShield } from "react-icons/fi";
import { FaCrown } from "react-icons/fa";
import RoleBadge from "./RoleBadge.jsx";

const AccountInfoSection = ({ user }) => (
    <motion.div
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white p-6 rounded-xl shadow-sm space-y-5"
    >
        <h3 className="text-lg font-semibold text-heading flex items-center border-b pb-1.5">
            <FiShield className="mr-3 text-indigo-500" /> Account Details
        </h3>

        <div className="flex items-center justify-between text-body">
            <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center">
                    <FiShield className="text-indigo-500" />
                </div>
                <div>
                    <p className="text-xs text-para">Account Status</p>
                    <div className="flex items-center gap-2 mt-1">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${user.isActive ? "bg-green-50 text-green-700" : "bg-error/5 text-red-700"}`}>
                            {user.isActive ? "Active" : "Inactive"}
                        </span>
                        {user.isDeleted && (
                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-body">
                                Deleted
                            </span>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center">
                    <FaCrown className="text-indigo-500" />
                </div>
                <div>
                    <p className="text-xs text-para">User Role</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                        <RoleBadge user={user} />
                    </div>
                </div>
            </div>
        </div>
    </motion.div>
);

export default AccountInfoSection;
