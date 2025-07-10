import { motion } from "framer-motion";
import { FiX } from "react-icons/fi";
import PropTypes from "prop-types";

const CancelButton = ({ onClick }) => {
    return (
        <motion.button
            type="button"
            onClick={onClick}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            whileHover={{ scale: 1 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 rounded-md text-sm font-medium flex items-center gap-1 bg-error/10 border border-error/10
            text-error shadow-lg hover:bg-error/30 hover:shadow-black/30 "
        >
            <FiX className="text-[15px]" />
            Cancel
        </motion.button>
    );
};

CancelButton.propTypes = {
    onClick: PropTypes.func.isRequired,
}

export default CancelButton;
