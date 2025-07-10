import { motion } from "framer-motion";
import UserProfileCard from "../../componentss/userDetails/UserProfileCard.jsx";
import {useEffect} from "react";
import {useParams} from "react-router-dom";
import {fetchSingleUser} from "../../api/admin-api.js";
import {useSelector} from "react-redux";


const UserDetails = () => {
    const {id} = useParams();

    useEffect(() => {
        (async () => {
            await fetchSingleUser(id);
        })()
    },[id])

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen  p-4 md:p-8"
        >
            <UserProfileCard  />
        </motion.div>
    );
};

export default UserDetails;
