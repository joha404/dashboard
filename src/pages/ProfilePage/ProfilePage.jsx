import { FaUserCheck, FaStar, FaCamera } from "react-icons/fa";
import { FiMail, FiEdit2, FiSettings } from "react-icons/fi";
import { RiShieldUserLine } from "react-icons/ri";
import Breadcrumb from "../../shared/Breadcrumb.jsx";
import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useSelector } from "react-redux";
import { SlLocationPin } from "react-icons/sl";
import { HiOutlinePhone } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../../api/auth.js";
import AvatarUploader from "../../componentss/profileInfo/AvatarUploader.jsx";
import ProfileImageUploader from "../../componentss/profileInfo/ProfileImageUploader.jsx";
import UpdateProfile from "../../componentss/profileInfo/UpdateProfile.jsx";
const placeholderImage =
  "https://static.vecteezy.com/system/resources/previews/036/594/092/non_2x/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg";
const ProfilePage = () => {
  const controls = useAnimation();
  // const userData = useSelector((state) => state.user.userData);
  // const isLoading = useSelector((state) => state.user.isUserDataLoading);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState([]);

  const fetchProfile = async () => {
    const res = await getProfile();
    setUserData(res.data);
  };
  useEffect(() => {
    fetchProfile();
  }, []);
  const closeEditModal = () => {
    setIsEditing(false);
  };

  const navigate = useNavigate();
  return (
    <section className="relative">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
        }}
      >
        <Breadcrumb
          pageName="My Profile"
          text="Manage your personal information and settings"
          icon={<RiShieldUserLine className="text-primary mr-2" />}
        />

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.05,
          }}
          className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl  border border-gray-100 mb-8 overflow-hidden relative"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-r from-primary to-primary-hover opacity-10 -mr-10 -mt-10 rounded-full"></div>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <ProfileImageUploader
                fetchProfile={fetchProfile}
                userData={userData}
              />

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.1,
                }}
                className="text-center md:text-left space-y-3"
              >
                <motion.h2 className="text-3xl font-bold text-heading bg-clip-text bg-gradient-to-r from-heading to-para">
                  {userData.fullName}
                </motion.h2>

                <motion.p className="text-para flex items-center justify-center md:justify-start text-lg">
                  <FiMail className="mr-3 text-indigo-500 text-xl" />
                  {userData.email}
                </motion.p>

                <motion.div className="flex flex-wrap justify-center md:justify-start gap-3">
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-sm font-medium">
                    <FaStar className="mr-1 text-amber-500" />
                    {userData.role && "Admin"}
                  </span>
                </motion.div>
                <motion.p className="text-para flex items-center justify-center md:justify-start text-lg">
                  <HiOutlinePhone className="mr-3 text-indigo-500 text-xl" />
                  {userData.phone === ""
                    ? "Add a Phone Number"
                    : userData.phone}
                </motion.p>
              </motion.div>
            </div>

            {/* Action Buttons */}
            <motion.div className="flex flex-col sm:flex-row lg:flex-col gap-3">
              <motion.button
                onClick={() => setIsEditing(true)}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 5px 15px rgba(99, 102, 241, 0.3)",
                }}
                whileTap={{ scale: 0.98 }}
                className="relative overflow-hidden group flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-primary-hover hover:from-primary-hover hover:to-primary text-lg font-semibold capitalize rounded-xl text-white py-3 px-6 shadow-lg min-w-[150px]"
              >
                <FiEdit2 className="text-lg" />
                Edit Profile
                <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
              </motion.button>

              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 5px 15px rgba(156, 163, 175, 0.3)",
                }}
                onClick={() => navigate("/dashboard/settings/change-password")}
                whileTap={{ scale: 0.98 }}
                className="relative overflow-hidden group flex items-center justify-center gap-2 bg-white border border-gray-200 hover:border-gray-300 text-lg font-semibold text-gray-700 rounded-xl py-3 px-6  min-w-[150px]"
              >
                <FiSettings className="text-lg" />
                Settings
                <span className="absolute inset-0 bg-gray-100 opacity-0 group-hover:opacity-30 transition-opacity duration-300"></span>
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
      {isEditing && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md relative">
            <UpdateProfile
              fetchProfile={fetchProfile}
              closeEditModal={closeEditModal}
              userData={userData}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default ProfilePage;

const getInitials = (name = "") => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};
