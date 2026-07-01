import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { toast } from "react-hot-toast";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  const { user } = useAuth();
  const location = useLocation();

  const hideFooterPaths = ["/dashboard", "/profile", "/assistant-setup"];

  if (hideFooterPaths.includes(location.pathname)) {
    return null;
  }

  return (
    <footer className="bg-[#030303] border-t border-white/10 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2 group">
              <span className="text-xl font-black text-white tracking-tight">
                Voxa <span className="text-white/85">AI</span>
              </span>
            </Link>

            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              Your intelligent virtual assistant powered by Voxa AI technology.
              Elevate your productivity with voice-powered precision.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider">
              Quick Links
            </h3>

            <ul className="space-y-2.5">
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Home
                </Link>
              </li>

              {user ? (
                <>
                  <li>
                    <Link
                      to="/dashboard"
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      Dashboard
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/profile"
                      className="text-gray-400 hover:text-white transition-colors text-sm"
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
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      Sign In
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/signup"
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      Sign Up
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Status */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider">
              Status
            </h3>

            <ul className="space-y-2.5">
              <li className="text-gray-400 text-sm flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
                All Systems Operational
              </li>

              <li className="text-gray-400 text-sm">
                Engine Version 1.0.0
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider">
              Connect
            </h3>

            <div className="flex flex-col space-y-3">
              <a
                href="https://github.com/manav948"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-400 hover:text-white transition-all duration-300 group"
              >
                <FaGithub className="text-lg group-hover:scale-110 transition-transform" />
                <span className="text-sm">GitHub</span>
              </a>

              <a
                href="https://linkedin.com/in/manav-valani"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-400 hover:text-white transition-all duration-300 group"
              >
                <FaLinkedin className="text-lg group-hover:scale-110 transition-transform" />
                <span className="text-sm">LinkedIn</span>
              </a>

              <a
                href="https://x.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-400 hover:text-white transition-all duration-300 group"
              >
                <FaXTwitter className="text-lg group-hover:scale-110 transition-transform" />
                <span className="text-sm">Twitter / X</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} Voxa AI. All rights reserved.
          </p>

          <div className="flex items-center space-x-5">
            <a
              href="#"
              className="text-gray-500 hover:text-white transition-colors text-xs"
              onClick={(e) => {
                e.preventDefault();
                toast.success(
                  "Terms of Service: Standard usage of Web Speech API and Gemini services apply."
                );
              }}
            >
              Terms
            </a>

            <span className="text-gray-700 text-xs">|</span>

            <a
              href="#"
              className="text-gray-500 hover:text-white transition-colors text-xs"
              onClick={(e) => {
                e.preventDefault();
                toast.success(
                  "Privacy Policy: Voice data is processed securely. No recordings are stored without your consent."
                );
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