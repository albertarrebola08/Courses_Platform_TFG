// Aqui irá la tabla de un modulo concreto. Se generará a partir de darle al OJO en la tabla modulos. Tendrá los campos que salgan de hacer un JOIN de todas las tablas que tengan el mismo modulo ID:

// - ORDEN
// - TIPO (quiz, numeral, camino, acciona, material, examen)
// - ACCIONES (VER, EDITAR, ELIMINAR)

//+ un boton de añadir más (que te abrirá un form con un select para indicar que quieres añadir y cuántos)

import { useEffect, useState } from "react";
import { supabase } from "../../supabase/supabaseClient";
import "react-json-view-lite/dist/index.css";

import { useParams } from "react-router-dom";

import ListaModulo from "./ListaModulo";
import { Button, IconButton, Loader } from "pol-ui";
import { useRecoilState } from "recoil";
import { ModuleInfoState } from "../../atoms/ModuleElements.state";

const TablaModulo = () => {
  const { moduleId } = useParams();
  const [detalleModulo, setDetalleModulo] = useRecoilState(ModuleInfoState);

  useEffect(() => {
    const obtenerDetalleModulo = async (moduleId) => {
      try {
        // Corrige la desestructuración de moduloid
        const { data: elementos, error } = await supabase
          .from("elementos")
          .select("*")
          // Filters
          .eq("id_modulo", parseInt(moduleId));

        if (error) {
          console.error(
            "Error al obtener el detalle del módulo:",
            error.message
          );
        } else {
          setDetalleModulo(elementos);
        }
      } catch (error) {
        console.error("Error al obtener el detalle del módulo:", error.message);
      }
    };

    obtenerDetalleModulo(moduleId);
  }, []);

  return <div>{detalleModulo?.length > 0 ? <ListaModulo /> : <Loader />}</div>;
};

export default TablaModulo;
