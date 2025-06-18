import { useState } from "react";
import { Link } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="flex px-8 text-white w-full bg-[#EB6505] font-bold items-center justify-between md:px-10 py-2 relative">
      {/* Logo */}
      <div className="text-2xl">
        {" "}
        <Link to="/">IdeaSprint.</Link>
      </div>

      {/* Desktop Nav */}
      <nav className="hidden md:flex space-x-8 text-white font-medium">
        <Link to="/how-it-works">How it works</Link>
        <Link to="/pricing">Pricing</Link>
        <Link to="/testimonials">Testimonials</Link>
        <Link to="/faq">FAQ</Link>
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
          <Link to="/how-it-works" onClick={() => setIsOpen(false)}>
            How it works
          </Link>
          <Link to="/pricing" onClick={() => setIsOpen(false)}>
            Pricing
          </Link>
          <Link to="/testimonials" onClick={() => setIsOpen(false)}>
            Testimonials
          </Link>
          <Link to="/faq" onClick={() => setIsOpen(false)}>
            FAQ
          </Link>
          <Link to="/signin" onClick={() => setIsOpen(false)}>
            Sign in
          </Link>
          <Link to="/signup" onClick={() => setIsOpen(false)}>
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
