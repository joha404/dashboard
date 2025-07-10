import { motion } from "framer-motion";
import { FiArrowLeft } from "react-icons/fi";
import { useSelector } from "react-redux";
import ProfileHeader from "./ProfileHeader.jsx";
import ProfilePageSkeleton from "../../skeletons/ProfilePageSkeleton.jsx";
import PersonalInfoSection from "./PersonalInfoSection.jsx";
import AccountInfoSection from "./AccountInfoSection.jsx";
import ActivityTimeline from "./ActivityTimeline.jsx";
import {useNavigate} from "react-router-dom";


const UserProfileCard = () => {
    const { user, isUserLoading } = useSelector((state) => state.admin);
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    }

    if (isUserLoading) return <ProfilePageSkeleton />;

    return (
        <motion.div initial={{ scale: 0.98 }} animate={{ scale: 1 }} className="mx-auto max-w-[80%] w-full">
            {/* Header Section */}
            <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4"
            >
                <button onClick={handleGoBack} className="flex items-center px-4 py-2 rounded-lg bg-white shadow-sm text-para hover:bg-gray-100 transition border border-gray-200">
                    <FiArrowLeft className="mr-2" /> Go Back
                </button>
                <h1 className="text-3xl font-bold text-heading">User Profile</h1>
            </motion.div>

            {/* Main Content */}
            <ProfileHeader user={user} />

            <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
                <PersonalInfoSection user={user} />
                <AccountInfoSection user={user} />
            </motion.div>

            <ActivityTimeline user={user} />
        </motion.div>
    );
};

export default UserProfileCard;
