import React, { useState } from "react";
import PrimaryButton from "../common/PrimaryButton";
import { toast } from "react-hot-toast";
import { EditProfile } from "../../api/auth";

export default function UpdateProfile({
  fetchProfile,
  closeEditModal,
  userData,
}) {
  const [formData, setFormData] = useState({
    fullName: userData?.fullName || "",
    phone: userData?.phone || "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      await EditProfile(formData);
      await fetchProfile();
      toast.success("Profile updated successfully");
      closeEditModal();
      setIsLoading(false);
    } catch (error) {
      console.error("Update profile error:", error);
      toast.error("Something went wrong. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto relative">
      {/* Close Button */}
      <button
        onClick={closeEditModal}
        className="absolute top-3 right-3 text-gray-500 hover:text-red-500 transition text-xl"
      >
        ✕
      </button>

      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Update Profile
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div>
          <label
            htmlFor="fullName"
            className="block text-sm font-medium text-gray-600"
          >
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter full name"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-primary focus:border-primary outline-none"
            required
          />
        </div>

        {/* Phone Number */}
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-600"
          >
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-primary focus:border-primary outline-none"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <PrimaryButton
            isSubmitting={isLoading}
            type="submit"
            className="w-full"
          >
            Save Changes
          </PrimaryButton>
        </div>
      </form>
    </div>
  );
}
