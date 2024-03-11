import { useState, useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";

import DrawBreadcrumb from "../../DrawBreadcrumb";
import UserHeader from "../../../pages/user/Home/UserHeader";
import { UserContext } from "../../../UserContext";
import SidebarDefault from "../SidebarDefault";

const DashboardLayout = () => {
  const { perfilInfo } = useContext(UserContext);
  const [isAdmin, setIsAdmin] = useState(null);
  useEffect(() => {
    const handleAdmin = () => {
      if (perfilInfo.rol === "admin" || perfilInfo.rol === "superadmin") {
        setIsAdmin(true);
        console.log(isAdmin);
      } else {
        setIsAdmin(false);
        console.log(isAdmin);
      }
    };

    handleAdmin();
  }, []);
  return (
    <div className="grid w-full border bg-primary-100 overflow-y-hidden h-screen grid-rows-[auto,1fr]">
      <UserHeader />

      <section className="flex h-full overflow-y-auto gap-4">
        <div className="bg-primary-50 w-fit shadow-md">
          <SidebarDefault isAdmin={isAdmin}></SidebarDefault>
        </div>
        <div className="overflow-y-auto flex-1 mt-4 rounded-lg px-4 pb-8">
          <div className="my-3">
            <h3 className="text-2xl">
              {perfilInfo &&
                perfilInfo.nombre &&
                perfilInfo.apellidos &&
                `${perfilInfo.nombre} ${perfilInfo.apellidos}`}
            </h3>
          </div>
          <hr />
          <DrawBreadcrumb />
          <Outlet />
        </div>
      </section>
    </div>
  );
};

export default DashboardLayout;
