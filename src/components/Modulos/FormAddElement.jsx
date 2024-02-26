import { Button, Select } from "pol-ui";
import { useState, useEffect, useContext } from "react";
import { supabase } from "../../supabase/supabaseClient";
import { GlobalContext } from "../../GlobalContext";
import { RiAddLine, RiCloseFill } from "react-icons/ri";
import { useParams } from "react-router-dom";
import { SelectItem } from "@nextui-org/react";

const FormAddElement = () => {
  const tiposElementos = [
    "video",
    "material",
    "examen",
    "quiz",
    "acciona",
    "camino",
    "numeral",
  ];
  const [selectedValue, setSelectedValue] = useState(null);
  const { detalleModulo, setDetalleModulo } = useContext(GlobalContext);
  const [showForm, setShowForm] = useState(false);

  const { moduleId } = useParams();

  //GESTIONO EL CAMBIO DEL INPUT DEL SELECT
  const onInputChange = (e) => {
    setSelectedValue(e.target.value);
    console.log(e.target.value);
  };

  const onSubmit = async () => {
    console.log(selectedValue, lastOrder);
    const objetoInsertado = await insertaDetalle(
      selectedValue ?? "video",
      lastOrder
    );
    detalleModulo.push(objetoInsertado);
    setDetalleModulo([...detalleModulo]);
  };

  let lastOrder = Object.keys(detalleModulo).length;

  const insertaDetalle = async (selectedValue, lastOrder) => {
    const campoHaveElemento = `have_${selectedValue}`;
    const { error: moduloError } = await supabase
      .from("modulo")
      .update({ [campoHaveElemento]: true })
      .eq("id", moduleId);

    if (moduloError) {
      throw moduloError;
    }

    switch (selectedValue) {
      case "video": {
        // Registra en elementos
        const elementosData = {
          id_modulo: moduleId,
          tipo: selectedValue,
          orden: lastOrder + 1,
          titulo: `Titulo de ${selectedValue} por defecto`,
        };

        // Inserta en la tabla "elementos" y obtén el ID generado
        const { data: elementosDataResult, error: elementosError } =
          await supabase.from("elementos").insert([elementosData]).select();

        if (elementosError) {
          throw elementosError;
        }

        const elementoId = elementosDataResult[0].id;

        // Campos específicos para el tipo "video"
        const videoData = {
          titulo: "Titulo de video por defecto",
          url: "https://youtu.be/CH1XGdu-hzQ",
          modulo_id: moduleId,
          tipo: selectedValue,
          elemento_id: elementoId,
        };

        // Inserta en la tabla "video"
        const { error: videoError } = await supabase
          .from("video")
          .insert([videoData]);

        if (videoError) {
          throw videoError;
        }

        console.log("Video creado con éxito");

        return elementosDataResult[0];
      }
      case "material": {
        const elementosData = {
          id_modulo: moduleId,
          tipo: selectedValue,
          orden: lastOrder + 1,
          titulo: `Titulo de ${selectedValue} por defecto`,
        };

        const { data: elementosDataResult, error: elementosError } =
          await supabase.from("elementos").insert([elementosData]).select();

        if (elementosError) {
          throw elementosError;
        }

        const elementoId = elementosDataResult[0].id;

        // Campos específicos para el tipo "material"
        const materialData = {
          descripcion: "Descripción por defecto",
          archivo_url: "https://arsa.alwaysdata.net/files/materialdefault.pdf",
          modulo_id: moduleId,
          titulo: "Titulo de material por defecto",
          tipo: selectedValue,
          elemento_id: elementoId,
        };

        // Inserta en la tabla "material"
        const { error: materialError } = await supabase
          .from("material")
          .insert([materialData]);

        if (materialError) {
          throw materialError;
        }

        console.log("Material creado con éxito");
        return elementosDataResult[0];
      }
      case "acciona": {
        const elementosData = {
          id_modulo: moduleId,
          tipo: selectedValue,
          orden: lastOrder + 1,
          titulo: `Titulo de ${selectedValue} por defecto`,
        };

        const { data: elementosDataResult, error: elementosError } =
          await supabase.from("elementos").insert([elementosData]).select();

        if (elementosError) {
          throw elementosError;
        }

        const elementoId = elementosDataResult[0].id;

        // Campos específicos para el tipo "acciona"
        const accionaData = {
          titulo: "Titulo de acciona por defecto",
          enunciado: "Enunciado por defecto",
          video_enunciado: "https://youtu.be/Es4u6GrV7hw",
          modulo_id: moduleId,
          tipo: selectedValue,
          elemento_id: elementoId,
        };

        // Inserta en la tabla "acciona"
        const { error: accionaError } = await supabase
          .from("acciona")
          .insert([accionaData]);

        if (accionaError) {
          throw accionaError;
        }

        console.log("Acciona creado con éxito");
        return elementosDataResult[0];
      }
      case "examen": {
        const elementosData = {
          id_modulo: moduleId,
          tipo: selectedValue,
          orden: lastOrder + 1,
          titulo: `Titulo de ${selectedValue} por defecto`,
        };

        const { data: elementosDataResult, error: elementosError } =
          await supabase.from("elementos").insert([elementosData]).select();

        if (elementosError) {
          throw elementosError;
        }

        const elementoId = elementosDataResult[0].id;

        // Campos específicos para el tipo "examen"
        const examenData = {
          titulo: "Titulo de examen por defecto",
          enunciado: "Enunciado de examen por defecto",
          modulo_id: moduleId,
          tipo: selectedValue,
          elemento_id: elementoId,
        };

        // Inserta en la tabla "examen"
        const { error: examenError } = await supabase
          .from("examen")
          .insert([examenData]);

        if (examenError) {
          throw examenError;
        }

        console.log("Examen creado con éxito");
        return elementosDataResult[0];
      }
      case "quiz": {
        const elementosData = {
          id_modulo: moduleId,
          tipo: selectedValue,
          orden: lastOrder + 1,
          titulo: `Titulo de ${selectedValue} por defecto`,
        };

        const { data: elementosDataResult, error: elementosError } =
          await supabase.from("elementos").insert([elementosData]).select();

        if (elementosError) {
          throw elementosError;
        }

        const elementoId = elementosDataResult[0].id;

        // Campos específicos para el tipo "quiz"
        const quizData = {
          titulo: "Titulo de quiz por defecto",
          descripcion: "Descripción de quiz por defecto",
          modulo_id: moduleId,
          tipo: selectedValue,
          elemento_id: elementoId,
        };

        // Inserta en la tabla "actividad_quiz"
        const { error: quizError } = await supabase
          .from("actividad_quiz")
          .insert([quizData]);

        if (quizError) {
          throw quizError;
        }

        console.log("Quiz creado con éxito");
        return elementosDataResult[0];
      }
      case "numeral": {
        const elementosData = {
          id_modulo: moduleId,
          tipo: selectedValue,
          orden: lastOrder + 1,
          titulo: `Titulo de ${selectedValue} por defecto`,
        };

        const { data: elementosDataResult, error: elementosError } =
          await supabase.from("elementos").insert([elementosData]).select();

        if (elementosError) {
          throw elementosError;
        }

        const elementoId = elementosDataResult[0].id;

        // Campos específicos para el tipo "numeral"
        const numeralData = {
          titulo: "Titulo de actividad numeral por defecto",
          descripcion: "Descripcion de actividad numeral por defecto",
          modulo_id: moduleId,
          tipo: selectedValue,
          elemento_id: elementoId,
        };

        // Inserta en la tabla "actividad_numeral"
        const { error: numeralError } = await supabase
          .from("actividad_numeral")
          .insert([numeralData]);

        if (numeralError) {
          throw numeralError;
        }

        console.log("Actividad numeral creada con éxito");
        return elementosDataResult[0];
      }
      case "camino": {
        const elementosData = {
          id_modulo: moduleId,
          tipo: selectedValue,
          orden: lastOrder + 1,
          titulo: `Titulo de ${selectedValue} por defecto`,
        };

        const { data: elementosDataResult, error: elementosError } =
          await supabase.from("elementos").insert([elementosData]).select();

        if (elementosError) {
          throw elementosError;
        }

        const elementoId = elementosDataResult[0].id;

        // Campos específicos para el tipo "camino"
        const caminoData = {
          titulo: "Titulo de actividad camino por defecto",
          descripcion: "Descripcion de actividad camino por defecto",
          modulo_id: moduleId,
          tipo: selectedValue,
          elemento_id: elementoId,
        };

        // Inserta en la tabla "actividad_camino"
        const { error: caminoError } = await supabase
          .from("actividad_camino")
          .insert([caminoData]);

        if (caminoError) {
          throw caminoError;
        }

        console.log("Actividad camino creada con éxito");

        return elementosDataResult[0];
      }
      default:
        console.log(`Tipo de elemento no manejado: ${selectedValue}`);
    }
  };

  return (
    <div className="mb-5">
      <Button
        onClick={() => setShowForm(!showForm)}
        className={`bg-${
          showForm ? "error-700" : "primary-700"
        } text-white mb-4`}
      >
        {showForm ? <RiCloseFill /> : <RiAddLine />} Afegir element al mòdul
      </Button>
      <form
        className={`filtering-box flex gap-2 items-center ${
          showForm ? "block" : "hidden"
        }`}
      >
        <label htmlFor="tipo-elemento">Selecciona el tipo de elemento:</label>
        <Select
          id="tipo-elemento"
          name="elementos"
          value={selectedValue ?? "video"}
          onChange={onInputChange}
          className="w-[20%]"
          aria-label="Quin element vols afegir?"
        >
          {tiposElementos.map((e) => (
            <option key={e} value={e}>
              {e}
            </option>
          ))}
        </Select>
        <Button onClick={onSubmit} className="bg-gray-700 text-white ">
          Afegir
        </Button>
      </form>
    </div>
  );
};

export default FormAddElement;
