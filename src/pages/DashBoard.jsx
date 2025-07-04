import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  dashboard,
  rocket,
  userIcon,
  contact,
  clock,
  chart,
  bulb,
} from "../constants/ImagePath.js";
import { useUser } from "../context/userContext.jsx";

const Dashboard = () => {
  const navigate = useNavigate();
  const username = JSON.parse(localStorage.getItem("user"));
  const [selectedButton, setSelectedButton] = useState("New Demo Request");
  const { user } = useUser();
  console.log(user);
  const token = localStorage.getItem("token");
  const [viewall, setViewAll] = useState(false);
  const [requestToDisplay, setRequestToDisplay] = useState([]);
  useEffect(() => {
    // Redirect to login if no token is present
    if (!token) {
      navigate("/authpage");
    }
  }, [token, navigate]);

  // Safely calculate unique demo requests
  const uniqueDemoRequests = useMemo(() => {
    if (!Array.isArray(user?.demo_schemas)) return [];
    return user.demo_schemas.reduce((acc, current) => {
      if (!acc.some((item) => item.documentId === current.documentId)) {
        acc.push(current);
      }
      return acc;
    }, []);
  }, [user]);

  // Count pending requests
  const totalPending = uniqueDemoRequests?.filter(
    (request) => request.Demo_status === "pending"
  )?.length;

  // Stats data
  const statsData = [
    {
      title: "Today's Money",
      value: "0",
      icon: rocket,
      bgColor: "bg-blue-600",
    },
    {
      title: "In Progress",
      value: totalPending,
      icon: clock,
      bgColor: "bg-orange-400",
    },
    {
      title: "Completed",
      value: "0",
      icon: chart,
      bgColor: "bg-green-600",
    },
    {
      title: "Avg.Delivery",
      value: "24-72h",
      icon: userIcon,
      bgColor: "bg-violet-600",
    },
  ];

  // Quick Actions
  const actionsData = [
    { icon: rocket, text: "New Demo Request", url: "/demorequest" },
    { icon: dashboard, text: "View Dashboard", url: "/dashboard" },
    { icon: contact, text: "Contact Support", url: "/contact" },
  ];

  // Format date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const handleActionClick = (text, url) => {
    setSelectedButton(text);
    navigate(url);
  };

  // Update requests to display based on "view all" toggle
  useEffect(() => {
    if (viewall) {
      setRequestToDisplay(uniqueDemoRequests);
    } else {
      setRequestToDisplay(uniqueDemoRequests?.slice(0, 3));
    }
  }, [viewall, uniqueDemoRequests]);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex flex-col w-full gap-6 px-4 sm:px-6 py-6">
        <section className="flex flex-col">
          <h1 className="text-2xl sm:text-3xl md:text-4xl text-[#2F2F2F] font-medium tracking-tighter">
            Welcome back, {username}!
          </h1>
          <p className="text-gray-400 text-sm sm:text-base mt-1 sm:mt-2">
            Track your demo projects and explore new opportunities
          </p>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {statsData.map((stat, index) => (
            <StatCard
              key={index}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              bgColor={stat.bgColor}
            />
          ))}
        </section>

        <section className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 bg-white rounded-lg shadow-sm p-4">
            <div className="flex justify-between mb-4">
              <h2 className="font-medium">Recent Projects</h2>
              {uniqueDemoRequests?.length > 0 && (
                <button
                  className="text-[#EB6505] text-sm hover:text-orange-700 transition text-left"
                  onClick={() => setViewAll(!viewall)}
                >
                  {viewall ? "View Less" : "View All"}
                </button>
              )}
            </div>

            {Array.isArray(requestToDisplay) && requestToDisplay.length > 0 ? (
              <div className="space-y-4">
                {requestToDisplay.map((request) => (
                  <div
                    key={request.id}
                    className="border border-gray-100 rounded-lg p-4 hover:shadow-md transition cursor-pointer"
                    onClick={() => navigate(`/projects/${request.id}`)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-lg">
                          {request.ProjectName}
                        </h3>
                        <p className="text-gray-500 text-sm">
                          {request.Plan} • {formatDate(request.createdAt)}
                        </p>
                      </div>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          request.Demo_status === "approved"
                            ? "bg-green-100 text-green-800"
                            : request.Demo_status === "rejected"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {request.Demo_status || "pending"}
                      </span>
                    </div>
                    <p className="text-gray-600 mt-2 line-clamp-2">
                      {request.ShortDescription}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-4 min-h-[200px] justify-center items-center">
                <img src={rocket} alt="Growth" className="w-16 h-16" />
                <p className="text-gray-400">Start Your First Demo</p>
                <button
                  className="bg-[#EB6505] rounded-3xl px-6 py-2 w-full max-w-[250px] text-white hover:bg-orange-600 transition transform hover:scale-105"
                  onClick={() =>
                    handleActionClick("New Demo Request", "/demorequest")
                  }
                >
                  New Demo Request
                </button>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="md:w-[35%] flex flex-col gap-6">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h2 className="font-medium py-2">Quick Actions</h2>
              <div className="flex flex-col gap-3">
                {actionsData.map((action, index) => (
                  <ActionButton
                    key={index}
                    icon={action.icon}
                    text={action.text}
                    isSelected={selectedButton === action.text}
                    onClick={() => handleActionClick(action.text, action.url)}
                  />
                ))}
              </div>
            </div>

            <div className="bg-[#FFF6F0] rounded-lg p-4 border border-orange-100">
              <div className="flex gap-2 items-center font-medium text-orange-700">
                <img src={bulb} alt="Tip" className="w-5 h-5" />
                Pro Tip
              </div>
              <p className="text-gray-600 mt-2 text-sm">
                Include detailed mockups or sketches in your submission to get a
                more accurate demo that matches your vision.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

// Stat Card Component
const StatCard = ({ title, value, icon, bgColor }) => (
  <div className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition">
    <div>
      <p className="text-gray-400 text-xs sm:text-sm">{title}</p>
      <p className="text-xl font-medium">{value}</p>
    </div>
    <div className={`p-2 rounded-md ${bgColor}`}>
      <img src={icon} alt={title} className="w-5 h-5" />
    </div>
  </div>
);

// Action Button Component
const ActionButton = ({ icon, text, isSelected, onClick }) => (
  <button
    onClick={onClick}
    className={`flex gap-2 items-center justify-center rounded-3xl w-full py-2 px-4 text-sm transition
      ${
        isSelected
          ? "bg-[#EB6505] text-white"
          : "bg-white border border-gray-200 text-gray-500"
      }
      hover:bg-orange-500 hover:text-white hover:border-transparent
    `}
  >
    <img src={icon} alt={text} className="w-4 h-4" />
    <span>{text}</span>
  </button>
);

export default Dashboard;
