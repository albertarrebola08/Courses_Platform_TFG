import { useContext } from "react";
import { UserContext } from "../../UserContext";

import { Navbar, Button, Dropdown, Avatar, DropdownItem } from "pol-ui";
import AllCursos from "../../components/Cursos/AllCursos";
import UserHeader from "./Home/UserHeader";

const UserHomePage = () => {
  return (
    <div className="">
      <section className="flex h-full gap-4">
        <div className="">
          <UserHeader></UserHeader>

          <div className="p-6">
            <AllCursos />
          </div>
        </div>
      </section>
    </div>
  );
};

export default UserHomePage;
