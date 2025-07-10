import { motion } from "framer-motion";
import { FiUser, FiMapPin, FiPhone } from "react-icons/fi";

const PersonalInfoSection = ({ user }) => (
    <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white p-6 rounded-xl shadow-sm space-y-5"
    >
        <h3 className="text-lg font-semibold text-heading flex items-center border-b pb-1.5">
            <FiUser className="mr-3 text-indigo-500" /> Personal Information
        </h3>

        <div className="flex items-center justify-between text-body">
            <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center">
                    <FiPhone className="text-indigo-500" />
                </div>
                <div>
                    <p className="text-xs text-para">Phone Number</p>
                    <p className="font-medium">{user.phone || "Not provided"}</p>
                </div>
            </div>
            <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
                    <FiMapPin className="text-red-500" />
                </div>
                <div>
                    <p className="text-xs text-para">Address</p>
                    <p className="font-medium">{user.address}</p>
                </div>
            </div>
        </div>
    </motion.div>
);

export default PersonalInfoSection;
