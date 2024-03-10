import { Sidebar, SidebarCollapse, SidebarItem } from "pol-ui";
import React, { useState } from "react";
import { LuDices } from "react-icons/lu";
import { MdBackHand } from "react-icons/md";
import {
  Ri4KFill,
  RiBookOpenFill,
  RiCheckFill,
  RiFileEditFill,
  RiFolderKeyholeFill,
  RiListCheck3,
  RiLogoutBoxFill,
  RiQuestionFill,
  RiUser3Fill,
  RiUserSettingsFill,
  RiVideoFill,
} from "react-icons/ri";
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
      <SidebarCollapse icon={RiFolderKeyholeFill} label="Repositori">
        <SidebarItem icon={RiVideoFill} href="#">
          Videos
        </SidebarItem>
        <SidebarItem icon={RiBookOpenFill} href="#">
          Materials
        </SidebarItem>

        <SidebarItem icon={MdBackHand} href="#">
          Accionas
        </SidebarItem>
        <SidebarItem icon={RiFileEditFill} href="#">
          Exàmens
        </SidebarItem>
        <SidebarCollapse label="Activitats" href="#" className="">
          <SidebarItem icon={RiListCheck3} href="#">
            Quizs
          </SidebarItem>
          <SidebarItem icon={LuDices} href="#">
            Numerals
          </SidebarItem>
        </SidebarCollapse>
      </SidebarCollapse>
      <SidebarItem
        className="bg-white-600 hover:bg-primary-200"
        icon={RiUser3Fill}
        href="/dashboard/cursos"
      >
        Usuaris
      </SidebarItem>
      <hr />
      <SidebarItem
        className="bg-white-600 hover:bg-primary-200"
        icon={RiUserSettingsFill}
        href="/dashboard/cursos"
      >
        El meu perfil
      </SidebarItem>
      <SidebarItem
        className="bg-white-600 hover:bg-primary-200"
        icon={RiLogoutBoxFill}
        href="/dashboard/cursos"
      >
        Tancar sesió
      </SidebarItem>
    </Sidebar>
  );
};

export default SidebarDefault;
