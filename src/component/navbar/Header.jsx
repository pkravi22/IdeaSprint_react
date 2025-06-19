import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleSectionClick = (hash) => {
    if (location.pathname === "/") {
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // Navigate to homepage then scroll to section
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

  return (
    <header className="flex px-8 text-white w-full bg-[#EB6505] font-bold items-center justify-between md:px-10 py-2 relative">
      {/* Logo */}
      <div className="text-2xl">
        <Link to="/">IdeaSprint.</Link>
      </div>

      {/* Desktop Nav */}
      <nav className="hidden md:flex space-x-8 text-white font-medium">
        <button onClick={() => handleSectionClick("working")}>
          How It works
        </button>
        <button onClick={() => handleSectionClick("pricing")}>Pricing</button>
        <button onClick={() => handleSectionClick("testimonials")}>
          Testimonials
        </button>
        <button onClick={() => handleSectionClick("faq")}>FAQ</button>
      </nav>

      {/* Desktop Auth Buttons */}
      <div className="hidden md:flex gap-4 items-center justify-center font-normal">
        <Link to="/authpage">Sign in</Link>
        <Link to="/authpage">
          <button className="px-4 py-2 bg-white text-[#EB6505] rounded-3xl">
            Get Started
          </button>
        </Link>
      </div>

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
          <Link to="/authpage" onClick={() => setIsOpen(false)}>
            Sign in
          </Link>
          <Link to="/authpage" onClick={() => setIsOpen(false)}>
            <button className="px-4 py-2 bg-white text-[#EB6505] rounded-3xl w-full text-left">
              Get Started
            </button>
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;