import { IoMdPerson } from "react-icons/io";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import PasswordField from "../common/PasswordField.jsx";
import PrimaryButton from "../common/PrimaryButton.jsx";

export default function LoginForm({
  onSubmit,
  isSubmitting,
  errors,
  register,
  toggleVisibility,
  passwordVisibility,
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Email Field */}
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="relative"
      >
        <div className="relative h-12">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <IoMdPerson className="text-gray-500 text-lg" />
          </div>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
            type="email"
            autoFocus
            placeholder="Email Address"
            className={`pl-10 pr-4 py-3 w-full bg-gray-50 border ${
              errors.email ? "border-rose-400" : "border-gray-300"
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent text-gray-800 placeholder-gray-500 transition-all duration-200`}
          />
          {errors.email && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-rose-500 mt-1"
            >
              {errors.email.message}
            </motion.p>
          )}
        </div>
      </motion.div>

      <PasswordField
        label="Password"
        name="password"
        type={passwordVisibility.password ? "text" : "password"}
        register={register}
        error={errors.password}
        toggleVisibility={() => toggleVisibility("password")}
        placeholder="Enter your password"
        validation={{
          required: "Password is required",
          minLength: {
            value: 6,
            message: "Password must be at least 6 characters",
          },
        }}
      />

      {/* Forgot Password */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="flex items-center justify-end"
      >
        {/* <Link
                    to="/forgot-password"
                    className="font-medium text-blue-600 hover:text-blue-500 transition-colors relative group text-sm"
                >
                    Forgot password?
                    <span
                        className="absolute left-0 -bottom-0.5 h-[2px] bg-blue-500 w-0 group-hover:w-full transition-all duration-300"></span>
                </Link> */}
      </motion.div>

      {/* Submit Button */}

      <PrimaryButton isSubmitting={isSubmitting} type="submit">
        Sign in
      </PrimaryButton>
    </form>
  );
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  errors: PropTypes.object,
  register: PropTypes.object,
  toggleVisibility: PropTypes.func.isRequired,
  passwordVisibility: PropTypes.object,
};
