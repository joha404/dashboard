import { useRouteError } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiAlertCircle, FiHome, FiRefreshCw } from 'react-icons/fi';

export default function ErrorBoundary() {
    const error = useRouteError();
    console.error(error);

    const errorMessage = error.statusText || error.message || 'Unknown error occurred';
    const statusCode = error.status || '???';

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-6"
        >
            <motion.div
                initial={{ y: -20, scale: 0.95 }}
                animate={{ y: 0, scale: 1 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="bg-gray-800/90 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden w-full max-w-md border border-gray-700/50"
            >
                <div className="p-8 text-center">
                    <motion.div
                        animate={{
                            rotate: [0, 10, -10, 0],
                            scale: [1, 1.1, 1.1, 1]
                        }}
                        transition={{
                            duration: 0.6,
                            ease: "easeInOut",
                            repeat: Infinity,
                            repeatType: "mirror",
                            repeatDelay: 3
                        }}
                        className="flex justify-center mb-6"
                    >
                        <div className="p-4 bg-red-500/20 rounded-full">
                            <FiAlertCircle className="text-red-400 text-5xl" />
                        </div>
                    </motion.div>

                    <div className="mb-2">
                        <span className="text-8xl font-bold text-red-400">{statusCode}</span>
                    </div>

                    <h1 className="text-2xl font-bold text-white mb-2">Oops! Something went wrong</h1>
                    <p className="text-gray-300 mb-6">
                        {errorMessage}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => window.location.reload()}
                            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
                        >
                            <FiRefreshCw />
                            Try Again
                        </motion.button>

                        <motion.a
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            href="/"
                            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
                        >
                            <FiHome />
                            Go Home
                        </motion.a>
                    </div>
                </div>

                <div className="px-8 py-4 bg-black/10 text-center border-t border-gray-700/50">
                    <p className="text-xs text-gray-500">
                        Need help? Contact support@example.com
                    </p>
                </div>
            </motion.div>
        </motion.div>
    );
}