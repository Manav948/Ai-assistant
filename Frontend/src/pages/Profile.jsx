import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UploadAvatar from "../component/UploadAvatar";
import Sidebar from "../component/Sidebar.jsx";
import { toast } from "react-hot-toast";
import { ArrowRight, UserCircle, Image as ImageIcon } from "lucide-react";
import P1 from "../assets/avatar/P1.avif";
import P2 from "../assets/avatar/P2.avif";
import P3 from "../assets/avatar/P3.jpg";
import P4 from "../assets/avatar/p4.avif";
import P5 from "../assets/avatar/p5.jpeg";

export default function Profile() {
  const [selectedAvatar, setSelectedAvatar] = useState("");
  const [avatarFiles, setAvatarFiles] = useState([P1, P2, P3, P4, P5]);
  const navigate = useNavigate();

  const handleAvatarUpload = (url) => {
    setAvatarFiles((prev) => [url, ...prev]);
    setSelectedAvatar(url);
  };

  const handleAvatarSelect = (url) => {
    setSelectedAvatar(url);
  };

  const handleNext = () => {
    if (!selectedAvatar) {
      toast.error("Please select or upload an avatar before continuing.");
      return;
    }
    toast.success("Avatar selected successfully!");
    navigate("/assistant-setup", { state: { avatar: selectedAvatar } });
  };

  return (
    <div className="flex min-h-screen bg-[#050505] text-[#e5e2e1] tech-grid overflow-hidden">
      
      {/* Background Glowing Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[30%] left-[20%] w-[320px] h-[320px] rounded-full bg-white/[0.01] blur-[120px] animate-blob-float" />
        <div className="absolute bottom-[20%] right-[30%] w-[300px] h-[300px] rounded-full bg-white/[0.01] blur-[100px] animate-blob-float" style={{ animationDelay: "6s" }} />
      </div>

      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Container */}
      <main className="flex-grow md:ml-64 h-screen overflow-y-auto p-4 sm:p-6 lg:p-12 flex items-center justify-center scroll-container">
        <div className="w-full max-w-3xl flex flex-col items-center">
          
          <div className="text-center mb-8 mt-10 md:mt-0">
            <h1 className="text-3xl sm:text-4xl font-black text-white mb-3 tracking-tight">
              Personalize Your Astra AI
            </h1>
            <p className="text-gray-400 text-sm sm:text-base font-light">
              Upload your own custom image or pick from our collection of avatars.
            </p>
          </div>

          <div className="w-full bg-[#09090d]/85 border border-white/[0.08] backdrop-blur-2xl rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col gap-8 relative overflow-hidden">
            {/* High-tech Corners */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white/20" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white/20" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white/20" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white/20" />

            {/* Custom Upload Panel */}
            <div className="w-full flex justify-center">
              <UploadAvatar onUpload={handleAvatarUpload} />
            </div>

            {/* Avatar Collection Grid */}
            <div className="border-t border-white/10 pt-6">
              <h2 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
                <UserCircle size={18} className="text-white/80" />
                <span>Or Select from Our Avatars</span>
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                {avatarFiles.map((img, index) => {
                  const isSelected = selectedAvatar === img;
                  return (
                    <div
                      key={index}
                      onClick={() => handleAvatarSelect(img)}
                      className={`relative aspect-square rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 border-2 ${
                        isSelected 
                          ? "border-white scale-102 shadow-[0_0_15px_rgba(255,255,255,0.15)] bg-white/5" 
                          : "border-white/10 hover:border-white/30 hover:scale-102 bg-white/[0.01]"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Collection Avatar ${index + 1}`}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                      {isSelected && (
                        <div className="absolute inset-0 bg-white/5 border-2 border-white rounded-2xl pointer-events-none" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Selection Display Panel */}
            {selectedAvatar && (
              <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden border border-white/20 shadow-md">
                    <img
                      src={selectedAvatar}
                      alt="Selected Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-left">
                    <h3 className="text-sm font-bold text-white">Avatar Picked</h3>
                    <p className="text-xs text-gray-400 mt-0.5">Ready to initialize your voice agent profile</p>
                  </div>
                </div>

                <button
                  onClick={handleNext}
                  className="px-8 py-3.5 rounded-2xl bg-white hover:bg-neutral-200 text-neutral-950 font-bold text-sm flex items-center justify-center gap-2 active:scale-95 transition-all w-full sm:w-auto"
                >
                  <span>Continue to Setup</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}
