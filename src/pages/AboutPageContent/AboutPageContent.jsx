import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import "react-quill-new/dist/quill.snow.css";
import PrimaryButton from "../../componentss/common/PrimaryButton";
import { getAboutContent } from "../../api/aboutPage/about-us";
import ImageGallery from "../../componentss/CMS/AboutPage/ImageGallery";
import UpdateAboutPage from "../../componentss/CMS/AboutPage/UpdateAboutPage";

export default function AboutPageContent() {
  const [aboutPageContent, setAboutContent] = useState({});
  const [formData, setFormData] = useState({});
  const [data, setData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const aboutContent = async () => {
    setLoading(true);
    const response = await getAboutContent();
    setAboutContent(response.data.data);
    setFormData(response.data.data);
    setData(response.data.data);
    setLoading(false);
  };

  useEffect(() => {
    aboutContent();
  }, []);

  const handleEdit = async () => {
    setLoading(true);
    setIsEditing(true);
    await aboutContent();
    setLoading(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <section className="py-4 px-2">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900">About Us Page</h2>
          <PrimaryButton
            onClick={handleEdit}
            isSubmitting={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Edit
          </PrimaryButton>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white p-2"
        >
          {loading ? (
            <div className="space-y-6 animate-pulse">
              <div>
                <div className="h-6 w-40 bg-gray-300 rounded mb-2"></div>
                <div className="h-8 bg-gray-200 rounded"></div>
              </div>

              <div>
                <div className="h-6 w-56 bg-gray-300 rounded mb-2"></div>
                <div className="h-60 bg-gray-200 rounded"></div>
              </div>

              <div>
                <div>
                  <div className="h-6 w-48 bg-gray-300 rounded mb-2"></div>
                  <div className="flex space-x-4">
                    <div className="flex-1 h-52 bg-gray-200 rounded"></div>
                    <div className="flex-1 h-52 bg-gray-200 rounded"></div>
                    <div className="flex-1 h-52 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Actual content when loaded
            <div className="space-y-2">
              <div>
                <h1 className="float-right">
                  <span className="font-semibold mx-2"> Last Modify At :</span>{" "}
                  {formData?.updatedAt &&
                    new Date(formData.updatedAt).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                </h1>

                <label className="block text-lg font-medium text-gray-700 mb-2">
                  Section Title
                </label>
                <p className="p-2 bg-gray-100 pl-4">{formData?.sectionTitle}</p>
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  Section Description
                </label>
                <p className="p-2 bg-gray-100 pl-4 whitespace-pre-line">
                  {formData?.sectionDescription}
                </p>
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  Background Content
                </label>

                <ImageGallery
                  images={[
                    formData.image1Url,
                    formData.image2Url,
                    formData.image3Url,
                  ].filter(Boolean)}
                />
              </div>
            </div>
          )}
        </motion.div>
      </div>
      {isEditing && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex backdrop-blur-md justify-center items-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-xl p-6 w-full max-w-6xl max-h-[90vh] overflow-y-auto relative mx-2 custom-scrollbar"
          >
            <div className="flex justify-end">
              <button
                onClick={() => handleCancel()}
                className="py-2 px-4 text-red-500 bg-error/15 delay-75 transition-all ease-linear duration-300 hover:bg-error/20 hover:text-red-700 rounded-lg"
              >
                ✕
              </button>
            </div>

            <UpdateAboutPage
              formData={formData}
              setFormData={setFormData}
              onClose={handleCancel}
              data={data}
              refetchaboutPageContent={aboutContent}
            />
          </motion.div>
        </div>
      )}
    </section>
  );
}
