import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FiAlertTriangle, FiArrowLeft } from "react-icons/fi";

const UnauthorizedPage = () => {
    const bgGradient = "bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900";
    const cardGradient = "bg-gradient-to-br from-gray-800 to-gray-900";

    return (
        <div className={`min-h-screen flex items-center justify-center p-4 ${bgGradient}`}>
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className={`max-w-md w-full rounded-2xl shadow-2xl overflow-hidden ${cardGradient}`}
                >
                    <div className="p-8 text-center">
                        <motion.div
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring" }}
                            className="flex justify-center mb-6"
                        >
                            <div className="p-4 bg-red-500/20 rounded-full">
                                <FiAlertTriangle className="text-red-400 text-5xl" />
                            </div>
                        </motion.div>

                        <h1 className="text-3xl font-bold text-white mb-2">Access Denied</h1>
                        <p className="text-gray-300 mb-6">
                            You don't have permission to access this page.
                        </p>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="mb-6"
                            >
                                <p className="text-sm text-gray-400 mb-1">Required roles:</p>
                                <div className="flex flex-wrap justify-center gap-2">
                                        <motion.span
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.5 }}
                                            className="px-3 py-1 bg-gray-700/50 text-indigo-300 rounded-full text-xs font-medium"
                                        >
                                            Admin
                                        </motion.span>
                                </div>
                            </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                        >
                            <Link
                                to={"/login"}
                                replace
                                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-colors duration-300 group"
                            >
                                <FiArrowLeft className="mr-2 transition-transform group-hover:-translate-x-1" />
                                Return to Previous Page
                            </Link>
                        </motion.div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default UnauthorizedPage;