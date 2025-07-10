import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SearchAndTabs from "../../../componentss/manageUsers/SearchAndTabs";
import UserTable from "../../../componentss/manageUsers/UserTable";
import Pagination from "../../../componentss/common/Pagination";
import ConfirmStatusModal from "../../../componentss/manageUsers/ConfirmStatusModal";

// Mock users data
const mockUsers = [
  {
    _id: "1",
    fullName: "John Doe",
    email: "john.doe@example.com",
    isActive: true,
    createdAt: "2025-07-10T10:30:00Z",
  },
  {
    _id: "2",
    fullName: "Jane Smith",
    email: "jane.smith@example.com",
    isActive: false,
    createdAt: "2025-07-09T09:15:00Z",
  },
  {
    _id: "3",
    fullName: "Robert Brown",
    email: "robert.brown@example.com",
    isActive: true,
    createdAt: "2025-07-08T14:45:00Z",
  },
  {
    _id: "4",
    fullName: "Emily Wilson",
    email: "emily.wilson@example.com",
    isActive: false,
    createdAt: "2025-07-07T16:00:00Z",
  },
  {
    _id: "5",
    fullName: "Michael Johnson",
    email: "michael.johnson@example.com",
    isActive: true,
    createdAt: "2025-07-06T11:10:00Z",
  },
  {
    _id: "6",
    fullName: "Sophia Lee",
    email: "sophia.lee@example.com",
    isActive: true,
    createdAt: "2025-07-05T08:20:00Z",
  },
];

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [userPerPage, setUserPerPage] = useState(5);
  const [showAlert, setShowAlert] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [pendingStatus, setPendingStatus] = useState(null);

  useEffect(() => {
    // Simulate async loading
    setTimeout(() => {
      setUsers(mockUsers);
      setLoading(false);
    }, 500); // simulate 500ms loading
  }, []);

  const filteredUsers = users
    .filter((user) =>
      activeTab === "All"
        ? true
        : activeTab === "Active"
        ? user.isActive
        : !user.isActive
    )
    .filter(
      (user) =>
        user.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const totalPages = Math.ceil(filteredUsers.length / userPerPage);
  const indexOfLast = currentPage * userPerPage;
  const currentUsers = filteredUsers.slice(
    indexOfLast - userPerPage,
    indexOfLast
  );

  const handleStatusConfirm = () => {
    if (!selectedUser) return;

    setUsers((prev) =>
      prev.map((u) =>
        u._id === selectedUser._id ? { ...u, isActive: pendingStatus } : u
      )
    );
    setShowAlert(false);
    setSelectedUser(null);
    setPendingStatus(null);
  };

  return (
    <motion.div className="px-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-3">Manage Users</h1>

      <SearchAndTabs
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userPerPage={userPerPage}
        setUserPerPage={setUserPerPage}
      />

      <UserTable
        users={currentUsers}
        loading={loading}
        onStatusClick={(user, newStatus) => {
          setSelectedUser(user);
          setPendingStatus(newStatus);
          setShowAlert(true);
        }}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      <ConfirmStatusModal
        open={showAlert}
        onClose={() => setShowAlert(false)}
        onConfirm={handleStatusConfirm}
        pendingStatus={pendingStatus}
      />
    </motion.div>
  );
}
