import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";

export default function Footer() {
  const { user } = useAuth();

  return (
    <footer className="bg-black backdrop-blur-md border-t border-white/10 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-indigo-500 bg-clip-text text-transparent">
                AI Assistant
              </div>
              <span className="text-cyan-400">✨</span>
            </Link>
            <p className="text-gray-400 text-sm">
              Your intelligent virtual assistant powered by advanced AI technology. 
              Streamline your daily tasks with ease and precision.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-cyan-400 transition-colors text-sm"
                >
                  Home
                </Link>
              </li>
              {user ? (
                <>
                  <li>
                    <Link
                      to="/dashboard"
                      className="text-gray-400 hover:text-cyan-400 transition-colors text-sm"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/profile"
                      className="text-gray-400 hover:text-cyan-400 transition-colors text-sm"
                    >
                      Profile
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      to="/signin"
                      className="text-gray-400 hover:text-cyan-400 transition-colors text-sm"
                    >
                      Sign In
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/signup"
                      className="text-gray-400 hover:text-cyan-400 transition-colors text-sm"
                    >
                      Sign Up
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Contact/Info */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg">Connect</h3>
            <ul className="space-y-2">
              <li className="text-gray-400 text-sm">
                Version 1.0.0
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} AI Assistant. All rights reserved.
          </p>
          <div className="flex items-center space-x-4">
            <a
              href="#"
              className="text-gray-400 hover:text-cyan-400 transition-colors text-sm"
              onClick={(e) => {
                e.preventDefault();
                toast.info("Terms & Privacy coming soon!");
              }}
            >
              Terms
            </a>
            <span className="text-gray-600">|</span>
            <a
              href="#"
              className="text-gray-400 hover:text-cyan-400 transition-colors text-sm"
              onClick={(e) => {
                e.preventDefault();
                toast.info("Privacy policy coming soon!");
              }}
            >
              Privacy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
