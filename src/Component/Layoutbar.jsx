import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

function Layoutbar() {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-6 bg-[#F9FAFB]">
        <Outlet />
      </div>
    </div>
  );
}

export default Layoutbar;