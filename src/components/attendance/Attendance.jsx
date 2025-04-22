import React, { useState, useEffect } from "react";
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
import AdminAttendance from "../../services/adminAttendance";

// SidebarItem Component
const SidebarItem = ({ icon, text, Present, href = "#", onClick }) => (
  <a
    href={href}
    onClick={onClick}
    className={`flex items-center px-4 py-3 rounded-md text-sm font-medium transition-colors duration-150 ease-in-out group ${
      Present
        ? "bg-primary-color text-white"
        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
    }`}
  >
    {React.createElement(icon, {
      className: `w-5 h-5 mr-3 flex-shrink-0 ${
        Present ? "text-white" : "text-gray-400 group-hover:text-gray-500"
      }`,
    })}
    <span className="truncate">{text}</span>
    <HiOutlineChevronRight
      className={`w-4 h-4 ml-auto text-gray-400 ${
        Present ? "text-white" : "opacity-0 group-hover:opacity-100"
      } transition-opacity`}
    />
  </a>
);

// StatusBadge Component
const StatusBadge = ({ status }) => {
  const normalized = status?.toUpperCase();
  let bgClass = "bg-gray-100";
  let textClass = "text-gray-800";

  if (normalized === "PRESENT") {
    bgClass = "bg-green-100";
    textClass = "text-green-800";
  } else if (normalized === "ON_LEAVE") {
    bgClass = "bg-yellow-100";
    textClass = "text-yellow-800";
  } else if (normalized === "ABSENT") {
    bgClass = "bg-red-100";
    textClass = "text-red-800";
  }

  return (
    <span
      className={`
        ${bgClass} ${textClass}
        px-3 py-1 inline-flex text-xs leading-5 font-semibold 
        rounded-full whitespace-nowrap
      `}
    >
      {status}
    </span>
  );
};

// Generate mock attendance data with repeated employees
const generateAttendanceData = () => {
  const baseEmployees = [
    {
      id: "I-0001",
      name: "Jane Cooper",
      date: "28/03/2025",
      checkIn: "7:30 am",
      checkOut: "5:30 pm",
      status: "Present",
    },
    {
      id: "I-0002",
      name: "Doe Laly",
      date: "27/03/2025",
      checkIn: "7:30 am",
      checkOut: "5:00 pm",
      status: "Absent",
    },
    {
      id: "I-0003",
      name: "John reach",
      date: "28/03/2025",
      checkIn: "7:30 am",
      checkOut: "5:40 pm",
      status: "Present",
    },
    {
      id: "I-0005",
      name: "Koko Tesla",
      date: "28/03/2025",
      checkIn: "7:30 am",
      checkOut: "6:00 pm",
      status: "Present",
    },
    {
      id: "I-0006",
      name: "Jack bot",
      date: "28/03/2025",
      checkIn: "7:30 am",
      checkOut: "5:00 pm",
      status: "Present",
    },
    {
      id: "I-0007",
      name: "Mic Roza",
      date: "28/03/2025",
      checkIn: "7:30 am",
      checkOut: "5:00 pm",
      status: "Present",
    },
  ];

  const attendanceData = [];
  for (let i = 0; i < 5; i++) {
    baseEmployees.forEach((emp) => {
      attendanceData.push({
        ...emp,
        date: `${28 - i}/03/2025`,
        checkIn: `${7 + i}:${30 - i * 5} am`,
        checkOut: `${5 + i}:${30 + i * 5} pm`,
        status: Math.random() > 0.2 ? "Present" : "Absent",
      });
    });
  }
  return attendanceData.slice(0, 30); // Return exactly 30 entries
};

const employeeData = generateAttendanceData();

