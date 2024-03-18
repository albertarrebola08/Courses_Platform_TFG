import { Sidebar, SidebarCollapse, SidebarItem } from "pol-ui";
import React, { useState } from "react";
import { LuDices } from "react-icons/lu";
import { VscGitPullRequestCreate } from "react-icons/vsc";
import { MdBackHand } from "react-icons/md";
import {
  RiBookOpenFill,
  RiFileEditFill,
  RiFolderKeyholeFill,
  RiListCheck3,
  RiQuestionFill,
  RiUser3Fill,
  RiUserSettingsFill,
  RiVideoFill,
} from "react-icons/ri";
import { TiHome } from "react-icons/ti";

const SidebarDefault = ({ isAdmin }) => {
  const [openMenu, setOpenMenu] = useState(true);
  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <Sidebar
      className="bg-primary-50"
      open={!openMenu}
      onOpenChange={toggleMenu}
    >
      <SidebarItem
        className="bg-white-600 hover:bg-primary-200"
        icon={TiHome}
        href="/dashboard/cursos"
      >
        Els meus cursos
      </SidebarItem>
      {isAdmin && (
        <>
          <SidebarItem
            className="bg-white-600 hover:bg-primary-200"
            href="/dashboard/preguntes-diaries"
            icon={RiQuestionFill}
          >
            Preguntes diaries
          </SidebarItem>

          <SidebarCollapse icon={RiFolderKeyholeFill} badge="Repositori">
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
            <SidebarCollapse badge="Activitats" href="#" className="">
              <SidebarItem icon={RiListCheck3} href="#">
                Quizs
              </SidebarItem>
              <SidebarItem icon={LuDices} href="#">
                Numerals
              </SidebarItem>
            </SidebarCollapse>
          </SidebarCollapse>
        </>
      )}
      {isAdmin && (
        <>
          <SidebarItem
            className="bg-white-600 hover:bg-primary-200"
            icon={RiUser3Fill}
            href="/dashboard/cursos"
          >
            Usuaris
          </SidebarItem>

          <hr />
        </>
      )}
      {isAdmin && (
        <>
          <SidebarItem
            className="bg-white-600 hover:bg-primary-200"
            icon={VscGitPullRequestCreate}
            href="/dashboard/solicitudes"
          >
            Solicituds
          </SidebarItem>

          <hr />
        </>
      )}

      <SidebarItem
        className="bg-white-600 hover:bg-primary-200"
        icon={RiUserSettingsFill}
        href="/mi-perfil"
      >
        El meu perfil
      </SidebarItem>
    </Sidebar>
  );
};

export default SidebarDefault;
