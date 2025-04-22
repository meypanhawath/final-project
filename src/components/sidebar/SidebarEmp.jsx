import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  HiOutlineViewGrid, 
  HiOutlineCalendar, 
  HiOutlineUser, 
  HiOutlineChevronRight 
} from 'react-icons/hi';

const SidebarItem = ({ icon, text, href = "#" }) => (
  <NavLink
    to={href}
    className={({ isActive }) =>
      `flex items-center px-4 py-3 rounded-md text-sm font-medium transition-colors duration-150 ease-in-out group ${
        isActive
          ? "bg-primary-color text-white"
          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
      }`
    }
  >
    {React.createElement(icon, {
      className: `w-5 h-5 mr-3 flex-shrink-0 ${
        "text-gray-400 group-hover:text-gray-500"
      }`,
    })}
    <span className="truncate">{text}</span>
    <HiOutlineChevronRight
      className={`w-4 h-4 ml-auto text-gray-400 transition-opacity ${
        // Optional: additional styling based on active state can be added here if needed
        ""
      }`}
    />
  </NavLink>
);

const SidebarEmp = () => {
  return (
    <div className="flex flex-col h-screen bg-white shadow-lg w-64">
      {/* Header */}
      <div className="flex items-center h-16 border-b px-18">
        <div className=" items-center">
          <span className="text-xl font-semibold text-gray-800 text-center">Checkify</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 md:px-4 py-4 space-y-2 overflow-y-auto">
        <SidebarItem
          href="/empdashboard"
          icon={HiOutlineViewGrid}
          text="Dashboard"
        />
        <SidebarItem
          href="/attendance"
          icon={HiOutlineCalendar}
          text="Attendance"
        />
        <SidebarItem
          href="/empProfile"
          icon={HiOutlineUser}
          text="Profile"
        />
      </nav>
    </div>
  );
};

export default SidebarEmp;
