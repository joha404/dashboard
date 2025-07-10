import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import PrimaryButton from "../../../componentss/common/PrimaryButton";
import KeyPointManager from "../../../componentss/CMS/AboutPage/whyChoiceUs/KeyPointManager";
import UpdateWhyChoiceUs from "../../../componentss/CMS/AboutPage/whyChoiceUs/UpdateWhyChoiceUs";
import { fetchStats } from "../../../api/aboutPage/why-choice-us";
import WhoWeAreSkeleton from "../../../componentss/CMS/AboutPage/WhoWeAreSkeleton";

export default function WhyChoiceUs() {
  const { stats, isStatsLoading } = useSelector((state) => state.about);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    (async () => {
      await fetchStats();
    })();
  }, []);

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => setIsEditing(false);

  return (
    <section className="py-4 px-2">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900">Why Choose Us</h2>
          <PrimaryButton
            onClick={handleEdit}
            isSubmitting={isStatsLoading}
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
          {isStatsLoading ? (
            <WhoWeAreSkeleton />
          ) : (
            <div className="space-y-6">
              <div className="float-right text-sm text-gray-500">
                <span className="font-semibold mx-2">Last Modified:</span>
                {stats?.updatedAt &&
                  new Date(stats.updatedAt).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {stats?.sectionTitle}
                </h2>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">
                  Section Image
                </h3>
                <img
                  src={stats?.backgroundContent}
                  alt="Who We Are"
                  className="h-60 w-full object-cover rounded"
                />
              </div>

              <KeyPointManager keyPoints={stats?.keyPoints} />
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
                onClick={handleCancel}
                className="py-2 px-4 text-red-500 bg-error/15 hover:bg-error/20 hover:text-red-700 rounded-lg"
              >
                ✕
              </button>
            </div>
            <UpdateWhyChoiceUs data={stats} onClose={handleCancel} />
          </motion.div>
        </div>
      )}
    </section>
  );
}
