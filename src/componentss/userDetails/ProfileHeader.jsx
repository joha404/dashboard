import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaUserCheck, FaUserTimes } from "react-icons/fa";
import { FiCheckCircle, FiMail, FiX } from "react-icons/fi";
import RoleBadge from "./RoleBadge.jsx";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { fetchSingleUser, manageUserStatus } from "../../api/admin-api.js";
import UserAvatar from "../common/UserAvatar.jsx";

const ProfileHeader = () => {
  const { user } = useSelector((state) => state.admin);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleModal = () => setIsModalOpen((prev) => !prev);

  const handleConfirm = async (id) => {
    setIsSubmitting(true);
    try {
      let result = await manageUserStatus(id);
      setIsModalOpen(false);
      if (result?.status) {
        toast.success(result.message);
        await fetchSingleUser(id);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Cloudinary update error:", error);
      toast.error("Something went wrong!");
    }
    setIsSubmitting(false);
  };

  const isActive = user.isActive;

  return (
    <div className="bg-white p-6 flex items-center justify-between rounded-xl shadow-sm border border-gray-100 mb-6">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <motion.div whileHover={{ scale: 1.03 }} className="relative">
          <UserAvatar
            avatar={user?.avatar}
            fullName={user?.fullName}
            styleCSS={"w-24 h-24"}
          />
          <div className="absolute bottom-0 right-0 flex items-center justify-center w-7 h-7 rounded-full bg-white shadow-sm">
            {isActive ? (
              <FaUserCheck className="text-green-500 text-sm" />
            ) : (
              <FaUserTimes className="text-red-500 text-sm" />
            )}
          </div>
        </motion.div>

        <div className="text-center md:text-left space-y-2">
          <h2 className="text-2xl font-bold text-gray-800">{user.fullName}</h2>
          <p className="text-body flex items-center justify-center md:justify-start">
            <FiMail className="mr-2 text-indigo-500" />
            {user.email}
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-2">
            <RoleBadge user={user} />
          </div>
        </div>
      </div>

      <motion.button
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        whileHover={{ scale: 1 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleModal}
        className="bg-gradient-to-r from-primary to-primary-hover hover:from-primary-hover hover:to-primary text-[18px] font-[600] capitalize rounded-lg text-white py-2.5 px-4 shadow-lg hover:shadow-black/30"
      >
        {user.isActive === false ? (
          <h1 className="text-white">Active User</h1>
        ) : (
          <h1 className=" text-error">Deactive User </h1>
        )}
      </motion.button>

      {/* MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative bg-white rounded-2xl border border-gray-200 shadow-2xl overflow-hidden w-full max-w-md"
            >
              {/* Close Button */}
              <button
                onClick={toggleModal}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition-all"
              >
                <FiX size={18} />
              </button>

              {/* Modal Body */}
              <div className="p-6 sm:p-7">
                <div className="flex items-start gap-4 mb-5">
                  <motion.div
                    initial={{ rotate: 0 }}
                    animate={{ rotate: [0, 15, -15, 15, 0] }}
                    transition={{ duration: 0.6 }}
                    className={`p-3 rounded-xl border ${
                      isActive
                        ? "border-red-200 bg-red-50"
                        : "border-green-200 bg-green-100"
                    }`}
                  >
                    <FiCheckCircle
                      size={24}
                      className={isActive ? "text-error" : "text-green-600"}
                    />
                  </motion.div>

                  <div>
                    <h3
                      className={`text-xl font-semibold ${
                        isActive ? "text-error" : "text-green-600"
                      } mb-1`}
                    >
                      {isActive ? "Deactivate account" : "Activate account"}?
                    </h3>
                    <p className="text-sm text-gray-600">
                      {isActive
                        ? "Are you sure you want to deactivate this user?"
                        : "Are you sure you want to activate this user?"}
                    </p>
                  </div>
                </div>

                <div className="pt-4 flex justify-end gap-3 border-t border-gray-200">
                  <motion.button
                    className="px-5 py-2.5 text-sm font-medium rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 transition-colors"
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsModalOpen(false)}
                  >
                    Close
                  </motion.button>

                  <motion.button
                    className={`px-5 py-2.5 text-sm min-w-[100px] font-medium rounded-lg flex items-center justify-center transition-colors ${
                      isSubmitting ? "opacity-80 cursor-not-allowed" : ""
                    } ${
                      isActive
                        ? "bg-error hover:bg-error/90 text-white"
                        : "bg-green-600 hover:bg-green-500 text-white"
                    }`}
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleConfirm(user._id)}
                  >
                    {isSubmitting ? (
                      <svg
                        className="animate-spin  h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    ) : (
                      <>
                        <FiCheckCircle size={16} />
                        Confirm
                      </>
                    )}
                  </motion.button>
                </div>
              </div>

              {/* Visual Decoration */}
              <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-green-100 rounded-full blur-[80px] pointer-events-none" />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfileHeader;
