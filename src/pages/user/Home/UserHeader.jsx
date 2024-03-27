import { Avatar, Button, Dropdown, DropdownItem, Navbar } from "pol-ui";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { UserContext } from "../../../UserContext";

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

  const handleProfileClick = () => {
    navigate("/mi-perfil");
  };

  return (
    <div className="py-5 px-8 bg-primary-50 w-screen">
      <Navbar
        leftContent={
          <img
            src="/images/logo-rispot.png"
            className="h-6 sm:h-7"
            alt="Pol-ui Logo"
          />
        }
        rightContent={
          <div className="flex gap-3 md:order-2">
            {!user ? (
              <div className="flex gap-3">
                <Button className="bg-primary" href="/login">
                  Empezar
                </Button>
                <Button className="bg-[#232f3e]" href="/register">
                  Registrarme
                </Button>
              </div>
            ) : (
              <Dropdown
                label="User settings"
                trigger={
                  <Avatar
                    alt="User settings"
                    img={perfilInfo && perfilInfo.avatar}
                  />
                }
              >
                <DropdownItem label="Profile" onClick={handleProfileClick} />
                <DropdownItem label="Settings" />
                <DropdownItem label="Logout" onClick={handleLogout} />
              </Dropdown>
            )}
          </div>
        }
        links={[
          { href: "/home", label: "Home" },
          user
            ? perfilInfo && perfilInfo.rol === "admin"
              ? { href: "/dashboard/cursos", label: "Mis cursos" }
              : { href: "/mis-cursos", label: "Mis cursos" }
            : { href: "/login", label: "Mis cursos" },
          {
            href: "https://rispot.com/ca/serveis/",
            label: "Services",
          },
          { href: "https://rispot.com/", label: "Nuestra empresa" },
        ]}
      />
    </div>
  );
};

export default UserHeader;
