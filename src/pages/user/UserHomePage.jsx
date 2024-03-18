import React, { useContext } from "react";

import UserHeader from "./Home/UserHeader";
//contexto con info del perfil y del user actual
import { UserContext } from "../../UserContext";
import AllCursos from "../../components/Cursos/AllCursos";
import { Button, Navbar } from "pol-ui";



function UserHomePage() {
  const { user, perfilInfo } = useContext(UserContext);
  console.log("profile desde context: ", perfilInfo);
  return (
    <div className="p-8">
      <section className="flex h-full overflow-y-auto gap-4">
        <div className="bg-primary-50 w-fit shadow-md"></div>
        <div className="overflow-y-auto flex-1 mt-4 rounded-lg px-4 pb-8">
          <div className="">
            <Navbar
              leftContent={
                <img
                  src="/images/logo-rispot.png"
                  alt="Rispot Logo"
                  className="h-6 sm:h-7"
                />
              }
              rightContent={
                <div className="flex gap-3">
                  <Button className="bg-[#ff9900]" href="/login">
                    Empezar
                  </Button>
                  <Button className="bg-[#232f3e]" href="/register">
                    Registrarme
                  </Button>
                </div>
              }
              links={[
                { href: "#", label: "Home" },
                { href: "#", label: "About" },
                { href: "#", label: "Services" },
                { href: "#", label: "Pricing" },
                { href: "#", label: "Contact" },
              ]}
            />
          </div>
          <AllCursos></AllCursos>
        </div>
      </section>
    </div>
  );
}

export default UserHomePage;
