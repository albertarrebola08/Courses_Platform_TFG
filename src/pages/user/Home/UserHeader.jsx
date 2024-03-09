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
    <div className="flex justify-between">
      <Navbar>
        <NavbarBrand>
          <img src="/images/logo-rispot.png" alt="" />
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4 justify-center">
          <NavbarItem>
            <Link color="foreground" to="#">
              Features
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link to="#" aria-current="page">
              Customers
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" to="">
              Integrations
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <Link to="/login">Login</Link>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} color="primary" href="#" variant="flat">
              Sign Up
            </Button>
          </NavbarItem>
          <NavbarItem>
            <img
              src={perfilInfo && perfilInfo.avatar}
              alt="avatar-profile"
              className="rounded-full ring-1 ring-gray-500 object-cover w-10 h-10"
            />
          </NavbarItem>
          <NavbarItem>
            <Button color="error" onClick={handleLogout}>
              <RiLogoutBoxLine />
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Link to="/mi-perfil">
              <Button>
                <RiSettings2Fill />
              </Button>
            </Link>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </div>
  );
};
export default UserHeader;
