import { Sidebar, SidebarItem } from "pol-ui";
import React, { useState } from "react";
import { RiQuestionFill } from "react-icons/ri";
import { TiHome } from "react-icons/ti";

const SidebarDefault = () => {
  const [openMenu, setOpenMenu] = useState(true);
  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <Sidebar
      className="bg-primary-50 "
      collapsed={!openMenu}
      toggle={toggleMenu}
    >
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
  );
};

export default SidebarDefault;
