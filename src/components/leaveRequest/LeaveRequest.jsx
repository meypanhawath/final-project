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
  HiX,
} from "react-icons/hi";
import Icon from "../../assets/close.png";

// --- SidebarItem Component ---
const SidebarItem = ({ icon, text, Approve, href = "#", onClick }) => (
  <a
    href={href}
    onClick={onClick}
    className={`flex items-center px-4 py-3 rounded-md text-sm font-medium transition-colors duration-150 ease-in-out group ${
      Approve
        ? "bg-primary-color text-white"
        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
    }`}
  >
    {React.createElement(icon, {
      className: `w-5 h-5 mr-3 flex-shrink-0 ${
        Approve ? "text-white" : "text-gray-400 group-hover:text-gray-500"
      }`,
    })}
    <span className="truncate">{text}</span>
    <HiOutlineChevronRight
      className={`w-4 h-4 ml-auto text-gray-400 ${
        Approve ? "text-white" : "opacity-0 group-hover:opacity-100"
      } transition-opacity`}
    />
  </a>
);

const StatusBadge = ({ status }) => {
  return (
    <span
      className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full whitespace-nowrap ${
        status === "Approve"
          ? "bg-green-100 text-green-800"
          : status === "Deny"
          ? "bg-red-100 text-red-800"
          : status === "Pending"
          ? "bg-yellow-100 text-yellow-800"
          : "bg-gray-100 text-gray-800"
      }`}
    >
      {status}
    </span>
  );
};

const initialEmployees = [
  {
    id: "I-0001",
    name: "Jane Cooper",
    StartDate: "7-April-2015",
    StartEnd: "7-April-2015",
    status: "Approve",
    reason: "Medical leave"
  },
  {
    id: "I-0002",
    name: "Doe Laly",
    StartDate: "8-April-2015",
    StartEnd: "8-April-2015",
    status: "Deny",
    reason: "Family emergency"
  },
  {
    id: "I-0003",
    name: "John reach",
    StartDate: "8-April-2015",
    StartEnd: "9-April-2015",
    status: "Deny",
    reason: "Personal reasons"
  },
  {
    id: "I-0005",
    name: "Koko Tesla",
    StartDate: "8-April-2015",
    StartEnd: "9-April-2015",
    status: "Pending",
    reason: "Vacation"
  },
  {
    id: "I-0006",
    name: "Jack bot",
    StartDate: "8-April-2015",
    StartEnd: "20-April-2015",
    status: "Pending",
    reason: "Work from home"
  },
  {
    id: "I-0007",
    name: "Mic Roza",
    StartDate: "8-April-2015",
    StartEnd: "21-April-2015",
    status: "Pending",
    reason: "Conference attendance"
  },
];

const PendingCard = ({ selectedRequest, closeModal, onStatusChange }) => {
  return (
    <section className="fixed inset-0 bg-[rgba(0,0,0,0.3)] flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
        <div className="flex justify-between mb-4 items-center">
          <h2 className="text-gray-800 font-semibold text-lg">Request for Leave</h2>
          <button onClick={closeModal} aria-label="Close modal">
            <img src={Icon} alt="close" className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4 flex justify-between mb-4">
          <p>ID: {selectedRequest.id}</p>
          <div className="flex gap-2">
            <button
              type="button"
              className="px-4 py-2 bg-green-100 text-green-700 border border-green-700 rounded-md hover:bg-green-200 transition-colors md:mr-1 cursor-pointer"
              onClick={() => onStatusChange("Approve")}
            >
              Approve
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-red-100 text-red-700 border border-red-700 rounded-md hover:bg-red-200 transition-colors md:mr-10 cursor-pointer"
              onClick={() => onStatusChange("Deny")}
            >
              Deny
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center">
            <label className="text-sm font-medium text-gray-700 w-24">Name</label>
            <input
              value={selectedRequest.name}
              className="w-full md:w-[71%] rounded-md border border-gray-200 px-3 py-1.5 bg-gray-50"
              readOnly
            />
          </div>

          <div className="flex items-center">
            <label className="text-sm font-medium text-gray-700 w-24">Start Date</label>
            <input
              value={selectedRequest.StartDate}
              className="w-full md:w-[71%] rounded-md border border-gray-200 px-3 py-1.5 bg-gray-50"
              readOnly
            />
          </div>

          <div className="flex items-center">
            <label className="text-sm font-medium text-gray-700 w-24">End Date</label>
            <input
              value={selectedRequest.StartEnd}
              className="w-full md:w-[71%] rounded-md border border-gray-200 px-3 py-1.5 bg-gray-50"
              readOnly
            />
          </div>

          <div className="flex items-start">
            <label className="text-sm font-medium text-gray-700 w-24">Reason</label>
            <textarea
              value={selectedRequest.reason}
              className="w-full md:w-[71%] rounded-md border border-gray-200 px-3 py-1.5 bg-gray-50"
              readOnly
              rows="3"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

function LeaveRequest() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showPendingCard, setShowPendingCard] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [employees, setEmployees] = useState(initialEmployees);
  const navigate = useNavigate();

  const handleStatusUpdate = (id, newStatus) => {
    setEmployees(prevEmployees =>
      prevEmployees.map(emp =>
        emp.id === id ? { ...emp, status: newStatus } : emp
      )
    );
    setShowPendingCard(false);
  };

  const openPendingCard = (employee) => {
    if (employee.status === "Pending") {
      setSelectedRequest(employee);
      setShowPendingCard(true);
    }
  };

  const closeSidebar = () => setIsSidebarOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    setShowLogoutModal(false);
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Pending Card Modal */}
      {showPendingCard && (
        <PendingCard
          selectedRequest={selectedRequest}
          closeModal={() => setShowPendingCard(false)}
          onStatusChange={(newStatus) =>
            handleStatusUpdate(selectedRequest.id, newStatus)
          }
        />
      )}

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
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out flex flex-col ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:relative lg:translate-x-0 lg:flex lg:flex-shrink-0 lg:shadow-md lg:z-auto`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 md:h-20 border-b flex-shrink-0 px-18">
          <div className="flex items-center">
            <span className="text-lg md:text-xl font-semibold text-gray-800">
              Checkify
            </span>
          </div>
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
          <Link to="/empInfo">
            <SidebarItem
              icon={HiOutlineUsers}
              text="Employee"
              onClick={closeSidebar}
            />
          </Link>
          <Link to="/empAttendance">
            <SidebarItem
              icon={HiOutlineCalendar}
              text="Attendance"
              onClick={closeSidebar}
            />
          </Link>
          <SidebarItem
            icon={HiOutlineDocumentText}
            text="Leave request"
            Approve={true}
            onClick={closeSidebar}
          />
        </nav>

        {/* Sidebar Footer */}
        <div className="px-2 md:px-4 py-4 border-t flex-shrink-0">
          <button
            onClick={() => setShowLogoutModal(true)}
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-100 group"
          >
            <HiOutlineLogout className="w-5 h-5 mr-3 text-gray-400 group-hover:text-gray-500 flex-shrink-0" />
            <span className="truncate">Log out</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
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
              />
            </svg>
          </button>
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-xl font-bold text-primary-color truncate">
            Leave Request
          </h1>
          <button className="p-1 ml-auto bg-blue-100 rounded-full text-primary-color hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <HiOutlineBell className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4 md:p-6">
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
            {/* Table Section */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4 md:mb-6 space-y-3 sm:space-y-0 sm:space-x-4">
              <h2 className="text-lg md:text-xl font-semibold text-gray-800">
                All Employee Leave Requests
              </h2>
              <div className="flex flex-col sm:flex-row items-center w-full sm:w-auto space-y-3 sm:space-y-0 sm:space-x-4">
                <div className="relative w-full sm:w-auto">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <HiOutlineSearch className="w-5 h-5 text-gray-400" />
                  </span>
                  <input
                    type="text"
                    placeholder="Search employees"
                    className="w-full sm:w-48 md:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="relative w-full sm:w-auto">
                  <button className="flex items-center justify-between w-full sm:w-auto md:w-40 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <span>Sort by :</span>
                    <HiOutlineChevronDown className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Start Date
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      End Date
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {employees.map((employee) => (
                    <tr
                      key={employee.id}
                      onClick={() => openPendingCard(employee)}
                      className={`hover:bg-gray-50 ${
                        employee.status === "Pending" ? "cursor-pointer" : "cursor-default"
                      }`}
                    >
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {employee.id}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                        {employee.name}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                        {employee.StartDate}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                        {employee.StartEnd}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm">
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
                Showing {employees.length} of {employees.length} entries
              </p>
              <nav className="flex items-center space-x-1 flex-wrap justify-center">
                {/* Pagination buttons remain same */}
              </nav>
            </div>
          </div>
        </main>
      </div>

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.3)] z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-sm mx-auto">
            <h3 className="text-lg font-semibold mb-4">Confirm Logout</h3>
            <p className="mb-6">Are you sure you want to log out?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LeaveRequest;