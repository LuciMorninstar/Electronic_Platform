import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/AdminComponents/AdminSidebar";
import AdminNavbar from "../components/AdminComponents/AdminNavbar";

const AdminLayout = () => {
  return (
    <main className=" w-full min-h-screen flex flex-row gap-2">

      <aside className = " h-screen bg-red-500 w-[300px] overflow-y-auto">
        <AdminSidebar />
      </aside>
    <section className="flex flex-1 flex-col gap-5 overflow-hidden">
        <div className = "sticky top-0 z-50">   
      <AdminNavbar  />
        </div>

        <div className = "flex-1 overflow-y-auto px-5">
          <Outlet />
        </div>
     

      </section>
    </main>
  );
};

export default AdminLayout;
