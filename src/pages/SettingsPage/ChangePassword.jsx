import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { FiAlertCircle } from "react-icons/fi";
import { toast } from "react-hot-toast";
import { changePassword } from "../../api/settings-api";
import SuccessModal from "../../componentss/common/SuccessModal.jsx";
import PasswordField from "../../componentss/common/PasswordField.jsx";
import PrimaryButton from "../../componentss/common/PrimaryButton.jsx";
import CancelButton from "../../componentss/common/CancelButton.jsx";
import { UpdatePassword } from "../../api/auth.js";

export default function ChangePassword() {
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const newPassword = watch("newPassword", "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [passError, setPassError] = useState("");

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSuccessConfirm = () => {
    setShowSuccessModal(false);
    reset();
  };

  const handleCancel = () => {
    reset();
  };

  const onSubmit = async ({ oldPassword, newPassword }) => {
    setIsSubmitting(true);
    setPassError("");
    try {
      await UpdatePassword({ oldPassword, newPassword });
      setShowSuccessModal(true);
    } catch {
      setPassError("An unexpected error occurred");
      toast.error("Failed to change password");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {/* Password Hint */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 1 }}
        className="flex items-start gap-2 mb-6"
      >
        <FiAlertCircle className="text-yellow-500 mt-0.5" size={14} />
        <p className="text-xs text-gray-600">
          Password should be{" "}
          <span className="text-teal-600 font-medium">min of 6 characters</span>
        </p>
      </motion.div>

      {/* Form Card */}
      <motion.div
        className="bg-white p-4 sm:p-5 rounded-xl border border-gray-200 shadow-sm"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {passError && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3"
          >
            <FiAlertCircle className="text-red-500 mt-0.5" />
            <p className="text-sm text-red-600">{passError}</p>
          </motion.div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <PasswordField
            label="Current Password"
            name="oldPassword"
            type={showPassword.current ? "text" : "password"}
            toggleVisibility={() => togglePasswordVisibility("current")}
            placeholder="Enter current password"
            register={register}
            error={errors.oldPassword}
            validation={{ required: "Current password is required" }}
          />

          <PasswordField
            label="New Password"
            name="newPassword"
            type={showPassword.new ? "text" : "password"}
            toggleVisibility={() => togglePasswordVisibility("new")}
            placeholder="Enter new password"
            register={register}
            error={errors.newPassword}
            validation={{
              required: "New password is required",
              minLength: { value: 6, message: "Minimum 6 characters" },
            }}
          />

          <PasswordField
            label="Confirm New Password"
            name="confirmPassword"
            type={showPassword.confirm ? "text" : "password"}
            toggleVisibility={() => togglePasswordVisibility("confirm")}
            placeholder="Confirm new password"
            register={register}
            error={errors.confirmPassword}
            validation={{
              required: "Please confirm password",
              validate: (value) =>
                value === newPassword || "Passwords don't match",
            }}
          />

          <motion.div
            className="flex justify-end gap-2 mt-6 pt-5 border-t border-gray-200"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <CancelButton onClick={handleCancel} />

            <PrimaryButton isSubmitting={isSubmitting} type="submit">
              Save changes
            </PrimaryButton>
          </motion.div>
        </form>
      </motion.div>

      {/* Success Modal */}
      <SuccessModal
        show={showSuccessModal}
        onClose={handleSuccessConfirm}
        title="Password Changed!"
        message="Your password has been successfully updated."
      />
    </div>
  );
}
