import { FiEye, FiEyeOff } from "react-icons/fi";
import { IoMdLock } from "react-icons/io";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

export default function PasswordField({label, name, register, error, type, toggleVisibility, placeholder, validation}) {
    return (
        <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3,duration:0.5 }}
            className="w-full"
        >
            {label && (
                <label
                    htmlFor={name}
                    className="block text-sm font-medium text-gray-700 mb-1"
                >
                    {label}
                </label>
            )}

            <div className="relative h-12">
                {/* Left Icon */}
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <IoMdLock className="text-gray-500 text-lg" />
                </div>

                {/* Input Field */}
                <input
                    id={name}
                    {...register(name, validation)}
                    type={type}
                    placeholder={placeholder}
                    className={`pl-10 pr-10 py-3 w-full bg-gray-50 border ${
                        error ? "border-rose-400" : "border-gray-300"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent text-gray-800 placeholder-gray-500 transition-all duration-200`}
                />

                {/* Toggle Visibility */}
                <button
                    type="button"
                    onClick={toggleVisibility}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                >
                    {type === "text" ? <FiEyeOff className="text-lg" /> : <FiEye className="text-lg" />}
                </button>
            </div>

            {/* Error Message */}
            {error && (
                <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-rose-500 mt-1"
                >
                    {error.message}
                </motion.p>
            )}
        </motion.div>
    );
}

PasswordField.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    register: PropTypes.func.isRequired,
    error: PropTypes.object,
    type: PropTypes.string.isRequired,
    toggleVisibility: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    validation: PropTypes.object,
};
