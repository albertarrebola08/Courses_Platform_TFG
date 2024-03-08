import { useState, useBoolean, useEffect, useContext } from "react";
import { Outlet, useParams } from "react-router-dom";
import { supabase } from "../../../supabase/supabaseClient";
import { RiQuestionFill } from "react-icons/ri";
import { TiHome } from "react-icons/ti";
import { PiHandWavingFill } from "react-icons/pi";
import {
  Sidebar,
  SidebarItem,
  Navbar,
  Copyright,
  Button,
  Dropdown,
  DropdownItem,
  Avatar,
} from "pol-ui";
import DrawBreadcrumb from "../../DrawBreadcrumb";
import UserHeader from "../../../pages/user/Home/UserHeader";
import { UserContext } from "../../../UserContext";

const DashboardLayout = () => {
  const [openMenu, setOpenMenu] = useState(true);
  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  };

  const { id } = useParams();
  const { user, perfilInfo } = useContext(UserContext);

  return (
    <div className="grid w-full border bg-primary-100 overflow-y-hidden h-screen grid-rows-[auto,1fr]">
      <UserHeader />

      <section className="flex h-full overflow-y-auto gap-4">
        <div className="bg-primary-50 w-fit shadow-md">
          <Sidebar
            className="bg-primary-50 "
            collapsed={!openMenu}
            toggle={toggleMenu}
          >
            {/* aqui irá el nombre de la empresa que se registre */}

            <SidebarItem
              className="bg-white-600 hover:bg-primary-200"
              icon={TiHome}
              href="/dashboard/cursos"
            >
              Els meus cursos
            </SidebarItem>
            <SidebarItem
              className="bg-white-600 hover:bg-primary-200"
              href="/dashboard/preguntes-diaries"
              icon={RiQuestionFill}
            >
              Preguntes diaries
            </SidebarItem>
          </Sidebar>
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
