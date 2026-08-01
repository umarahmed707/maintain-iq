import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Home,
  Package,
 
  Users,
  Settings,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { signOut } from "firebase/auth/cordova";
import { getAuth } from "firebase/auth";




const Sidebar = () => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const auth = getAuth();
  

  const handleLogout = async () => {
  try {
    await signOut(auth);
    navigate("/login");
  } catch (error) {
    console.log(error);
  }
};

  const menuItems = [
    { name: "Dashboard", icon: <Home size={20} />, path: "/" },
    { name: "Assets", icon: <Package size={20} />, path: "/assets" },
    { name: "Issue", icon: <Package size={20} />, path: "/issue" },

  ];

  return (
    <>
      {/* Mobile Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-[#4F46E5] text-white p-2 rounded-lg"
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden "
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-[#2563EB] text-[#1E293B] shadow-xl transform transition-transform duration-300 z-40 flex flex-col justify-between
        ${open ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0`}
      >
        {/* Logo */}
        <div className="flex flex-col">

<div className="h-20 flex items-center justify-center gap-3 mt-4 border-b border-[#E2E8F0]/20">
  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shadow-lg">
    <Package size={26} className="text-white" />
  </div>

  <div>
    <h1 className="text-2xl font-bold text-white mt-3 leading-none">
      MaintainIQ
    </h1>
    <p className="text-xs text-blue-100 mt-1">
      Asset Management
    </p>
  </div>
</div>

        {/* Menu */}
        <nav className="mt-6 px-4">
          {menuItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3 rounded-lg mb-2 transition-all duration-300 ${
                  isActive
                    ? "bg-[#1D4ED8] text-white"
                    : "text-gray-300 hover:bg-slate-800 hover:text-white"
                }`
              }
              onClick={() => setOpen(false)}
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>
        </div>
            <div className="p-4 border-t border-[#E2E8F0]">
      <button
        onClick={handleLogout}
        className="w-full flex items-center justify-center text-[#4F46E5] gap-2 bg-white hover:bg-gray-200 py-3 rounded-lg transition"
      >
        <LogOut size={20} />
        Logout
      </button>
    </div>

      </div>
    </>
  );
};

export default Sidebar;