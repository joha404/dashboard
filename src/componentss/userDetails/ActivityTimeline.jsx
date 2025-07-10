import { motion } from "framer-motion";
import { FiClock } from "react-icons/fi";
import { IoMdTime } from "react-icons/io";
import { formatDate } from "../../utils/formatDate.js";

const ActivityTimeline = ({ user }) => (
    <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mt-6 bg-white p-6 rounded-xl shadow-sm space-y-5"
    >
        <h3 className="text-lg font-semibold text-heading flex items-center pb-2 border-b border-gray-100">
            <IoMdTime className="mr-3 text-indigo-500" /> Activity Timelines
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center">
                    <FiClock className="text-indigo-500" />
                </div>
                <div>
                    <p className="text-xs text-para">Account Created</p>
                    <p className="font-medium">{formatDate(user.createdAt)}</p>
                </div>
            </div>

            <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center">
                    <FiClock className="text-indigo-500" />
                </div>
                <div>
                    <p className="text-xs text-para">Last Updated</p>
                    <p className="font-medium">{formatDate(user.updatedAt)}</p>
                </div>
            </div>
        </div>
    </motion.div>
);

export default ActivityTimeline;