function Attendance() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const navigate = useNavigate();

  // Filter employees based on search term
  const filteredEmployees = employeeData.filter((employee) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      employee.name.toLowerCase().includes(searchLower) ||
      employee.id.toLowerCase().includes(searchLower)
    );
  });
  // Pagination calculations
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const indexOfLastEmployee = currentPage * itemsPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - itemsPerPage;
  const currentEmployees = filteredEmployees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );

  // Reset to first page when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const closeSidebar = () => setIsSidebarOpen(false);

  const handleLogoutConfirm = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    setShowLogoutConfirm(false);
    navigate("/");
  };

  // Generate page numbers
  const getPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const [attendances, setAttendances] = useState([]);

  // useEffect(() => {
  //   let accessToken = localStorage.getItem("accessToken");
  //   AdminAttendance.getAllAttendances(accessToken, currentPage - 1, 6)
  //     .then((response) => {
  //       let temp = [];

  //       console.log("Getting all Attendance: ", response.data);
  //       //setAttendances(response.data._embedded.attendances);
  //       for (let att of response.data._embedded.attendances) {
  //         console.log("each att", att);
  //         AdminAttendance.getEmployeeAttendance(
  //           accessToken,
  //           att._links.employee.href
  //         ).then((res) => {
  //           console.log("employee attendance", res.data);
  //           att.employee = res.data;
  //           temp.push(att);
  //           console.log("final att", att);
  //           setAttendances(temp);
  //         });
  //       }

        

  //       console.log("Getting all Attendance: ", attendances);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching attendance: ", error);
  //     });
  // }, [currentPage]);

  useEffect(() => {
    let accessToken = localStorage.getItem("accessToken");
    AdminAttendance.getAllAttendances(accessToken, currentPage - 1, 6)
      .then((response) => {
        console.log("Getting all Attendance: ", response.data);
  
        const attendancePromises = response.data._embedded.attendances.map((att) =>
          AdminAttendance.getEmployeeAttendance(
            accessToken,
            att._links.employee.href
          ).then((res) => {
            att.employee = res.data; // Add employee data to the attendance object
            return att; // Return the enriched attendance object
          })
        );
  
        // Wait for all API calls to complete
        Promise.all(attendancePromises)
          .then((enrichedAttendances) => {
            console.log("Final enriched attendances: ", enrichedAttendances);
            setAttendances(enrichedAttendances); // Update state with all enriched attendances
          })
          .catch((error) => {
            console.error("Error enriching attendances: ", error);
          });
      })
      .catch((error) => {
        console.error("Error fetching attendances: ", error);
      });
  }, [currentPage]);

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Mobile Sidebar Overlay */}
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
          <Link to="/adminDashboard" onClick={closeSidebar}>
            <SidebarItem icon={HiOutlineViewGrid} text="Dashboard" />
          </Link>
          <Link to="/empInfo" onClick={closeSidebar}>
            <SidebarItem icon={HiOutlineUsers} text="Employee" />
          </Link>
          <SidebarItem
            icon={HiOutlineCalendar}
            text="Attendance"
            Present={true}
            onClick={closeSidebar}
          />
          <Link to="/empLeave" onClick={closeSidebar}>
            <SidebarItem icon={HiOutlineDocumentText} text="Leave request" />
          </Link>
        </nav>

        {/* Sidebar Footer */}
        <div className="px-2 md:px-4 py-4 border-t flex-shrink-0">
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-100 focus:outline-none"
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
            Attendance
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
                All Employee Attendance
              </h2>
              <div className="flex flex-col sm:flex-row items-center w-full sm:w-auto space-y-3 sm:space-y-0 sm:space-x-4">
                {/* Search Input */}
                <div className="relative w-full sm:w-auto">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <HiOutlineSearch className="w-5 h-5 text-gray-400" />
                  </span>
                  <input
                    type="text"
                    placeholder="Search by name or ID"
                    className="w-full sm:w-48 md:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
              </div>
            </div>

            {/* Table Wrapper */}
            <div className="overflow-x-auto">
              <table className="w-full block md:table divide-y divide-gray-200">
                <thead className="block md:table-header-group bg-gray-50">
                  <tr className="border-b border-gray-200 block md:table-row">
                    <th className="w-60 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider block md:table-cell">
                      Name
                    </th>
                    <th className="w-60 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider items-center block md:table-cell">
                      Date
                    </th>
                    <th className="w-60 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider block md:table-cell">
                      Checkin
                    </th>
                    <th className="w-60 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap block md:table-cell">
                      Checkout
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider block md:table-cell">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="block md:table-row-group">
                  {currentEmployees.length === 0 ? (
                    <tr className="block md:table-row">
                      <td
                        colSpan="6" className="px-4 py-6 text-center text-gray-500"
                      >
                        No attendance records found
                      </td>
                    </tr>
                  ) : (
                    attendances.map((attendance) => (
                      <tr
                        className="hover:bg-gray-50"
                      >
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700 block md:table-cell">
                          {attendance.employee.firstName + " " + attendance.employee.lastName}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700 block md:table-cell">
                          {attendance.date}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700 truncate max-w-xs block md:table-cell">
                          {attendance.checkInTime}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700 block md:table-cell">
                          {attendance.checkOutTime}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm block md:table-cell">
                          <StatusBadge status={attendance.status} />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex flex-col md:flex-row justify-between items-center mt-4 md:mt-6 pt-4 border-t border-gray-200">
              <p className="text-xs sm:text-sm text-gray-600 mb-3 md:mb-0">
                Showing {indexOfFirstEmployee + 1} to{" "}
                {Math.min(indexOfLastEmployee, filteredEmployees.length)} of{" "}
                {filteredEmployees.length} entries
              </p>
              <nav className="flex items-center space-x-1 flex-wrap justify-center">
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-2.5 py-1 border border-gray-300 rounded-md text-sm text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <HiOutlineChevronLeft className="w-4 h-4" />
                </button>

                {getPageNumbers().map((number) => (
                  <button
                    key={number}
                    onClick={() => setCurrentPage(number)}
                    className={`px-2.5 py-1 border rounded-md text-sm ${
                      currentPage === number
                        ? "border-blue-600 bg-blue-600 text-white"
                        : "border-gray-300 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {number}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-2.5 py-1 border border-gray-300 rounded-md text-sm text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <HiOutlineChevronRight className="w-4 h-4" />
                </button>
              </nav>
            </div>
          </div>
        </main>
      </div>

      {/* Logout Confirmation Modal */}
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

export default Attendance;
