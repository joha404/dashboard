import { motion } from "framer-motion";
import PropTypes from "prop-types";

export const InputField = ({
                               register,
                               name,
                               placeholder,
                               error,
                               type = "text",
                               autoFocus = false,
                               label,
                               isRequired = true,
                           }) => {
    const validationRules = isRequired
        ? { required: `${placeholder} is required` }
        : {};

    return (
        <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
        >
            <label className="block text-xs font-medium text-heading mb-1">
                {label}
            </label>
            <input
                {...register(name, validationRules)}
                type={type}
                placeholder={placeholder}
                autoFocus={autoFocus}
                className={`p-3 w-full bg-gray-50 border ${
                    error ? "border-rose-400" : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent text-gray-800 placeholder-gray-500 transition-all duration-200`}
            />
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
};

InputField.propTypes = {
    register: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    error: PropTypes.object,
    type: PropTypes.string,
    autoFocus: PropTypes.bool,
    label: PropTypes.string,
    isRequired: PropTypes.bool,
};
