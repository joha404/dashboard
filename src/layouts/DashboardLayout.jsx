import Sidebar from "../shared/Sidebar.jsx";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { HiOutlineCog, HiOutlineHome } from "react-icons/hi";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import Header from "../shared/Header.jsx";
import { FaRegAddressCard, FaUsers } from "react-icons/fa";
import { BiBookContent } from "react-icons/bi";
import { TbListDetails } from "react-icons/tb";
import { MdOutlineVpnLock } from "react-icons/md";
import { IoMdPricetags } from "react-icons/io";
import { GrCircleInformation } from "react-icons/gr";
import { RiUserCommunityFill } from "react-icons/ri";

const links = [
  {
    name: "Dashboard",
    path: "/dashboard/landing-page",
    icon: <MdOutlineSpaceDashboard />,
  },
  {
    name: "Settings",
    path: "/dashboard/settings",
    icon: <HiOutlineCog />,
  },
  // {
  //   name: "AboutPage ",
  //   path: "/dashboard/about",
  //   icon: <TbListDetails />,
  // },
  // {
  //   name: "Contact Page ",
  //   path: "/dashboard/contact",
  //   icon: <FaRegAddressCard />,
  // },

  {
    name: "Auth ",
    path: "/dashboard/signin-signup",
    icon: <MdOutlineVpnLock />,
  },
];

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 500);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} links={links} />
      {/* Main Content Area */}
      <div className="flex flex-col flex-grow overflow-hidden duration-500">
        {/* Top bar */}
        <Header isOpen={isOpen} setIsOpen={setIsOpen} />
        {/* Content area for the Outlet */}
        <div className="flex-grow bg-[#F5F5F5]  p-6 overflow-auto">
          {isLoaded && <Outlet />}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
