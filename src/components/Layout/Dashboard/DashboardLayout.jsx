import { useState, useBoolean } from "react";
import { Link, Outlet } from "react-router-dom";

import { RiQuestionFill } from "react-icons/ri";
import { TiHome } from "react-icons/ti";
import { PiHandWavingFill } from "react-icons/pi";
import { CiMenuFries } from "react-icons/ci";

import {
  Sidebar,
  SidebarItem,
  Navbar,
  Footer,
  FooterLinkGroup,
  Copyright,
  Button,
} from "pol-ui";

const DashboardLayout = () => {
  const [openMenu, setOpenMenu] = useState(true);
  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <div className="grid w-full border bg-primary-100 overflow-y-hidden h-screen grid-rows-[auto,1fr]">
      <Navbar className="bg-primary-50 shadow-md py-4">
        {/* <CiMenuFries /> */}
        <Navbar.Brand className="mx-1">
          <img src="/images/logo-rispot.png" className="h-6" alt="logo" />
        </Navbar.Brand>
        <Navbar.Toggle />
        <div className="flex gap-2 items-center text-xl">
          <span>Benvingut Pau</span>
          <PiHandWavingFill className="text-yellow-500" />
        </div>
        <Navbar.Collapse>
          <Navbar.Link className="text-lg" href="/navbars" active>
            Home
          </Navbar.Link>
          <Navbar.Link className="text-lg " href="/navbars">
            About
          </Navbar.Link>
          <Navbar.Link className="text-lg" href="/navbars">
            Login
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
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
        <div className="overflow-y-auto flex-1 mt-4 rounded-lg">
          <Outlet />
        </div>
      </section>
    </div>
  );
};

export default DashboardLayout;
