import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PrimaryButton from "../../componentss/common/PrimaryButton";
import UpdateWhoWeAre from "../../componentss/CMS/AboutPage/UpdateWhoWeAre";
import { DeleteStat, getWhoWeAre } from "../../api/aboutPage/about-us";
import StatModal from "../../componentss/CMS/AboutPage/StatModal";
import ModalDialog from "../../componentss/common/ModalDialog";
import StatsManager from "../../componentss/CMS/AboutPage/StatsManager";

export default function WhoWeAre() {
  const [formData, setFormData] = useState({});
  const [data, setData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addState, setAddState] = useState(false);
  const [isStatModalOpen, setIsStatModalOpen] = useState(false);
  const [editingStat, setEditingStat] = useState(null);
  const [stats, setStats] = useState([]);
  const [statToDelete, setStatToDelete] = useState(null);
  const [open, setOpen] = useState(false);

  const aboutContent = async () => {
    setLoading(true);
    const response = await getWhoWeAre();
    const whoWeAreData = response.data.data;
    setFormData(whoWeAreData);
    setStats(whoWeAreData?.stats || []);
    setData(whoWeAreData);
    setLoading(false);
  };

  useEffect(() => {
    aboutContent();
  }, []);

  useEffect(() => {
    if (formData?.stats?.length < 3) {
      setAddState(true);
    }
  }, [formData]);

  const handleEdit = async () => {
    setLoading(true);
    setIsEditing(true);
    await aboutContent();
    setLoading(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleAddStat = (newStat) => {
    setStats((prev) => [...prev, { ...newStat, _id: Date.now().toString() }]);
  };

  const handleDeleteStat = (id) => {
    setStats((prev) => prev.filter((s) => s._id !== id));
  };

  const handleUpdateStat = (updatedStat) => {
    setStats((prev) =>
      prev.map((s) => (s._id === updatedStat._id ? updatedStat : s))
    );
  };
  const requestDeleteStat = (statId) => {
    setStatToDelete(statId);

    setOpen(true);
  };
  const confirmDeleteStat = async () => {
    setStats((prev) => prev.filter((stat) => stat._id !== statToDelete));
    setStatToDelete(null);
    setOpen(false);
    await DeleteStat(statToDelete);
    console.log(statToDelete);
  };

  return (
    <section className="py-4 px-2">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900">
            Who We Are Section
          </h2>
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
            <p className="text-center py-10 text-lg">Loading...</p>
          ) : (
            <div className="space-y-6">
              <h1 className="float-right text-sm text-gray-500">
                <span className="font-semibold mx-2">Last Modified:</span>
                {formData?.updatedAt &&
                  new Date(formData.updatedAt).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
              </h1>

              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {data?.sectionTitle}
                </h2>
                <p className="text-gray-600">{data?.sectionSubTitle}</p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">
                  Section Image
                </h3>
                <img
                  src={data?.imageUrl}
                  alt="Who We Are"
                  className="h-60 w-full object-cover rounded"
                />
              </div>

              <StatsManager
                stats={stats}
                onAdd={() => {
                  setEditingStat(null);
                  setIsStatModalOpen(true);
                }}
                onEdit={(stat) => {
                  setEditingStat(stat);
                  setIsStatModalOpen(true);
                }}
                onDelete={requestDeleteStat}
                showAddButton={addState}
              />

              <div>
                <PrimaryButton>{data?.buttonText}</PrimaryButton>
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
                onClick={handleCancel}
                className="py-2 px-4 text-red-500 bg-error/15 hover:bg-error/20 hover:text-red-700 rounded-lg"
              >
                ✕
              </button>
            </div>
            <UpdateWhoWeAre
              formData={formData}
              setFormData={setFormData}
              data={{ ...data, stats }}
              onClose={handleCancel}
              refetchwhoWeAre={aboutContent}
            />
          </motion.div>
        </div>
      )}

      {isStatModalOpen && (
        <StatModal
          onClose={() => {
            setIsStatModalOpen(false);
            setEditingStat(null);
          }}
          onSave={(stat) => {
            editingStat
              ? handleUpdateStat({ ...stat, _id: editingStat._id })
              : handleAddStat(stat);
            setIsStatModalOpen(false);
          }}
          defaultStat={editingStat || { title: "", value: "" }}
          fetchState={aboutContent}
        />
      )}
      <ModalDialog
        show={open}
        onClose={() => setOpen(false)}
        onConfirm={confirmDeleteStat}
        isLoading={false}
        title="Are You Sure?"
        message="You are about to delete this stat. This action cannot be undone."
        buttonText1="Cancel"
        buttonText2="Yes"
      />
    </section>
  );
}
