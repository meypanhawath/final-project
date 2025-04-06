import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  HiOutlineViewGrid,
  HiOutlineUsers,
  HiOutlineCalendar,
  HiOutlineDocumentText,
  HiOutlineLogout,
  HiOutlineSearch,
  HiOutlineBell,
  HiOutlineChevronDown,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiX, // X icon for closing
} from "react-icons/hi";

// --- Reusable Components ---
const SidebarItem = ({ icon, text, active, href = "#", onClick, arrowIcon }) => {
  const ArrowIcon = arrowIcon || HiOutlineChevronDown;
  return (
    <a
      href={href}
      onClick={onClick}
      className={`flex items-center px-4 py-3 rounded-md text-sm font-medium transition-colors duration-150 ease-in-out group ${
        active
          ? "bg-primary-color text-white"
          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
      }`}
    >
      {React.createElement(icon, {
        className: `w-5 h-5 mr-3 flex-shrink-0 ${
          active ? "text-white" : "text-gray-400 group-hover:text-gray-500"
        }`,
      })}
      <span className="truncate">{text}</span>
      <ArrowIcon
        className={`w-4 h-4 ml-auto text-gray-400 ${
          active ? "text-white" : "opacity-0 group-hover:opacity-100"
        } transition-opacity`}
      />
    </a>
  );
};

