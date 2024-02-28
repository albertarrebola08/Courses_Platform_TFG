import React, { useEffect } from "react";
import { Breadcrumb, BreadcrumbItem } from "pol-ui";

import { GlobalContext } from "../GlobalContext";
import { useContext } from "react";

const DrawBreadcrumb = () => {
  const { itemsBreadcrumb, setItemsBreadcrumb } = useContext(GlobalContext);
  const paramsCount = location.pathname.split("/").length;

  const isCoursesPage = paramsCount === 3; // Verifica si hay 3 segmentos en la ruta
  const isCoursePage = location.pathname.startsWith("/dashboard/cursos/");
  const isModulePage = location.pathname.startsWith("/dashboard/modulo/");

  useEffect(() => {
    const handlePopState = () => {
      // Al retroceder, eliminamos el último elemento del breadcrumb
      setItemsBreadcrumb((prevItems) => prevItems.slice(0, -2));
    };

    // Agregar un event listener para el evento popstate
    window.addEventListener("popstate", handlePopState);

    // Limpiar el event listener cuando el componente se desmonte
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [setItemsBreadcrumb]);

  return (
    <Breadcrumb>
      {itemsBreadcrumb.map((breadcrumbItem, index) => (
        <BreadcrumbItem
          key={index}
          icon={breadcrumbItem.icono}
          className="items-baseline"
        >
          {breadcrumbItem.texto}
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
};

export default DrawBreadcrumb;
