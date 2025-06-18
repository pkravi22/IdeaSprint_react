import React from "react";
import {
  dashboard,
  rocket,
  user,
  contact,
  clock,
  chart,
  bulb,
} from "../constants/ImagePath.js";

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex px-4 sm:px-6 md:px-8 text-white w-full bg-[#EB6505] font-bold items-center justify-between py-2">
        <div className="text-xl sm:text-2xl">IdeaSprint.</div>
        <div>
          <nav className="hidden md:flex space-x-6 lg:space-x-8 text-white font-medium">
            <a href="/home.html" className="hover:text-orange-200 transition">
              How it works
            </a>
            <a href="/home.html" className="hover:text-orange-200 transition">
              Pricing
            </a>
            <a href="/home.html" className="hover:text-orange-200 transition">
              Testimonials
            </a>
            <a href="/home.html" className="hover:text-orange-200 transition">
              FAQ
            </a>
          </nav>
        </div>
        <div className="flex gap-2 sm:gap-4 items-center font-normal">
          <a
            href="/signup.html"
            className="text-sm sm:text-base hover:text-orange-200 transition"
          >
            Sign in
          </a>
          <button className="px-3 py-1 sm:px-4 sm:py-2 bg-white text-[#EB6505] rounded-3xl text-sm sm:text-base hover:bg-orange-50 transition">
            Get Started
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col w-full gap-6 px-4 sm:px-6 py-6">
        <section className="flex flex-col">
          <h1 className="text-2xl sm:text-3xl md:text-4xl text-[#2F2F2F] font-medium tracking-tighter">
            Welcome back, John!
          </h1>
          <p className="text-gray-400 text-sm sm:text-base mt-1 sm:mt-2">
            Track your demo projects and explore new opportunities
          </p>
        </section>

        {/* Stats Grid */}
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

        {/* Projects Section */}
        <section className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 bg-white rounded-lg shadow-sm p-4">
            <div className="flex justify-between mb-4">
              <h2 className="font-medium">Recent Projects</h2>
              <a
                href="#"
                className="text-[#EB6505] text-sm hover:text-orange-700 transition"
              >
                View All
              </a>
            </div>
            <div className="flex flex-col gap-4 min-h-[200px] justify-center items-center">
              <img src={rocket} alt="Growth" className="w-16 h-16" />
              <p className="text-gray-400">No Project Yet</p>
              <button className="bg-[#EB6505] rounded-3xl px-6 py-2 w-full max-w-[250px] text-white hover:bg-orange-600 transition transform hover:scale-105">
                New Demo Request
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="md:w-[35%] flex flex-col gap-6">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h2 className="font-medium py-2">Quick Actions</h2>
              <div className="flex flex-col gap-3">
                {actionsData.map((action, index) => (
                  <ActionButton
                    key={index}
                    icon={action.icon}
                    text={action.text}
                    primary={action.primary}
                    url={action.url}
                  />
                ))}
              </div>
            </div>

            {/* Pro Tip */}
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
const ActionButton = ({ icon, text, primary, url }) => (
  <button
    className={`flex gap-2 items-center justify-center rounded-3xl w-full py-2 px-4 text-sm transition
    ${
      primary
        ? "bg-[#EB6505] text-white hover:bg-white transform hover:scale-105"
        : "border border-gray-200 text-gray-500 hover:bg-orange-500 hover:text-white hover:border-transparent"
    }`}
  >
    <img src={icon} alt={text} className="w-4 h-4" />
    <span>{text}</span>
  </button>
);

// Data for stats cards
const statsData = [
  {
    title: "Today's Money",
    value: "0",
    icon: rocket,
    bgColor: "bg-blue-600",
  },
  {
    title: "In Progress",
    value: "0",
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
    value: "0",
    icon: user,
    bgColor: "bg-violet-600",
  },
];

// Data for action buttons
const actionsData = [
  {
    icon: user,
    text: "New Demo Request",
    primary: true,
    url: "/demorequest",
  },
  {
    icon: dashboard,
    text: "View Dashboard",
    primary: false,
    url: dashboard,
  },
  {
    icon: contact,
    text: "Contact Support",
    primary: false,
    url: "contact",
  },
];

export default Dashboard;