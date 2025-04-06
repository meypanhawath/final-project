import React from "react";
import SidebarEmp from "../sidebar/SidebarEmp";
import {
  HiOutlineBell,
  HiOutlineSearch,
  HiOutlineChevronDown,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
} from "react-icons/hi";

// --- StatusBadge Component ---
// Modified to use colors based on "Approve", "Deny", or "Pending"
const StatusBadge = ({ status }) => {
  let bgColor = "";
  let textColor = "";

  if (status === "Approve") {
    bgColor = "bg-green-100";
    textColor = "text-green-800";
  } else if (status === "Deny") {
    bgColor = "bg-red-100";
    textColor = "text-red-800";
  } else if (status === "Pending") {
    bgColor = "bg-yellow-100";
    textColor = "text-yellow-800";
  }

  return (
    <span
      className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full whitespace-nowrap ${bgColor} ${textColor}`}
    >
      {status}
    </span>
  );
};

// --- Mock Data ---
// Adjusted to include only date, day, check-in, check-out, and status.
const attendanceData = [
  {
    date: "28/03/2025",
    day: "Friday",
    checkIn: "7:30 am",
    checkOut: "5:30 pm",
    status: "Approve",
  },
  {
    date: "27/03/2025",
    day: "Thursday",
    checkIn: "7:45 am",
    checkOut: "5:00 pm",
    status: "Deny",
  },
  {
    date: "26/03/2025",
    day: "Wednesday",
    checkIn: "8:00 am",
    checkOut: "5:40 pm",
    status: "Pending",
  },
];

function EmpAttendance() {
  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <SidebarEmp />

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Header Bar */}
        <header className="flex items-center justify-between p-4 md:p-6 bg-white shadow-md">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-xl font-bold text-primary-color truncate">
            Attendance
          </h1>
          <button className="p-1 ml-auto bg-blue-100 rounded-full text-primary-color hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <HiOutlineBell className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4 md:p-6">
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
            {/* Top Bar: Title, Search, Sort */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4 md:mb-6 space-y-3 sm:space-y-0 sm:space-x-4">
              <h2 className="text-lg md:text-xl font-semibold text-gray-800">
                All Attendance
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
                    <span>Sort by :</span>
                    <HiOutlineChevronDown className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </div>
            </div>

            {/* Table Wrapper for Horizontal Scrolling */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Day
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Check-in
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Check-out
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {attendanceData.map((entry, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                        {entry.date}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                        {entry.day}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                        {entry.checkIn}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                        {entry.checkOut}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm">
                        <StatusBadge status={entry.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex flex-col md:flex-row justify-between items-center mt-4 md:mt-6 pt-4 border-t border-gray-200">
              <p className="text-xs sm:text-sm text-gray-600 mb-3 md:mb-0">
                Showing data 1 to 3 of 256K entries
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
    </div>
  );
}

export default EmpAttendance;
