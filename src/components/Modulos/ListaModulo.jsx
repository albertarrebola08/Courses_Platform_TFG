import { Reorder } from "framer-motion";
import React from "react";
import { supabase } from "../../supabase/supabaseClient";
import ItemModuloRow from "./ItemModuloRow";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { ModuleInfoState } from "../../atoms/ModuleElements.state";
const ListaModulo = () => {
  const { moduleId } = useParams();
  const [items, setItems] = useRecoilState(ModuleInfoState);

  const handleReorder = (newOrder) => {
    setItems(newOrder);
    setItems(newOrder);
  };
  const handleDeleteDetalleModulo = async (elementoId) => {
    try {
      // Obtén el orden del elemento que estás eliminando
      const { data: elementoEliminar, error: errorElemento } = await supabase
        .from("elementos")
        .select("orden")
        .eq("id", elementoId);

      if (errorElemento) {
        throw errorElemento;
      }

      const ordenElementoEliminar = elementoEliminar[0].orden;

      // Elimina el elemento de la base de datos
      const { errorEliminar } = await supabase
        .from("elementos")
        .delete()
        .eq("id", elementoId);

      if (errorEliminar) {
        throw errorEliminar;
      }

      const elementoEliminadoTipo = items.find(
        (elemento) => elemento.id === elementoId
      )?.tipo;

      const elementosRestantesTipo = items.filter(
        (elemento) => elemento.tipo === elementoEliminadoTipo
      );

      // Verifica si no hay más elementos de ese tipo
      if (elementosRestantesTipo.length == 1) {
        const campoHaveElemento = `have_${elementoEliminadoTipo}`;

        // Cambia el have_elemento del modulo a false
        const { error: errorModulo } = await supabase
          .from("modulo")
          .update({ [campoHaveElemento]: false })
          .eq("id", moduleId);

        if (errorModulo) {
          throw errorModulo;
        }
      }
      // Obten los elementos restantes con órdenes mayores que el elemento eliminado
      const { data: elementosRestantes } = await supabase
        .from("elementos")
        .select("id, orden")
        .gt("orden", ordenElementoEliminar)
        .eq("id_modulo", moduleId)
        .order("orden");

      // Actualiza los órdenes de los elementos restantes
      for (let i = 0; i < elementosRestantes.length; i++) {
        const nuevoOrden = ordenElementoEliminar + i;
        await supabase
          .from("elementos")
          .update({ orden: nuevoOrden })
          .eq("id", elementosRestantes[i].id);
      }

      // Actualiza el estado local con los nuevos elementos
      const { data: nuevosElementos } = await supabase
        .from("elementos")
        .select("*")
        .eq("id_modulo", moduleId)
        .order("orden");

      setItems(nuevosElementos);
    } catch (error) {
      console.error("Error al eliminar el detalle del módulo:", error.message);
    }
  };
  return (
    <div className=" gap-4 w-full">
      <Reorder.Group
        axis="y"
        values={items}
        onReorder={handleReorder}
        className="flex flex-col gap-2"
      >
        {items.map((item) => {
          return (
            <ItemModuloRow
              item={item}
              key={item.id}
              onDelete={handleDeleteDetalleModulo}
            />
          );
        })}
      </Reorder.Group>
    </div>
  );
};

export default ListaModulo;
