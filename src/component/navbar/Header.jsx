import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import axios from "axios";
import { CgProfile } from "react-icons/cg";
import { useUser } from "../../context/userContext";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Get user data and methods from context
  const { user, login, logout } = useUser();
const username = JSON.parse(localStorage.getItem("user"));
console.log(username);
useEffect(() => {
  const fetchUser = async () => {
    try {
      const response = await axios.get(
        "https://ideasprint-backend.onrender.com/api/users/me?populate=demo_schemas",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      login(response.data);
      console.log("User fetched:", response.data);
    } catch (e) {
      console.log("Error fetching user:", e);
      logout();
    }
  };

  if (token) {
    fetchUser();
  }
}, [token]);

const handleSectionClick = (hash) => {
  if (location.pathname === "/") {
    const element = document.getElementById(hash);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  } else {
    navigate("/");
    setTimeout(() => {
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  }
  setIsOpen(false);
};

const handleLogout = () => {
  logout();
  navigate("/");
};

return (
  <header className="flex px-2 sm:px-8 text-white w-full bg-[#EB6505] font-bold items-center justify-between md:px-10 py-2 relative">
    {/* Logo */}
    <div className="text-2xl">
      <Link to="/">IdeaSprint.</Link>
    </div>

    {/* Desktop Nav */}
    <nav className="hidden md:flex space-x-8 text-white font-medium">
      <button
        onClick={() => handleSectionClick("working")}
        className="cursor-pointer"
      >
        How It works
      </button>
      <button
        onClick={() => handleSectionClick("pricing")}
        className="cursor-pointer"
      >
        Pricing
      </button>
      <button
        onClick={() => handleSectionClick("testimonials")}
        className="cursor-pointer"
      >
        Testimonials
      </button>
      <button
        onClick={() => handleSectionClick("faq")}
        className="cursor-pointer"
      >
        FAQ
      </button>
    </nav>

    {username ? (
      <div className="hidden sm:flex items-center gap-4">
        <div
          className="flex gap-2 items-center cursor-pointer"
          onClick={() => navigate("/dashboard")}
        >
          <CgProfile size={25} />
          <p>{username}</p>
        </div>
        <button
          onClick={handleLogout}
          className="px-3 py-1 bg-white text-[#EB6505] cursor-pointer rounded-md text-sm"
        >
          Logout
        </button>
      </div>
    ) : (
      <div className="hidden md:flex gap-4 items-center justify-center font-normal">
        <Link to="/authpage">Sign in</Link>
        <Link to="/authpage">
          <button className="px-4 py-2 bg-white text-[#EB6505] rounded-3xl">
            Get Started
          </button>
        </Link>
      </div>
    )}

    {/* Mobile Menu Icon */}
    <div className="md:hidden">
      <button onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <HiX size={28} /> : <HiMenu size={28} />}
      </button>
    </div>

    {/* Mobile Dropdown */}
    {isOpen && (
      <div className="absolute top-full left-0 w-full bg-[#EB6505] text-white flex flex-col items-start p-4 space-y-4 md:hidden z-50 shadow-md">
        <button onClick={() => handleSectionClick("working")}>
          How it works
        </button>
        <button onClick={() => handleSectionClick("pricing")}>Pricing</button>
        <button onClick={() => handleSectionClick("testimonials")}>
          Testimonials
        </button>
        <button onClick={() => handleSectionClick("faq")}>FAQ</button>

        {username ? (
          <div className="w-full flex flex-col gap-3">
            <div
              className="flex gap-2 items-center"
              onClick={() => {
                navigate("/dashboard");
                setIsOpen(false);
              }}
            >
              <CgProfile size={25} />
              <p>{username}</p>
            </div>
            <button
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
              className="px-3 py-1 bg-white text-[#EB6505] rounded-md"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-4 items-center justify-center font-normal">
            <Link to="/authpage" onClick={() => setIsOpen(false)}>
              Sign in
            </Link>
            <Link to="/authpage" onClick={() => setIsOpen(false)}>
              <button className="px-4 py-2 bg-white text-[#EB6505] rounded-3xl">
                Get Started
              </button>
            </Link>
          </div>
        )}
      </div>
    )}
  </header>
);
}

export default Header;