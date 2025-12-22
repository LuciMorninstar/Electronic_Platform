import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/AdminComponents/AdminSidebar";
import AdminNavbar from "../components/AdminComponents/AdminNavbar";
import { useState } from "react";

const AdminLayout = () => {

const [openSidebar, setOpenSidebar] = useState(false);
  console.log(openSidebar);
  return (
    <main className=" w-full min-h-screen flex flex-row ">

      <aside className = {`${openSidebar ? "w-[280px]": "w-[100px]"}   sticky top-0 z-50 h-screen overflow-y-auto shadow-lg dark:border-r  dark:border-r-gray-800 transition-all duration-300 ease-in bg-secondary-color dark:bg-transparent`}>
        <AdminSidebar openSidebar = {openSidebar} />
      </aside>
    <section className="flex flex-1 flex-col gap-5 overflow-hidden">
        <div className = "sticky top-0 z-50">   
      <AdminNavbar setOpenSidebar = {setOpenSidebar}  />
        </div>

        <div className = "flex-1 overflow-y-auto px-5">
          <Outlet />
        </div>
     

      </section>
    </main>
  );
};

export default AdminLayout;
``