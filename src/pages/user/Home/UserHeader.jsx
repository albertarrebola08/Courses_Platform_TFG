import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { Button } from "pol-ui";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { UserContext } from "../../../UserContext";
import { RiLogoutBoxLine, RiSettings2Fill } from "react-icons/ri";

const UserHeader = () => {
  const { user, perfilInfo, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const confirmed = window.confirm("Estàs segur de tancar sessió?");
    if (confirmed) {
      await logout();
      navigate("/login");
    }
  };

  return (
    <div className="">
      <Navbar>
        <NavbarBrand>
          <img src="/images/logo-rispot.png" alt="" />
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4 justify-center">
          <NavbarItem>
            <h2 className="text-xl ">Benvingut {perfilInfo.nombre} 👋</h2>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem>
            <a href="/mi-perfil">
              <img
                src={perfilInfo && perfilInfo.avatar}
                alt="avatar-profile"
                className="rounded-full ring-1 ring-gray-500 object-cover w-10 h-10"
              />
            </a>
          </NavbarItem>
          <NavbarItem>
            <Button color="error" onClick={handleLogout}>
              <RiLogoutBoxLine />
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </div>
  );
};
export default UserHeader;
