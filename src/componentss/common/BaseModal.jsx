import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";

const modalOverlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.9, y: -20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 25 },
  },
};

export default function BaseModal({ isOpen, onClose, children, title }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
            variants={modalOverlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
          />
          {/* Modal Content */}
          <motion.div
            className="fixed inset-0 flex items-center justify-center p-4 z-50"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            aria-modal="true"
            role="dialog"
            tabIndex={-1}
          >
            <div
              className="relative max-w-xl w-full p-6 overflow-y-auto max-h-[90vh] bg-white rounded-2xl border border-gray-200 shadow-2xl"
              onClick={(e) => e.stopPropagation()} // Prevent close on inside click
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 transition"
                aria-label="Close modal"
              >
                <FiX size={24} />
              </button>
              {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
