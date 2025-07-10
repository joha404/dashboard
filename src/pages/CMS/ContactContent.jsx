import  { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiAlertTriangle, FiTrash2, FiEdit2, FiSave, FiPlus, FiMinus, FiMail, FiPhone, FiGlobe } from 'react-icons/fi';

export default function ContactContent() {
  const [contactData, setContactData] = useState({
    title: "Get in Touch",
    description: "Need help and can't find the answers you need? Contact us by filling out the information to the right! We'll get back to you as soon as possible. If you can't seem to find an answer to your question, you can also check out the FAQ here.",
    email: "support@venwed.com",
    phone: "+1 (555) 123-4567",
    socialLinks: [
      { platform: "instagram", url: "instagram.com/venwed" },
      { platform: "twitter", url: "twitter.com/venwed" },
      { platform: "facebook", url: "facebook.com/venwed" },
      { platform: "youtube", url: "youtube.com/venwed" }
    ]
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ ...contactData });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [newSocialLink, setNewSocialLink] = useState({ platform: "", url: "" });

  const handleEdit = () => {
    setEditData({ ...contactData, socialLinks: [...contactData.socialLinks] });
    setIsEditing(true);
  };

  const handleSave = () => {
    setContactData({ ...editData, socialLinks: [...editData.socialLinks] });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  const handleSocialLinkChange = (index, field, value) => {
    const updatedLinks = [...editData.socialLinks];
    updatedLinks[index][field] = value;
    setEditData(prev => ({ ...prev, socialLinks: updatedLinks }));
  };

  const handleAddSocialLink = () => {
    if (newSocialLink.platform && newSocialLink.url) {
      setEditData(prev => ({
        ...prev,
        socialLinks: [...prev.socialLinks, newSocialLink]
      }));
      setNewSocialLink({ platform: "", url: "" });
    }
  };

  const handleRemoveSocialLink = (index) => {
    const updatedLinks = [...editData.socialLinks];
    updatedLinks.splice(index, 1);
    setEditData(prev => ({ ...prev, socialLinks: updatedLinks }));
  };

  const handleDelete = () => {
    setContactData({
      title: "",
      description: "",
      email: "",
      phone: "",
      socialLinks: []
    });
    setShowDeleteModal(false);
  };

  const getPlatformIcon = (platform) => {
    const platformColors = {
      instagram: "bg-gradient-to-br from-purple-500 to-pink-500",
      twitter: "bg-blue-400",
      facebook: "bg-blue-600",
      youtube: "bg-red-600",
      default: "bg-indigo-500"
    };

    const color = platformColors[platform.toLowerCase()] || platformColors.default;

    return (
        <div className={`w-10 h-10 ${color} rounded-lg flex items-center justify-center text-white`}>
          {platform === 'instagram' && <span>📷</span>}
          {platform === 'twitter' && <span>🐦</span>}
          {platform === 'facebook' && <span>👍</span>}
          {platform === 'youtube' && <span>▶️</span>}
          {!['instagram', 'twitter', 'facebook', 'youtube'].includes(platform) && <span>🔗</span>}
        </div>
    );
  };

  return (
      <div className="">
        <motion.div
            className="bg-gray-800/90 backdrop-blur-sm p-6 sm:p-8 rounded-xl space-y-6 shadow-2xl border border-gray-700/50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
          {/* Header with Actions */}
          <div className="flex flex-col sm:flex-row justify-end items-start sm:items-center gap-4">
            <div className="flex space-x-3">
              {!isEditing ? (
                  <>
                    <button
                        onClick={handleEdit}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition flex items-center gap-2 shadow-lg hover:shadow-indigo-500/20"
                    >
                      <FiEdit2 size={16} />
                      Edit
                    </button>
                    <button
                        onClick={() => setShowDeleteModal(true)}
                        className="px-4 py-2 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white rounded-lg transition flex items-center gap-2 shadow-lg hover:shadow-red-500/20"
                    >
                      <FiTrash2 size={16} />
                      Delete
                    </button>
                  </>
              ) : (
                  <>
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white rounded-lg transition flex items-center gap-2 shadow-lg hover:shadow-green-500/20"
                    >
                      <FiSave size={16} />
                      Save Changes
                    </button>
                    <button
                        onClick={handleCancel}
                        className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-lg transition shadow-lg hover:shadow-gray-500/10"
                    >
                      Cancel
                    </button>
                  </>
              )}
            </div>
          </div>

          {/* Main Content */}
          {isEditing ? (
              <div className="space-y-6">
                {/* Title Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
                  <input
                      type="text"
                      name="title"
                      value={editData.title}
                      onChange={handleChange}
                      className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-gray-400"
                      placeholder="Contact section title"
                  />
                </div>

                {/* Description Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                  <textarea
                      name="description"
                      value={editData.description}
                      onChange={handleChange}
                      rows="4"
                      className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-gray-400"
                      placeholder="Helpful information for visitors"
                  />
                </div>

                {/* Contact Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Email Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiMail className="text-gray-400" />
                      </div>
                      <input
                          type="email"
                          name="email"
                          value={editData.email}
                          onChange={handleChange}
                          className="w-full pl-10 p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-gray-400"
                          placeholder="support@example.com"
                      />
                    </div>
                  </div>

                  {/* Phone Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiPhone className="text-gray-400" />
                      </div>
                      <input
                          type="tel"
                          name="phone"
                          value={editData.phone}
                          onChange={handleChange}
                          className="w-full pl-10 p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-gray-400"
                          placeholder="+1 (123) 456-7890"
                      />
                    </div>
                  </div>
                </div>

                {/* Social Media Links */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-300">Social Media Links</label>
                    <span className="text-xs text-gray-400">{editData.socialLinks.length} added</span>
                  </div>

                  <div className="space-y-3">
                    {editData.socialLinks.map((link, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <select
                              value={link.platform}
                              onChange={(e) => handleSocialLinkChange(index, 'platform', e.target.value)}
                              className="flex-1 p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white"
                          >
                            <option value="instagram">Instagram</option>
                            <option value="twitter">Twitter</option>
                            <option value="facebook">Facebook</option>
                            <option value="youtube">YouTube</option>
                            <option value="linkedin">LinkedIn</option>
                            <option value="tiktok">TikTok</option>
                            <option value="other">Other</option>
                          </select>
                          <input
                              type="text"
                              value={link.url}
                              onChange={(e) => handleSocialLinkChange(index, 'url', e.target.value)}
                              className="flex-2 p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-gray-400"
                              placeholder="username or URL"
                          />
                          <button
                              onClick={() => handleRemoveSocialLink(index)}
                              className="p-3 text-red-400 hover:text-red-300 hover:bg-red-900/30 rounded-lg transition"
                          >
                            <FiMinus size={18} />
                          </button>
                        </div>
                    ))}

                    {/* Add New Social Link */}
                    <div className="flex items-center gap-3 mt-4">
                      <select
                          value={newSocialLink.platform}
                          onChange={(e) => setNewSocialLink({...newSocialLink, platform: e.target.value})}
                          className="flex-1 p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white"
                      >
                        <option value="">Select platform</option>
                        <option value="instagram">Instagram</option>
                        <option value="twitter">Twitter</option>
                        <option value="facebook">Facebook</option>
                        <option value="youtube">YouTube</option>
                        <option value="linkedin">LinkedIn</option>
                        <option value="tiktok">TikTok</option>
                        <option value="other">Other</option>
                      </select>
                      <input
                          type="text"
                          value={newSocialLink.url}
                          onChange={(e) => setNewSocialLink({...newSocialLink, url: e.target.value})}
                          className="flex-2 p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-gray-400"
                          placeholder="username or URL"
                      />
                      <button
                          onClick={handleAddSocialLink}
                          className="p-3 text-green-400 hover:text-green-300 hover:bg-green-900/30 rounded-lg transition"
                      >
                        <FiPlus size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
          ) : (
              <div className="space-y-8">
                {/* Title and Description */}
                <div className="space-y-4">
                  <h2 className="text-2xl sm:text-3xl font-bold text-white">
                    {contactData.title || <span className="text-gray-400">No title set</span>}
                  </h2>
                  <p className="text-gray-300 whitespace-pre-line">
                    {contactData.description || <span className="text-gray-500">No description provided</span>}
                  </p>
                </div>

                {/* Contact Information */}
                <div className="space-y-5">
                  {(contactData.email || contactData.phone) && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {contactData.email && (
                            <div className="bg-gray-700/50 p-4 rounded-xl border border-gray-600/50 hover:border-indigo-500/50 transition-colors">
                              <div className="flex items-center gap-3">
                                <div className="p-2 bg-indigo-600/20 rounded-lg text-indigo-400">
                                  <FiMail size={20} />
                                </div>
                                <div>
                                  <h3 className="text-sm font-medium text-gray-400">Email</h3>
                                  <a
                                      href={`mailto:${contactData.email}`}
                                      className="text-white hover:text-indigo-300 transition-colors"
                                  >
                                    {contactData.email}
                                  </a>
                                </div>
                              </div>
                            </div>
                        )}
                        {contactData.phone && (
                            <div className="bg-gray-700/50 p-4 rounded-xl border border-gray-600/50 hover:border-indigo-500/50 transition-colors">
                              <div className="flex items-center gap-3">
                                <div className="p-2 bg-teal-600/20 rounded-lg text-teal-400">
                                  <FiPhone size={20} />
                                </div>
                                <div>
                                  <h3 className="text-sm font-medium text-gray-400">Phone</h3>
                                  <a
                                      href={`tel:${contactData.phone.replace(/\D/g, '')}`}
                                      className="text-white hover:text-teal-300 transition-colors"
                                  >
                                    {contactData.phone}
                                  </a>
                                </div>
                              </div>
                            </div>
                        )}
                      </div>
                  )}

                  {/* Social Media Links */}
                  {contactData.socialLinks.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                          <FiGlobe className="text-blue-400" />
                          <span>Social Media</span>
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                          {contactData.socialLinks.map((link, index) => (
                              <a
                                  key={index}
                                  href={`https://${link.url}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="group bg-gray-700/50 hover:bg-gray-700 p-4 rounded-xl border border-gray-600/50 hover:border-indigo-500/50 transition-all duration-300"
                              >
                                <div className="flex items-center gap-3">
                                  {getPlatformIcon(link.platform)}
                                  <div>
                                    <div className="font-medium text-white capitalize group-hover:text-indigo-300 transition-colors">
                                      {link.platform}
                                    </div>
                                    <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                                      {link.url}
                                    </div>
                                  </div>
                                </div>
                              </a>
                          ))}
                        </div>
                      </div>
                  )}
                </div>

                {/* Empty State */}
                {!contactData.title && !contactData.description && !contactData.email &&
                    !contactData.phone && contactData.socialLinks.length === 0 && (
                        <div className="text-center py-12 border-2 border-dashed border-gray-700 rounded-xl">
                          <div className="max-w-md mx-auto">
                            <div className="p-4 bg-gray-800 rounded-full inline-block mb-4">
                              <FiGlobe size={24} className="text-gray-400" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-300 mb-1">No Contact Information</h3>
                            <p className="text-gray-500 mb-4">You haven't added any contact details yet</p>
                            <button
                                onClick={handleEdit}
                                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition flex items-center gap-2 mx-auto"
                            >
                              <FiEdit2 size={16} />
                              Add Contact Information
                            </button>
                          </div>
                        </div>
                    )}
              </div>
          )}
        </motion.div>

        {/* Delete Confirmation Modal */}
        <AnimatePresence>
          {showDeleteModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    className="relative bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl border border-gray-700/50 shadow-2xl overflow-hidden w-full max-w-md"
                >
                  {/* Close Button */}
                  <button
                      onClick={() => setShowDeleteModal(false)}
                      className="absolute top-4 right-4 p-1.5 rounded-full bg-gray-700/50 hover:bg-gray-700 text-gray-300 hover:text-white transition-all"
                  >
                    <FiX size={18} />
                  </button>

                  {/* Modal Content */}
                  <div className="p-6 sm:p-7">
                    <div className="flex items-start gap-4 mb-5">
                      <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                        <FiAlertTriangle className="text-red-400" size={24} />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-50 mb-1">Delete Contact Information</h3>
                        <p className="text-sm text-gray-300/90">
                          This will permanently erase all contact information. Are you absolutely sure?
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="p-4 bg-gray-700/50 rounded-lg border border-gray-600/50">
                        <h4 className="text-sm font-medium text-gray-200 mb-2">What will be deleted:</h4>
                        <ul className="text-xs text-gray-400 space-y-1.5">
                          <li className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-400/80" />
                            Contact title and description
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-400/80" />
                            Email address and phone number
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-400/80" />
                            All social media links
                          </li>
                        </ul>
                      </div>

                      <div className="pt-4 flex justify-end gap-3 border-t border-gray-700/50">
                        <motion.button
                            onClick={() => setShowDeleteModal(false)}
                            className="px-5 py-2.5 text-sm font-medium rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-200 transition-colors"
                            whileHover={{ y: -1 }}
                            whileTap={{ scale: 0.98 }}
                        >
                          Cancel
                        </motion.button>
                        <motion.button
                            onClick={handleDelete}
                            className="px-5 py-2.5 text-sm font-medium rounded-lg bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white flex items-center gap-2 transition-colors"
                            whileHover={{ y: -1 }}
                            whileTap={{ scale: 0.98 }}
                        >
                          <FiTrash2 size={16} />
                          Delete Information
                        </motion.button>
                      </div>
                    </div>
                  </div>

                  {/* Ambient Glow */}
                  <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-red-500/10 rounded-full blur-[80px] pointer-events-none" />
                </motion.div>
              </div>
          )}
        </AnimatePresence>
      </div>
  );
}