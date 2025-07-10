import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowLeft } from "react-icons/fi";

export default function NotFoundPage() {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white/90  text-center px-6">
            <motion.h1
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
                className="text-[8rem] font-extrabold text-error drop-shadow-lg animate-bounce"
            >
                404
            </motion.h1>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-2xl md:text-3xl text-heading font-bold mt-2"
            >
                Oops! Page Not Found
            </motion.p>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-gray-400 mt-2 max-w-md"
            >
                The page you are looking for might have been moved, deleted, or never existed.
            </motion.p>

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-6"
            >
                <button
                    onClick={goBack}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-error to-error/90
            hover:from-error/90 hover:to-error text-white font-semibold rounded-xl shadow-md
            transition duration-300 ease-in-out transform hover:scale-105"
                >
                    <FiArrowLeft className="text-lg" />
                    Go back
                </button>
            </motion.div>
        </div>
    );
}
