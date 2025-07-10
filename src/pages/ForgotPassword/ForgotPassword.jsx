// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   FiMail,
//   FiArrowLeft,
//   FiAlertCircle,
//   FiX,
//   FiCheckCircle,
// } from "react-icons/fi";
// import BubbleAnimation from "../../componentss/common/BubbleAnimation.jsx";
// import { toast } from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
// import { forgotPasswordRequest } from "../../api/auth-api.js";

// export default function ForgotPassword() {
//   const [isFormVisible, setIsFormVisible] = useState(true);
//   const [isSubmitting, setIsSubmitted] = useState(false);
//   const [showSuccessModal, setShowSuccessModal] = useState(false);
//   const [forgotError, setForgotError] = useState("");
//   const navigate = useNavigate();
//   const from = location.state?.from?.pathname || "/login";
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   useEffect(() => {
//     setTimeout(() => setIsFormVisible(true), 300);
//   }, []);

//   const onSubmit = async (data) => {
//     setIsSubmitted(true);
//     setForgotError("");
//     await new Promise((resolve) => setTimeout(resolve, 1500));
//     try {
//       const result = await forgotPasswordRequest(data);
//       if (result.status) {
//         sessionStorage.setItem("userEmail", data.email);
//         setShowSuccessModal(true);
//       } else {
//         setForgotError(result.message || "Invalid credentials");
//         toast.error(result.message || "Reset password request failed");
//       }
//     } catch (error) {
//       console.log(error);
//       setForgotError("An unexpected error occurred");
//       toast.error("Reset password request failed");
//     } finally {
//       setIsSubmitted(false);
//     }
//   };

//   const handleSuccessConfirm = () => {
//     setShowSuccessModal(false);
//     navigate("/otp-verification", { replace: true });
//   };

//   const handleModalClose = () => {
//     setShowSuccessModal(false);
//     navigate(from, { replace: true });
//   };

//   return (
//     <div className={`min-h-screen flex items-center justify-center bg-white`}>
//       {/* Animated floating particles - darker version */}
//       {/* <BubbleAnimation  /> */}

//       <AnimatePresence>
//         {isFormVisible && (
//           <motion.div
//             initial={{ opacity: 0, y: 20, scale: 0.95 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
//             className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg border border-gray-200 relative overflow-hidden"
//           >
//             {/* Decorative elements - darker */}
//             <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-100 rounded-full filter blur-xl"></div>
//             <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-indigo-100 rounded-full filter blur-xl"></div>

//             <div className="relative z-10">
//               {forgotError && (
//                 <motion.div
//                   initial={{ opacity: 0, y: -10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0 }}
//                   transition={{ duration: 0.3 }}
//                   className="mb-6 p-3 bg-red-100 border border-red-200 rounded-lg flex items-start gap-3"
//                 >
//                   <FiAlertCircle className="text-red-500 mt-0.5 flex-shrink-0" />
//                   <p className="text-sm text-red-600">{forgotError}</p>
//                 </motion.div>
//               )}
//               <>
//                 {/* Back button */}
//                 <motion.a
//                   href="/login"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ delay: 0.2 }}
//                   className="flex items-center text-gray-400 hover:text-gray-200 transition-colors mb-6 -mt-2"
//                 >
//                   <FiArrowLeft className="mr-2" />
//                   Back to login
//                 </motion.a>

//                 {/* Header */}
//                 <div className="text-center mb-8">
//                   <motion.div
//                     initial={{ scale: 0.8 }}
//                     animate={{ scale: 1 }}
//                     transition={{ delay: 0.2 }}
//                     className="inline-block p-4 bg-blue-100 rounded-full mb-4"
//                   >
//                     <FiMail className="text-3xl text-blue-600" />
//                   </motion.div>
//                   <motion.h2
//                     initial={{ y: -10, opacity: 0 }}
//                     animate={{ y: 0, opacity: 1 }}
//                     transition={{ delay: 0.3 }}
//                     className="text-2xl font-bold text-gray-800 mb-2"
//                   >
//                     Forgot Password?
//                   </motion.h2>
//                   <motion.p
//                     initial={{ y: -10, opacity: 0 }}
//                     animate={{ y: 0, opacity: 1 }}
//                     transition={{ delay: 0.4 }}
//                     className="text-gray-600"
//                   >
//                     Enter your email to reset your password
//                   </motion.p>
//                 </div>

//                 {/* Form */}
//                 <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//                   <motion.div
//                     initial={{ x: -20, opacity: 0 }}
//                     animate={{ x: 0, opacity: 1 }}
//                     transition={{ delay: 0.5 }}
//                     className="relative"
//                   >
//                     <div className="relative w-full">
//                       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                         <FiMail className="text-gray-500 text-lg" />
//                       </div>
//                       <input
//                         {...register("email", {
//                           required: "Email is required",
//                           pattern: {
//                             value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//                             message: "Invalid email address",
//                           },
//                         })}
//                         type="email"
//                         placeholder="Your email address"
//                         className={`pl-10 pr-4 py-3 w-full bg-gray-50 border ${
//                           errors.email ? "border-rose-400" : "border-gray-300"
//                         } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent text-gray-800 placeholder-gray-500 transition-all duration-200`}
//                       />
//                     </div>

//                     {errors.email && (
//                       <motion.p
//                         initial={{ opacity: 0, y: -5 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         className="text-sm text-red-500 mt-1"
//                       >
//                         {errors.email.message}
//                       </motion.p>
//                     )}
//                   </motion.div>

//                   <motion.div
//                     initial={{ y: 10, opacity: 0 }}
//                     animate={{ y: 0, opacity: 1 }}
//                     transition={{ delay: 0.6 }}
//                   >
//                     <button
//                       type="submit"
//                       disabled={isSubmitting}
//                       className={`w-full py-3 px-4 rounded-lg bg-gradient-to-r from-primary to-blue-600 hover:from-blue-500 hover:to-primary-hover text-white font-medium shadow-lg hover:shadow-purple-500/30 transition-all duration-300 flex items-center justify-center ${
//                         isSubmitting ? "opacity-80 cursor-not-allowed" : ""
//                       }`}
//                     >
//                       {isSubmitting ? (
//                         <>
//                           <svg
//                             className="animate-spin -ml-1 mr-2 h-6 w-6 text-white"
//                             xmlns="http://www.w3.org/2000/svg"
//                             fill="none"
//                             viewBox="0 0 24 24"
//                           >
//                             <circle
//                               className="opacity-25"
//                               cx="12"
//                               cy="12"
//                               r="10"
//                               stroke="currentColor"
//                               strokeWidth="4"
//                             ></circle>
//                             <path
//                               className="opacity-75"
//                               fill="currentColor"
//                               d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                             ></path>
//                           </svg>
//                         </>
//                       ) : (
//                         "Send Request"
//                       )}
//                     </button>
//                   </motion.div>
//                 </form>
//               </>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Success Modal */}
//       <AnimatePresence>
//         {showSuccessModal && (
//           <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
//             <motion.div
//               initial={{ opacity: 0, scale: 0.9, y: 20 }}
//               animate={{ opacity: 1, scale: 1, y: 0 }}
//               exit={{ opacity: 0, scale: 0.9, y: 20 }}
//               transition={{ type: "spring", damping: 25, stiffness: 300 }}
//               className="relative bg-white rounded-2xl border border-gray-200 shadow-2xl overflow-hidden w-full max-w-md"
//             >
//               {/* Close Button */}
//               <button
//                 onClick={handleModalClose}
//                 className="absolute top-4 right-4 p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition-all"
//               >
//                 <FiX size={18} />
//               </button>

//               {/* Modal Content */}
//               <div className="p-6 sm:p-7">
//                 <div className="flex items-start gap-4 mb-5">
//                   <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20">
//                     <FiCheckCircle className="text-green-400" size={24} />
//                   </div>
//                   <div>
//                     <h3 className="text-xl font-semibold text-gray-700 mb-1">
//                       Email send Successfully!
//                     </h3>
//                     <p className="text-sm text-gray-500/90">
//                       We've sent a email on your password reset request. Please
//                       check your email
//                     </p>
//                   </div>
//                 </div>

//                 <div className="space-y-4">
//                   <div className="pt-4 flex justify-end gap-3 border-t border-gray-700/50">
//                     <motion.button
//                       onClick={handleModalClose}
//                       className="px-5 py-2.5 text-sm font-medium rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-200 transition-colors"
//                       whileHover={{ y: -1 }}
//                       whileTap={{ scale: 0.98 }}
//                     >
//                       Close
//                     </motion.button>
//                     <motion.button
//                       onClick={handleSuccessConfirm}
//                       className="px-5 py-2.5 text-sm font-medium rounded-lg bg-green-600 hover:bg-green-500 text-white flex items-center gap-2 transition-colors"
//                       whileHover={{ y: -1, backgroundColor: "#22c55e" }}
//                       whileTap={{ scale: 0.98 }}
//                     >
//                       <FiCheckCircle size={16} />
//                       Continue
//                     </motion.button>
//                   </div>
//                 </div>
//               </div>

//               {/* Ambient Glow */}
//               <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-green-500/10 rounded-full blur-[80px] pointer-events-none" />
//             </motion.div>
//           </div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

import React from "react";

export default function ForgotPassword() {
  return <div>ForgotPassword</div>;
}
