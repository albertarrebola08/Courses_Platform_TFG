import { useState } from "react";
import { RiMenu2Line, RiQuestionFill, RiShapesFill } from "react-icons/ri";
import { Link, Outlet } from "react-router-dom";

const DashboardLayout = () => {
  const [openMenu, setOpenMenu] = useState(true);

  return (
    <div className="grid grid-rows-[1fr,auto] min-h-screen gap-4">
      <nav className="flex justify-between items-center p-4 h-[80px] bg-gray-700 text-white fixed z-50 w-full">
        <div className="flex w-1/2 gap-4 items-center text-2xl font-bold">
          <RiMenu2Line className=" bg-[white] rounded-lg w-[40px] h-[40px]" onClick={() => setOpenMenu((prevState) => !prevState)} />
          <img className="w-[46px] " src="https://static.vecteezy.com/system/resources/previews/001/192/065/non_2x/circle-logo-turbine-png.png" alt="" />
          Rispot Consulting
        </div>
        <div className=" flex gap-2 w-2/4 ">
          <span className="text-2xl font-bold">Benvingut Pau !</span>
          <img className="w-[32px]" src="https://em-content.zobj.net/source/apple/237/waving-hand-sign_1f44b.png" alt="emoji-hello" />
        </div>
        <div className="w-1/4 text-lg font-bold">Columna 3</div>
      </nav>

      <main className="flex gap-4 mt-[80px]">
        <div className={openMenu ? "col-span-1 bg-gray-700 text-white p-4 py-5" : "hidden"}>
          <ul className="text-lg ">
            <li className="hover:bg-gray-400 p-3 rounded-md">
              <Link to={"/dashboard/cursos"} className="flex gap-2 items-center">
                <RiShapesFill />
                <button>Els meus cursos</button>
              </Link>
            </li>
            <li className="hover:bg-gray-400 p-3 rounded-md">
              <Link to={"/dashboard/preguntes-diaries"} className="flex gap-2 items-center">
                <RiQuestionFill />
                <button>Preguntes diaries</button>
              </Link>
            </li>
          </ul>
        </div>
        <div className="overflow-y-auto flex-1 mt-4 rounded-lg p-6 bg-gray-200">
          <Outlet />
        </div>
      </main>

      <footer>footer</footer>
    </div>
  );
};

export default DashboardLayout;
