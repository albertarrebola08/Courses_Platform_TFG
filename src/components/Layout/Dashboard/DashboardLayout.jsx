import { useState, useBoolean, useEffect } from "react";
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

const DashboardLayout = () => {
  const [openMenu, setOpenMenu] = useState(true);
  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  };
  const [perfilInfo, setPerfilInfo] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const obtenerDetallePerfil = async (id) => {
      try {
        const { data: perfilData, error } = await supabase
          .from("perfiles")
          .select("*")
          .eq("user_id", id);

        if (error) {
          console.error(
            "Error al obtener el detalle del perfil:",
            error.message
          );
        } else {
          console.log("Detalle perfil:", perfilData);
          setPerfilInfo(perfilData);
        }
      } catch (error) {
        console.error("Error al obtener el detalle del perfil:", error.message);
      }
    };

    obtenerDetallePerfil(id);
  }, []);

  return (
    <div className="grid w-full border bg-primary-100 overflow-y-hidden h-screen grid-rows-[auto,1fr]">
      <Navbar
        className="bg-primary-50 shadow-md py-4"
        leftContent={
          perfilInfo ? (
            perfilInfo[0]?.logo ? (
              <img src={perfilInfo[0]?.logo} className="h-6" alt="logo" />
            ) : null
          ) : null
        }
        rightContent={
          <div className="flex gap-3 md:order-2">
            <div className="flex gap-2 items-center text-xl">
              <span>Benvingut {perfilInfo ? perfilInfo[0]?.nombre : "!"}</span>
              <PiHandWavingFill className="text-yellow-500" />
            </div>
            <Dropdown
              label="User settings"
              trigger={
                <Avatar
                  alt="User settings"
                  img={perfilInfo ? `${perfilInfo[0]?.avatar}` : ""}
                />
              }
            >
              <DropdownItem className="mt-4" label="Profile" />
              <DropdownItem label="Settings" />
              <DropdownItem label="Logout" />
            </Dropdown>
          </div>
        }
        links={[
          { href: "#", label: "Home" },
          { href: "#", label: "About" }, //puedes añadir contenido con la prop content
          { href: "#", label: "Services" },
          { href: "#", label: "Pricing" },
          { href: "#", label: "Contact" },
        ]}
      ></Navbar>
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
          <DrawBreadcrumb />
          <Outlet />
        </div>
      </section>
    </div>
  );
};

export default DashboardLayout;
