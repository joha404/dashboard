// import { useState, useRef, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { FiAlertCircle, FiArrowLeft, FiCheckCircle, FiX } from "react-icons/fi";
// import { FaShieldAlt } from "react-icons/fa";
// import BubbleAnimation from "../../componentss/common/BubbleAnimation.jsx";
// import { useNavigate } from "react-router-dom";
// import { resendOTPRequest, verifyOTPRequest } from "../../api/auth-api.js";
// import { toast } from "react-hot-toast";

// export default function OTPVerification() {
//   const [otp, setOtp] = useState(Array(6).fill(""));
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [isResending, setIsResending] = useState(false);
//   const [countdown, setCountdown] = useState(60);
//   const inputs = useRef([]);
//   const [otpError, setOtpError] = useState("");
//   const navigate = useNavigate();
//   const [showSuccessModal, setShowSuccessModal] = useState(false);

//   // Auto-focus and handle OTP input
//   const handleChange = (e, index) => {
//     const value = e.target.value;
//     if (isNaN(value)) return;

//     const newOtp = [...otp];
//     newOtp[index] = value.substring(value.length - 1);
//     setOtp(newOtp);

//     // Auto-focus next input
//     if (value && index < 5 && inputs.current[index + 1]) {
//       inputs.current[index + 1].focus();
//     }
//   };

//   // Handle backspace
//   const handleKeyDown = (e, index) => {
//     if (
//       e.key === "Backspace" &&
//       !otp[index] &&
//       index > 0 &&
//       inputs.current[index - 1]
//     ) {
//       inputs.current[index - 1].focus();
//     }
//   };

//   // Handle paste
//   const handlePaste = (e) => {
//     e.preventDefault();
//     const pasteData = e.clipboardData.getData("text/plain").slice(0, 6);
//     if (isNaN(pasteData)) return;

//     const newOtp = [...otp];
//     for (let i = 0; i < pasteData.length; i++) {
//       if (i < 6) newOtp[i] = pasteData[i];
//     }
//     setOtp(newOtp);

//     // Focus last input
//     const lastIndex = Math.min(pasteData.length, 5);
//     if (inputs.current[lastIndex]) {
//       inputs.current[lastIndex].focus();
//     }
//   };
//   const email = sessionStorage.getItem("userEmail");
//   // Submit OTP
//   const handleSubmit = async (e) => {
//     setOtpError("");
//     e.preventDefault();
//     const enteredOtp = otp.join("");
//     if (enteredOtp.length === 6) {
//       setIsSubmitted(true);
//       try {
//         if (!email || !email.includes("@")) {
//           return {
//             status: false,
//             message: "Please provide a valid email address",
//           };
//         }
//         const OTPdata = { otp: enteredOtp, email };
//         const result = await verifyOTPRequest(OTPdata);
//         if (result.status) {
//           setShowSuccessModal(true);
//         } else {
//           setOtpError(result.message || "Invalid credentials");
//           toast.error(result.message || "OTP verification failed");
//         }
//       } catch (error) {
//         console.log(error);
//         setOtpError("An unexpected error occurred");
//         toast.error("OTP verification failed");
//       } finally {
//         setIsSubmitted(false);
//       }
//     }
//   };

//   // Resend OTP
//   const handleResend = async () => {
//     if (!email || !email.includes("@")) {
//       return {
//         status: false,
//         message: "Please provide a valid email address",
//       };
//     }
//     setIsResending(true);
//     setTimeout(() => setIsResending(false), 1500);
//     let result = await resendOTPRequest(email);
//     if (result) {
//       toast.success(result.message || "OTP send successfully");
//     } else {
//       setOtpError(result.message || "Invalid credentials");
//       toast.error(result.message || "OTP verification failed");
//     }
//     setIsResending(false);
//     setCountdown(30);
//   };

//   const handleSuccessConfirm = () => {
//     setShowSuccessModal(false);
//     navigate("/reset-password", { replace: true });
//   };

//   const handleModalClose = () => {
//     setShowSuccessModal(false);
//   };

//   // Countdown timer
//   useEffect(() => {
//     if (countdown > 0 && !isResending) {
//       const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
//       return () => clearTimeout(timer);
//     }
//   }, [countdown, isResending]);

//   return (
//     <div className={`min-h-screen flex items-center justify-center bg-white`}>
//       {/* Animated floating particles - darker version */}
//       <BubbleAnimation darkMode={true} />

//       <AnimatePresence>
//         <motion.div
//           initial={{ opacity: 0, y: 20, scale: 0.95 }}
//           animate={{ opacity: 1, y: 0, scale: 1 }}
//           transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
//           className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg border border-gray-200 relative overflow-hidden"
//         >
//           {/* Decorative elements - darker */}
//           <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-100 rounded-full filter blur-xl"></div>
//           <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-indigo-100 rounded-full filter blur-xl"></div>

