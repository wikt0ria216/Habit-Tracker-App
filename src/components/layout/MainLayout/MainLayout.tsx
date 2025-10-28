import { Outlet } from "react-router";

import SideBar from "@layout/SideBar/SideBar";

import "./mainlayout.css";

const MainLayout = () => {
  return (
    <div className="main-layout">
      <SideBar />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
