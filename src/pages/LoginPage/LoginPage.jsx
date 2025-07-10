import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SiSimplelogin } from "react-icons/si";
import { toast } from "react-hot-toast";
import { FiAlertCircle } from "react-icons/fi";
import LoginForm from "../../componentss/login/LoginForm.jsx";
import SuccessModal from "../../componentss/common/SuccessModal.jsx";
import { loginAdmin } from "../../api/auth.js";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState({
    password: false,
  });

  const toggleVisibility = (field) => {
    setPasswordVisibility((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const from = location.state?.from?.pathname || "/dashboard/landing-page";

  useEffect(() => {
    const timer = setTimeout(() => setIsFormVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const res = await loginAdmin(data);
      console.log(res.data);
      localStorage.setItem("userToken", res.token);
      localStorage.setItem("userInfo", JSON.stringify(res.data));
      toast.success(res.message);
      setIsLoading(false);
      setShowSuccessModal(false);
      navigate("/dashboard");
      setLoginError("");
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <AnimatePresence>
        {isFormVisible && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
            className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg border border-gray-200 relative overflow-hidden"
          >
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-100 rounded-full filter blur-xl"></div>
            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-indigo-100 rounded-full filter blur-xl"></div>

            <div className="relative z-10">
              {loginError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mb-6 p-3 bg-red-100 border border-red-200 rounded-lg flex items-start gap-3"
                >
                  <FiAlertCircle className="text-red-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-red-600">{loginError}</p>
                </motion.div>
              )}

              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="inline-block p-3 bg-blue-100 rounded-full mb-4"
                >
                  <SiSimplelogin className="text-3xl text-blue-600" />
                </motion.div>
                <motion.h2
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-2xl font-bold text-gray-800 mb-2"
                >
                  Welcome Back
                </motion.h2>
                <motion.p
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-gray-600"
                >
                  Sign in to your admin portal
                </motion.p>
              </div>

              <LoginForm
                onSubmit={handleSubmit(onSubmit)}
                errors={errors}
                isSubmitting={isLoading}
                register={register}
                loginError={loginError}
                passwordVisibility={passwordVisibility}
                toggleVisibility={toggleVisibility}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <SuccessModal
        show={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        onConfirm={() => {
          setShowSuccessModal(false);
          navigate(from || "/dashboard");
        }}
        title="Login Successful!"
        message="You have successfully logged in to your account."
        from={from}
        showRedirect={true}
        confirmText="Continue"
        showConfirmButton={true}
        showCloseButton={true}
      />
    </div>
  );
}
