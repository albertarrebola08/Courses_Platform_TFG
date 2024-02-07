import { useState, useBoolean } from "react";
import { Link, Outlet } from "react-router-dom";

import { RiQuestionFill } from "react-icons/ri";
import { TiHome } from "react-icons/ti";
import { PiHandWavingFill } from "react-icons/pi";
import { CiMenuFries } from "react-icons/ci";

import { Sidebar, SidebarItem, Navbar } from "pol-ui";

const DashboardLayout = () => {
  const [openMenu, setOpenMenu] = useState(true);

  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <div className="flex w-full overflow-hidden border bg-primary-100 flex-col h-[100vh]">
      <Navbar className="bg-primary-50 shadow-md py-4">
        {/* <CiMenuFries /> */}
        <Navbar.Brand className="">
          <img
            src="https://rispot.com/wp-content/uploads/2023/12/cropped-logo_possible3.png"
            className="h-6"
            alt="logo"
          />
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
      <section className="flex h-full">
        <div className="bg-primary-50 w-fit shadow-lg">
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
        <div className="overflow-y-auto flex-1 m-4 rounded-lg p-6 bg-gray-200">
          <Outlet />
        </div>
      </section>
      {/* <footer className="h-auto bg-gray-800 p-2 flex justify-center text-gray-300 text-[12px]">
        <div>Developed by @albertarrebola08</div>
      </footer> */}
    </div>

    // <div className="flex w-full overflow-hidden bordermin-h-[400px]  bg-primary-100 flex-col">
    //   <Navbar className="bg-primary-50 shadow-md">
    //     <Navbar.Brand>
    //       <img
    //         src="https://static.vecteezy.com/system/resources/previews/001/192/065/non_2x/circle-logo-turbine-png.png"
    //         className="mr-3 h-6 sm:h-6"
    //         alt="logo"
    //       />
    //     </Navbar.Brand>
    //     <Navbar.Toggle />
    //     <Navbar.Collapse>
    //       <Navbar.Link href="#" active>
    //         Home
    //       </Navbar.Link>
    //       <Navbar.Link href="/navbars">About</Navbar.Link>
    //       <Navbar.Link href="/navbars">Login</Navbar.Link>
    //     </Navbar.Collapse>
    //   </Navbar>

    //   <main className="flex gap-4 mt-[80px]">
    //     <div className="bg-primary-50 w-fit shadow-lg">
    //       <Sidebar collapsed={openMenu} className="bg-gray-700">
    //         <Sidebar.Logo
    //           img="https://static.vecteezy.com/system/resources/previews/001/192/065/non_2x/circle-logo-turbine-png.png"
    //           href="/dashboard/cursos"
    //           alt="logo"
    //           className="text-white"
    //         >
    //           Rispot Consulting
    //         </Sidebar.Logo>
    //         {/* aqui irá el nombre de la empresa que se registre */}

    //         <SidebarItem
    //           className="bg-white-600 text-white"
    //           icon={RiShapesFill}
    //           href="/dashboard/cursos"
    //         >
    //           Els meus cursos
    //         </SidebarItem>
    //         <SidebarItem
    //           className="bg-white-600 text-white"
    //           href="/dashboard/preguntes-diaries"
    //           icon={RiQuestionFill}
    //         >
    //           Preguntes diaries
    //         </SidebarItem>
    //       </Sidebar>
    //     </div>
    //     <div className="overflow-y-auto flex-1 mt-4 rounded-lg p-6 bg-gray-200">
    //       <Outlet />
    //     </div>
    //   </main>

    //   <footer>footer</footer>
    // </div>
  );
};

export default DashboardLayout;
