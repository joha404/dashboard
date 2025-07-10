import { useRef, useState } from "react";
import { IoIosCamera } from "react-icons/io";
import { motion } from "framer-motion";

export default function AvatarUploader() {
    const [avatar, setAvatar] = useState(null);
    const fileInputRef = useRef();

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setAvatar(reader.result); // base64 string
        };
        reader.readAsDataURL(file);
    };

    const handleUploadClick = () => {
        fileInputRef.current.click();
    };

    const handleDelete = () => {
        setAvatar(null);
        fileInputRef.current.value = null;
    };

    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-5 pb-4 border-b border-gray-700/50">
            <motion.div
                className="relative group"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400 }}
            >
                <img
                    src={
                        avatar ||
                        "https://icons.veryicon.com/png/o/miscellaneous/user-avatar/user-avatar-male-5.png"
                    }
                    alt="Profile"
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-gray-600 group-hover:border-teal-400 transition-all duration-200 object-cover"
                />
                <button
                    onClick={handleUploadClick}
                    className="absolute bottom-0 right-0 w-7 h-7 bg-teal-500 rounded-full flex items-center justify-center border-2 border-gray-800 hover:bg-teal-400 transition-all duration-200 shadow-sm"
                >
                    <IoIosCamera className="text-white text-[15px]" />
                </button>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                />
            </motion.div>

            <div className="flex-1 min-w-0">
                <h4 className="text-base sm:text-lg font-semibold text-gray-100 truncate">Anthony Richel</h4>
                <p className="text-xs text-gray-400 mb-2 truncate">@anthonyrich144</p>

                <div className="flex flex-wrap gap-1.5">
                    <motion.button
                        whileHover={{ y: -1 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleUploadClick}
                        className="px-2.5 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-md text-xs font-medium transition-all duration-200 flex items-center gap-1 shadow-sm"
                    >
                        <IoIosCamera className="text-[15px]" />
                        Upload Photo
                    </motion.button>

                    <motion.button
                        whileHover={{ y: -1 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleDelete}
                        className="px-2.5 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-md text-xs font-medium transition-all duration-200 shadow-sm"
                    >
                        Delete Photo
                    </motion.button>
                </div>
            </div>
        </div>
    );
}
