import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { FaCamera } from "react-icons/fa";
import toast from "react-hot-toast";
import PrimaryButton from "../common/PrimaryButton";
import { UpdateAvatar } from "../../api/auth";

const placeholderImage =
  "https://static.vecteezy.com/system/resources/previews/036/594/092/non_2x/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg";

const ProfileImageUploader = ({ userData }) => {
  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState(null);
  const fileInputRef = useRef();

  const handleImageChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setPreview(URL.createObjectURL(selected));
      setFile(selected);
    }
  };

  const handleSave = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("avatar", file);

    try {
      setIsLoading(true);
      const res = await UpdateAvatar(formData);
      console.log(res);
      toast.success("Profile image updated!");
      setFile(null);
      setPreview(null);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to upload image");
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFile(null);
    setPreview(null);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <motion.div whileTap={{ scale: 0.98 }} className="relative group">
        <img
          src={preview || userData.avatar || placeholderImage}
          alt={userData.fullName}
          className="w-64 h-64 rounded object-cover border border-slate-300 shadow-md"
        />

        {/* Upload Trigger */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4 }}
          onClick={() => fileInputRef.current.click()}
          className="absolute -bottom-2 -right-2 flex items-center justify-center w-10 h-10 rounded-full bg-white border-2 border-primary/10 cursor-pointer"
        >
          <FaCamera className="text-primary-dark text-lg" />
        </motion.div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </motion.div>

      {/* Button Group */}
      {file && (
        <div className="flex space-x-8 ">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCancel}
            className="px-6 py-2 bg-gray-50 text-black border-1 border-gray-300 rounded-lg  shadow hover:bg-gray-100 transition"
          >
            Cancel
          </motion.button>

          <PrimaryButton isSubmitting={isLoading} onClick={handleSave}>
            Save
          </PrimaryButton>
        </div>
      )}
    </div>
  );
};

export default ProfileImageUploader;
