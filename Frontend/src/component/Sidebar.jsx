import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import api from "../lib/axios.js";
import { toast } from "react-hot-toast";
import { 
  Home as HomeIcon, 
  Mic, 
  UserCircle, 
  Settings, 
  LogOut, 
  Menu, 
  X 
} from "lucide-react";

export default function Sidebar() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await api.get("/api/auth/logout", { withCredentials: true });
      setUser(null);
      localStorage.clear();
      toast.success("Logged out successfully!");
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed. Please try again.");
    } finally {
      setIsLoggingOut(false);
    }
  };

  const menuItems = [
    { name: "Home", path: "/", icon: HomeIcon },
    { name: "Voice Assistant", path: "/dashboard", icon: Mic },
    { name: "Avatar Setup", path: "/profile", icon: UserCircle },
    { name: "Assistant Name", path: "/assistant-setup", icon: Settings },
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
     
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-xl glass-card text-white hover:bg-white/10 active:scale-95 transition-all"
        aria-label="Toggle Menu"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

   
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="md:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
        />
      )}

  
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-[#0e0e0e]/85 border-r border-white/10 backdrop-blur-2xl py-6 flex flex-col justify-between z-40 transition-transform duration-300 md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
         
          <div className="px-6 mb-10 flex items-center justify-between">
            <div>
              <Link to="/" className="flex items-center space-x-2 group">
                <h1 className="text-2xl font-black text-white tracking-tight">Voxa <span className="text-white/80">AI</span></h1>
              </Link>
              <p className="text-[10px] uppercase font-mono tracking-widest text-gray-500 mt-1">Assistant Interface</p>
            </div>
          </div>

          <nav className="px-3">
            <ul className="space-y-1.5">
              {menuItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = location.pathname === item.path;

                return (
                  <li key={item.name}>
                    <Link
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative ${
                        isActive
                          ? "bg-white/10 text-white border-l-2 border-white font-semibold shadow-inner"
                          : "text-gray-400 hover:text-white hover:bg-white/[0.02]"
                      }`}
                    >
                      <IconComponent
                        size={18}
                        className={`transition-colors ${isActive ? "text-white" : "text-gray-400 group-hover:text-white"}`}
                      />
                      <span className="text-sm font-medium">{item.name}</span>
                      
                   
                      {isActive && (
                        <div className="absolute right-3 w-1.5 h-1.5 rounded-full bg-white animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.7)]" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        <div className="px-4 mt-auto">
          {user && (
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 mb-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-r from-white to-gray-400 flex items-center justify-center font-bold text-sm text-black shadow-md">
                {user.username?.charAt(0).toUpperCase() || "U"}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-white truncate">{user.username}</p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
              </div>
            </div>
          )}

          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 font-medium text-sm border border-red-500/10 transition-all active:scale-95 disabled:opacity-50"
          >
            <LogOut size={16} />
            <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
          </button>
        </div>
      </aside>
    </>
  );
}
