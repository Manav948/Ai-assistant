import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useState } from "react";
import api from "../lib/axios.js";
import { toast } from "react-hot-toast";

export default function Header() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const hideHeaderPaths = ["/dashboard", "/profile", "/assistant-setup"];
  if (hideHeaderPaths.includes(location.pathname)) {
    return null;
  }

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await api.get("/api/auth/logout", { withCredentials: true });
      setUser(null);
      localStorage.clear();
      toast.success("Logged out successfully!");
      navigate("/");
      setShowMenu(false);
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed. Please try again.");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-black/40 border-b border-white/[0.05]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <span className="text-2xl font-black text-white tracking-tight">
              Astra <span className="text-white/85">AI</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-300 hover:text-white transition-colors font-medium text-sm"
            >
              Home
            </Link>
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-gray-300 hover:text-white transition-colors font-medium text-sm"
                >
                  Dashboard
                </Link>
                <Link
                  to="/profile"
                  className="text-gray-300 hover:text-white transition-colors font-medium text-sm"
                >
                  Profile
                </Link>
                <div className="relative">
                  <button
                    onClick={() => setShowMenu(!showMenu)}
                    className="flex items-center space-x-2.5 text-gray-300 hover:text-white transition-colors"
                  >
                    <div className="h-8 w-8 rounded-full bg-gradient-to-r from-white to-gray-400 flex items-center justify-center text-black font-bold text-sm shadow-md">
                      {user.username?.charAt(0).toUpperCase() || "U"}
                    </div>
                    <span className="font-medium text-sm">{user.username || "User"}</span>
                    <svg
                      className={`w-4 h-4 transition-transform duration-200 ${showMenu ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {showMenu && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setShowMenu(false)}
                      />
                      <div className="absolute right-0 mt-2.5 w-52 bg-[#0d0d12]/95 border border-white/10 backdrop-blur-xl rounded-2xl shadow-2xl py-2 z-20 overflow-hidden">
                        <div className="px-4 py-3 border-b border-white/5 bg-white/[0.01]">
                          <p className="text-sm font-semibold text-white truncate">{user.username}</p>
                          <p className="text-xs text-gray-400 truncate mt-0.5">{user.email}</p>
                        </div>
                        <button
                          onClick={handleLogout}
                          disabled={isLoggingOut}
                          className="w-full text-left px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors flex items-center space-x-2 disabled:opacity-50"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                            />
                          </svg>
                          <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/signin"
                  className="text-gray-300 hover:text-white transition-colors text-sm font-medium px-4 py-2 rounded-xl hover:bg-white/[0.02]"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="bg-white text-black font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-gray-200 transition-all active:scale-95 shadow-md shadow-white/5"
                >
                  Sign Up
                </Link>
              </>
            )}
          </nav>

         
          <div className="md:hidden flex items-center">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  className="h-8 w-8 rounded-full bg-gradient-to-r from-white to-gray-400 flex items-center justify-center text-black font-bold text-sm shadow-md"
                >
                  {user.username?.charAt(0).toUpperCase() || "U"}
                </button>
                {showMenu && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setShowMenu(false)}
                    />
                    <div className="absolute right-0 mt-2.5 w-48 bg-[#0d0d12]/95 border border-white/10 backdrop-blur-xl rounded-2xl shadow-2xl py-2 z-20">
                      <div className="px-4 py-2.5 border-b border-white/5">
                        <p className="text-sm font-semibold text-white truncate">{user.username}</p>
                        <p className="text-xs text-gray-400 truncate">{user.email}</p>
                      </div>
                      <Link
                        to="/"
                        onClick={() => setShowMenu(false)}
                        className="block px-4 py-2.5 text-sm text-gray-300 hover:bg-white/[0.02] transition-colors"
                      >
                        Home
                      </Link>
                      <Link
                        to="/dashboard"
                        onClick={() => setShowMenu(false)}
                        className="block px-4 py-2.5 text-sm text-gray-300 hover:bg-white/[0.02] transition-colors"
                      >
                        Dashboard
                      </Link>
                      <Link
                        to="/profile"
                        onClick={() => setShowMenu(false)}
                        className="block px-4 py-2.5 text-sm text-gray-300 hover:bg-white/[0.02] transition-colors"
                      >
                        Profile
                      </Link>
                      <div className="border-t border-white/5 my-1" />
                      <button
                        onClick={handleLogout}
                        disabled={isLoggingOut}
                        className="w-full text-left px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors flex items-center space-x-2 disabled:opacity-50"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                          />
                        </svg>
                        <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2.5">
                <Link
                  to="/signin"
                  className="text-gray-300 hover:text-white transition-colors text-xs font-medium px-3 py-2 rounded-xl hover:bg-white/[0.02]"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="bg-white text-black font-semibold text-xs px-4 py-2 rounded-xl transition-all shadow-md active:scale-95"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