//           <div className="relative z-10">
//             {otpError && (
//               <motion.div
//                 initial={{ opacity: 0, y: -10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0 }}
//                 transition={{ duration: 0.3 }}
//                 className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-3"
//               >
//                 <FiAlertCircle className="text-red-500 mt-0.5 flex-shrink-0" />
//                 <p className="text-sm text-red-600">{otpError}</p>
//               </motion.div>
//             )}
//             <>
//               {/* Back button */}
//               <motion.a
//                 href="/login"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.2 }}
//                 className="flex items-center text-gray-400 hover:text-gray-200 transition-colors mb-6 -mt-2"
//               >
//                 <FiArrowLeft className="mr-2" />
//                 Back to login
//               </motion.a>

//               {/* Header */}
//               <div className="text-center mb-8">
//                 <motion.div
//                   initial={{ scale: 0.8 }}
//                   animate={{ scale: 1 }}
//                   transition={{ delay: 0.2 }}
//                   className="inline-block p-4 bg-blue-100 rounded-full mb-4"
//                 >
//                   <FaShieldAlt className="text-3xl text-blue-600" />
//                 </motion.div>
//                 <motion.h2
//                   initial={{ y: -10, opacity: 0 }}
//                   animate={{ y: 0, opacity: 1 }}
//                   transition={{ delay: 0.3 }}
//                   className="text-3xl font-bold text-gray-800 mb-2"
//                 >
//                   OTP Verification
//                 </motion.h2>
//                 <motion.p
//                   initial={{ y: -10, opacity: 0 }}
//                   animate={{ y: 0, opacity: 1 }}
//                   transition={{ delay: 0.4 }}
//                   className="text-gray-600"
//                 >
//                   Enter the 6-digit code sent to your email
//                 </motion.p>
//               </div>

//               {/* OTP Input Form */}
//               <form onSubmit={handleSubmit} className="space-y-8">
//                 <motion.div
//                   initial={{ x: -20, opacity: 0 }}
//                   animate={{ x: 0, opacity: 1 }}
//                   transition={{ delay: 0.5 }}
//                   className="flex justify-center space-x-3"
//                 >
//                   {otp.map((digit, index) => (
//                     <input
//                       key={index}
//                       type="text"
//                       maxLength="1"
//                       value={digit}
//                       onChange={(e) => handleChange(e, index)}
//                       onKeyDown={(e) => handleKeyDown(e, index)}
//                       onPaste={handlePaste}
//                       ref={(el) => (inputs.current[index] = el)}
//                       className="w-12 h-16 text-3xl bg-gray-50 border text-center rounded-lg  focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent text-gray-800 placeholder-gray-500 transition-all"
//                       autoFocus={index === 0}
//                     />
//                   ))}
//                 </motion.div>

//                 <motion.div
//                   initial={{ y: 10, opacity: 0 }}
//                   animate={{ y: 0, opacity: 1 }}
//                   transition={{ delay: 0.6 }}
//                   className="flex flex-col items-center space-y-6"
//                 >
//                   <button
//                     type="submit"
//                     className={`w-full py-3 px-4 rounded-lg bg-gradient-to-r from-primary to-blue-600 hover:from-blue-500 hover:to-primary-hover disabled:bg-gray-400 text-white font-medium shadow-lg hover:shadow-purple-500/30 transition-all duration-300 flex items-center justify-center ${
//                       otp.join("").length !== 6
//                         ? "opacity-70 cursor-not-allowed"
//                         : ""
//                     }`}
//                     disabled={otp.join("").length !== 6}
//                   >
//                     {isSubmitted ? (
//                       <>
//                         <svg
//                           className="animate-spin -ml-1 mr-2 h-6 w-6 text-white"
//                           xmlns="http://www.w3.org/2000/svg"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                         >
//                           <circle
//                             className="opacity-25"
//                             cx="12"
//                             cy="12"
//                             r="10"
//                             stroke="currentColor"
//                             strokeWidth="4"
//                           ></circle>
//                           <path
//                             className="opacity-75"
//                             fill="currentColor"
//                             d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                           ></path>
//                         </svg>
//                       </>
//                     ) : (
//                       "Verify Code"
//                     )}
//                   </button>

//                   <div className="text-sm text-gray-400">
//                     {countdown > 0 ? (
//                       <span>Resend code in {countdown}s</span>
//                     ) : (
//                       <button
//                         type="button"
//                         onClick={handleResend}
//                         className={`text-blue-400 hover:text-blue-300 transition-colors ${
//                           isResending ? "opacity-70 cursor-not-allowed" : ""
//                         }`}
//                         disabled={isResending}
//                       >
//                         {isResending ? "Sending..." : "Resend Code"}
//                       </button>
//                     )}
//                   </div>
//                 </motion.div>
//               </form>
//             </>
//           </div>
//         </motion.div>
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
//               className="relative bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl border border-gray-700/50 shadow-2xl overflow-hidden w-full max-w-md"
//             >
//               {/* Close Button */}
//               <button
//                 onClick={handleModalClose}
//                 className="absolute top-4 right-4 p-1.5 rounded-full bg-gray-700/50 hover:bg-gray-700 text-gray-300 hover:text-white transition-all"
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
//                     <h3 className="text-xl font-semibold text-gray-50 mb-1">
//                       Verification Successful!
//                     </h3>
//                     <p className="text-sm text-gray-300/90">
//                       Your OTP has been verified successfully. You can now
//                       proceed to the next step.
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

export default function OTPVerification() {
  return <div>OTPVerification</div>;
}