const StatusBadge = ({ status }) => {
  const isActive = status === "Active";
  return (
    <span
      className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full whitespace-nowrap ${
        isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
      }`}
    >
      {status}
    </span>
  );
};

// --- Mock Data ---
const employeeData = [
  {
    id: "I-0001",
    name: "Jane Cooper",
    department: "Cyber Security",
    email: "jane@microsoft.com",
    joiningDate: "26 March 2025",
    status: "Active",
  },
  {
    id: "I-0002",
    name: "Doe Laly",
    department: "Web Design",
    email: "floyd@yahoo.com",
    joiningDate: "23 April 2023",
    status: "Inactive",
  },
  {
    id: "I-0003",
    name: "John reach",
    department: "Full Stack Developer",
    email: "ronald@adobe.com",
    joiningDate: "03 Set 2024",
    status: "Inactive",
  },
  {
    id: "I-0004",
    name: "Koko Tesla",
    department: "Mobile Developer",
    email: "marvin@tesla.com",
    joiningDate: "05 Oct 2023",
    status: "Active",
  },
  {
    id: "I-0005",
    name: "Jack bot",
    department: "Web Design",
    email: "jerome@google.com",
    joiningDate: "23 Nov 2022",
    status: "Active",
  },
  {
    id: "I-0006",
    name: "Mic Roza",
    department: "Full Stack Developer",
    email: "kathryn@microsoft.com",
    joiningDate: "12 Jan 2019",
    status: "Active",
  },
];

function EmployeeInfo() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const navigate = useNavigate();

  // Function to close sidebar, can be passed to links if needed
  const closeSidebar = () => setIsSidebarOpen(false);

  // Logout confirmation: clear token, close modal and navigate home
  const handleLogoutConfirm = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    setShowLogoutConfirm(false);
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Overlay for Mobile Sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-[rgba(0,0,0,0.3)] z-30 lg:hidden"
          onClick={closeSidebar}
          aria-hidden="true"
        ></div>
      )}
      {/* Sidebar */}
      <div
        className={`
          fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out flex flex-col
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:relative lg:translate-x-0 lg:flex lg:flex-shrink-0 lg:shadow-md lg:z-auto
        `}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 md:h-20 border-b flex-shrink-0 px-18">
          <div className="flex items-center">
            <span className="text-lg md:text-xl font-semibold text-gray-800">
              Checkify
            </span>
          </div>
          {/* Close button for mobile */}
          <button
            onClick={closeSidebar}
            className="lg:hidden p-1 text-gray-500 hover:text-gray-700"
            aria-label="Close sidebar"
          >
            <HiX className="w-6 h-6" />
          </button>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 px-2 md:px-4 py-4 space-y-2 overflow-y-auto">
          <Link to="/adminDashboard">
            <SidebarItem
              icon={HiOutlineViewGrid}
              text="Dashboard"
              onClick={closeSidebar}
            />
          </Link>

          {/* Employee item uses a right arrow */}
          <SidebarItem
            icon={HiOutlineUsers}
            text="Employee"
            active={true}
            onClick={closeSidebar}
            arrowIcon={HiOutlineChevronRight}
          />

          <Link to="/empAttendance">
            <SidebarItem
              icon={HiOutlineCalendar}
              text="Attendance"
              onClick={closeSidebar}
            />
          </Link>

          <Link to="/empLeave">
            <SidebarItem
              icon={HiOutlineDocumentText}
              text="Leave request"
              onClick={closeSidebar}
            />
          </Link>
        </nav>

        {/* Sidebar Footer */}
        <div className="px-2 md:px-4 py-4 border-t flex-shrink-0">
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-100 group focus:outline-none"
          >
            <HiOutlineLogout className="w-5 h-5 mr-3 text-gray-400 group-hover:text-gray-500 flex-shrink-0" />
            <span className="truncate">Log out</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header Bar */}
        <header className="flex items-center justify-between p-4 md:p-6 bg-white">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden p-2 mr-2 text-gray-600 hover:text-gray-800 focus:outline-none"
            aria-label="Open sidebar"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-xl font-bold text-primary-color truncate">
            Employee
          </h1>
          <button className="p-1 ml-auto bg-blue-100 rounded-full text-primary-color hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <HiOutlineBell className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </header>

        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4 md:p-6">
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
            {/* Top Bar: Title, Search, Sort */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4 md:mb-6 space-y-3 sm:space-y-0 sm:space-x-4">
              <h2 className="text-lg md:text-xl font-semibold text-gray-800">
                All Employee
              </h2>
              <div className="flex flex-col sm:flex-row items-center w-full sm:w-auto space-y-3 sm:space-y-0 sm:space-x-4">
                {/* Search Input */}
                <div className="relative w-full sm:w-auto">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <HiOutlineSearch className="w-5 h-5 text-gray-400" />
                  </span>
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-full sm:w-48 md:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                {/* Sort Dropdown */}
                <div className="relative w-full sm:w-auto">
                  <button className="flex items-center justify-between w-full sm:w-auto md:w-40 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <span>Sort by :</span>{" "}
                    <HiOutlineChevronDown className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </div>
            </div>

            {/* Responsive Table Wrapper */}
            <div className="overflow-x-auto">
              <table className="w-full block md:table divide-y divide-gray-200">
                <thead className="block md:table-header-group bg-gray-50">
                  <tr className="border-b border-gray-200 block md:table-row">
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider block md:table-cell">
                      ID
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider block md:table-cell">
                      Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider inline-flex items-center block md:table-cell">
                      Department
                      <HiOutlineChevronDown className="w-4 h-4 ml-1 inline-block md:hidden" />
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider block md:table-cell">
                      Email
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap block md:table-cell">
                      Date of Joining
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider block md:table-cell">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="block md:table-row-group">
                  {employeeData.map((employee) => (
                    <tr key={employee.id} className="border-b border-gray-200 block md:table-row hover:bg-gray-50">
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 block md:table-cell">
                        {employee.id}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700 block md:table-cell">
                        {employee.name}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700 block md:table-cell">
                        {employee.department}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700 truncate max-w-xs block md:table-cell">
                        {employee.email}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700 block md:table-cell">
                        {employee.joiningDate}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm block md:table-cell">
                        <StatusBadge status={employee.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex flex-col md:flex-row justify-between items-center mt-4 md:mt-6 pt-4 border-t border-gray-200">
              <p className="text-xs sm:text-sm text-gray-600 mb-3 md:mb-0">
                Showing data 1 to 8 of 256K entries
              </p>
              <nav className="flex items-center space-x-1 flex-wrap justify-center">
                <button
                  className="px-2.5 py-1 border border-gray-300 rounded-md text-sm text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled
                >
                  <HiOutlineChevronLeft className="w-4 h-4" />
                </button>
                <button className="px-2.5 py-1 border border-blue-600 rounded-md text-sm text-white bg-blue-600">
                  1
                </button>
                <button className="px-2.5 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-100">
                  2
                </button>
                <button className="px-2.5 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-100">
                  3
                </button>
                <button className="px-2.5 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-100 hidden sm:inline-block">
                  4
                </button>
                <span className="px-2.5 py-1 text-sm text-gray-500 hidden sm:inline-block">
                  ...
                </span>
                <button className="px-2.5 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-100">
                  40
                </button>
                <button className="px-2.5 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-100">
                  <HiOutlineChevronRight className="w-4 h-4" />
                </button>
              </nav>
            </div>
          </div>
        </main>
      </div>

      {/* Logout Confirmation Modal with 30% Dark Overlay */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.3)]">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-4">Confirm Logout</h3>
            <p className="mb-6">Are you sure you want to log out?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleLogoutConfirm}
                className="px-4 py-2 text-sm text-white bg-red-500 rounded hover:bg-red-600"
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EmployeeInfo;
