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

  return (
    <div className="py-4 bg-primary-50">
      <Navbar
        className=""
        leftContent={
          <img
            src="/images/logo-rispot.png"
            className="h-6 sm:h-7"
            alt="Pol-ui Logo"
          />
        }
        rightContent={
          <div className="flex gap-3 md:order-2">
            <Dropdown
              label="User settings"
              trigger={
                <Avatar
                  alt="User settings"
                  img={perfilInfo && perfilInfo.avatar}
                />
              }
            >
              <DropdownItem label="Profile" />
              <DropdownItem label="Settings" />
              <DropdownItem label="Logout" onClick={handleLogout}/>
            </Dropdown>

            {/* <h2>Benvingut {perfilInfo && perfilInfo.nombre}</h2> */}
          </div>
        }
        links={[
          { href: "#", label: "Home" },
          { href: "#", label: "About" },
        ]}
      />
    </div>
  );
};
export default UserHeader;
