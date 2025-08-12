import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { supabase } from "../../../supabaseClient";
import store from "../../../redux/store";
import { logout } from "../../../redux/auth/actions";
import {
  Sun,
  Moon,
  UserCircle,
  Search,
  CircleDot,
  Menu,
  X,
} from "lucide-react";

export default function MerchantNavbar() {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const dropdownRef = useRef(null);
  const user = useSelector((state) => state.auth.user);

  const handleLogout = async () => {
    store.dispatch(logout());
    await supabase.auth.signOut();
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="w-full bg-gradient-to-r from-[#1b1f2c] to-[#0f2936] border border-white/10 rounded-full p-2 px-4 shadow-inner mt-4 max-w-6xl mx-auto">
      <div className="flex items-center justify-between gap-4">
        {/* Logo */}
        <h1
          onClick={() => navigate("/dashboard")}
          className="text-2xl h-6 font-grifter cursor-pointer text-cyan-300"
        >
          PAGA
        </h1>

        {/* Search - Desktop only */}
        <div className="ml-auto hidden md:flex items-center justify-end">
          <div className="w-full max-w-md flex items-center bg-transparent border border-white/20 rounded-full px-4 py-2">
            <input
              type="text"
              placeholder="Search"
              className="flex-1 bg-transparent outline-none text-md font-aeonik text-white placeholder-white/60"
            />
            <Search size={16} className="text-white" />
          </div>
        </div>

        {/* Right: Darkmode, User, Hamburger */}
        <div className="flex items-center gap-4">
          {/* User Dropdown - desktop only */}
          <div className="relative hidden md:block">
            <div
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 cursor-pointer text-md text-white"
            >
              <UserCircle size={22} className="text-cyan-400" />
              <span className="truncate font-aeonik max-w-[120px]">
                {user?.user_metadata.name}
              </span>
            </div>

            {dropdownOpen && (
              <div
                ref={dropdownRef}
                className="absolute right-0 mt-2 w-40 bg-[#1c1f26] font-aeonik text-white border border-white/10 rounded-lg p-2 shadow z-50"
              >
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 hover:bg-white/10 rounded"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden mt-2 bg-[#1c1f26] border border-white/10 rounded-lg p-4 shadow text-md space-y-2 font-aeonik text-white">
          <button
            onClick={() => navigate("/merchant/dashboard")}
            className="block w-full text-left py-2 hover:underline"
          >
            Dashboard
          </button>
          <button
            onClick={handleLogout}
            className="block w-full text-left py-2 hover:underline"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
}
