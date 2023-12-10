import { useState, useEffect } from "react";
import { supabase } from "../../supabase/supabaseClient";
import { Input, Button, Textarea, Checkbox, Select, SelectItem } from "@nextui-org/react";
import { RiAddFill, RiCloseFill, RiThumbUpFill } from "react-icons/ri";

const ModuloForm = ({ cursos }) => {
  const [moduloData, setModuloData] = useState({
    id: "",
    nombre: "",
    descripcion: "",
    have_material: false,
    have_video: false,
    have_acciona: false,
    have_act2: false,
    have_act3: false,
    have_examen: false,
    have_quiz: false,
    curso_id: null,
    video_cantidad: 1,
    acciona_cantidad: 1,
    examen_cantidad: 1,
    act2_cantidad: 1,
    act3_cantidad: 1,
    material_cantidad: 1,
    quiz_cantidad: 1,
  });
  const [modulos, setModulos] = useState([]);
  const [addModulSelected, setAddModulSelected] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    // Obtener la lista de modulos existentes cuando el componente se monta
    const fetchModulos = async () => {
      try {
        const { data: modulo, error } = await supabase.from("modulo").select("*");
        if (error) {
          throw error;
        }
        setModulos(modulo);
      } catch (error) {
        console.error("Error al obtener modulos:", error.message);
      }
    };

    // Llama a la función para obtener modulos cuando el componente se monta
    fetchModulos();
  }, []); //si no hago esto,solo renderizará una vez y no podré ver los modulos hasta que no actualice la pag

  const handleInputChange = (value, name) => {
    console.log(value, name);
    setModuloData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (name, isSelected) => {
    setModuloData({ ...moduloData, [name]: isSelected ? 1 : 0 });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      nombre: moduloData.nombre,
      descripcion: moduloData.descripcion,
      have_video: moduloData.have_video,
      have_material: moduloData.have_material,
      have_examen: moduloData.have_examen,
      have_quiz: moduloData.have_quiz,
      have_acciona: moduloData.have_acciona,
      have_act3: moduloData.have_act2,
      have_act2: moduloData.have_act3,
    };
    console.log(body);
    try {
      // Insertar el módulo en la tabla modulo y obtener su id
      const { data: dataArray, error } = await supabase.from("modulo").insert(body).select();
      const data = dataArray[0];
      if (error) {
        throw error;
      }

      console.log(data);

      // Array de tipos de elementos
      const tiposElementos = ["video", "material", "examen", "quiz", "acciona", "act3", "act2"];

      // Iterar sobre los tipos de elementos y manejarlos
      for (const tipo of tiposElementos) {
        if (moduloData[`have_${tipo}`]) {
          const cantidad = moduloData[`${tipo}_cantidad`];
          for (let i = 0; i < cantidad; i++) {
            switch (tipo) {
              case "video":
                // Lógica para insertar elemento de tipo video en la base de datos
                const videoData = {
                  titulo: "Titulo de video por defecto",
                  url: "https://youtu.be/CH1XGdu-hzQ",
                  modulo_id: data.id,
                  tipo: tipo,
                };
                const { error: videoError } = await supabase.from("video").insert([videoData]);
                if (videoError) {
                  throw videoError;
                }
                console.log("Video creado con éxito");
                break;
              case "material":
                const materialData = {
                  titulo: "Titulo de material por defecto",
                  descripcion: "Descripción por defecto",
                  archivo_url: "https://drive.google.com/file/d/19_aCdifK2LTE03SR_GX1KDZ5hYdMa3UN/view?usp=share_link",
                  modulo_id: data.id,
                  tipo: tipo,
                };
                const { error: materialError } = await supabase.from("material").insert([materialData]);
                if (materialError) {
                  throw materialError;
                }
                console.log("material creado con éxito");
                break;
              case "acciona":
                const accionaData = {
                  titulo: "Titulo de acciona por defecto",
                  enunciado: "Enunciado por defecto",
                  video_enunciado: "https://youtu.be/Es4u6GrV7hw",
                  modulo_id: data.id,
                  tipo: tipo,
                };
                const { error: accionaError } = await supabase.from("acciona").insert([accionaData]);
                if (accionaError) {
                  throw accionaError;
                }
                console.log("acciona creado con éxito");
                break;
              case "examen":
                const examenData = {
                  titulo: "Titulo de examen por defecto",
                  enunciado: "Enunciado de examen por defecto",
                  modulo_id: data.id,
                  tipo: tipo,
                };
                const { error: examenError } = await supabase.from("examen").insert([examenData]);
                if (examenError) {
                  throw examenError;
                }
                console.log("examen creado con éxito");
                break;
              case "quiz":
                const quizData = {
                  titulo: "Titulo de quiz por defecto",
                  descripcion: "Descripción de quiz por defecto",
                  modulo_id: data.id,
                  tipo: tipo,
                };
                const { error: quizError } = await supabase.from("actividad_quiz").insert([quizData]);
                if (quizError) {
                  throw quizError;
                }
                console.log("quiz creado con éxito");
                break; // ...
              case "act2":
                const act2Data = {
                  titulo: "Titulo de act2 por defecto",
                  descripcion: "Descripcion de act2 por defecto",
                  modulo_id: data.id,
                  tipo: tipo,
                };
                const { error: act2Error } = await supabase.from("act2").insert([act2Data]);
                if (act2Error) {
                  throw act2Error;
                }
                console.log("act2 creado con éxito");
                break;
              case "act3":
                const act3Data = {
                  titulo: "Titulo de act3 por defecto",
                  descripcion: "Descripcion de act3 por defecto",
                  modulo_id: data.id,
                  tipo: tipo,
                };
                const { error: act3Error } = await supabase.from("act3").insert([act3Data]);
                if (act3Error) {
                  throw act3Error;
                }
                console.log("act3 creado con éxito");
                break;
              default:
                console.log(`Tipo de elemento no reconocido: ${tipo}`);
            }
          }
        }
      }

      // Insertar la relación en la tabla de intersección curso_modulo
      console.log(moduloData.curso_id);
      console.log(data.id);

      const { error: cursoModuloError } = await supabase
        .from("curso_modulo")
        .insert([
          {
            curso_id: moduloData.curso_id, // Id del curso seleccionado
            modulo_id: data.id, // Id del módulo recién insertado
          },
        ])
        .select();

      if (cursoModuloError) {
        throw cursoModuloError;
      }

      // Mostrar mensaje de éxito durante 3 segundos
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);

      // Vaciar el formulario después de enviarlo
      setModuloData({
        curso_id: null,
        nombre: "",
        have_material: false,
        have_video: false,
        have_acciona: false,
        have_act2: false,
        have_act3: false,
        have_examen: false,
        have_quiz: false,
        video_cantidad: 0,
        acciona_cantidad: 0,
        examen_cantidad: 0,
        act2_cantidad: 0,
        act3_cantidad: 0,
        material_cantidad: 0,
        quiz_cantidad: 0,
      });
      console.log("Módulo creado y asociado al curso exitosamente:", data);
    } catch (error) {
      console.error("Error al crear el módulo:", error.message);
    }
  };

  return (
    <div className="rounded-lg">
      {showSuccessMessage && (
        <div variant="faded" className="absolute top-2 right-2 bg-green-800 text-white py-2 px-4 rounded">
          <RiThumbUpFill className="mr-2 text-white" />
          Mòdul creat amb èxit
        </div>
      )}
      <Button className="" onClick={() => setAddModulSelected(!addModulSelected)}>
        Crear mòdul {addModulSelected ? <RiCloseFill className="text-red-800" /> : <RiAddFill />}
      </Button>
      <form onSubmit={handleSubmit} className={`mt-4 flex flex-col gap-4  ${addModulSelected ? "block" : "hidden"}`}>
        <Select id="select-cursos" name="curso_id" value={moduloData.curso_id} onChange={(e) => handleInputChange(e.target.value, "curso_id")} color="secondary" label="Selecciona un curs">
          {cursos.map((curso) => (
            <SelectItem key={curso.id} value={curso.id}>
              {curso.nombre}
            </SelectItem>
          ))}
        </Select>

        <Input name="nombre" type="text" label="Nom del mòdul" value={moduloData.nombre} onValueChange={(v) => handleInputChange(v, "nombre")} required />
        <Textarea placeholder="Introdueix la descripció" name="descripcion" value={moduloData.descripcion} onValueChange={(v) => handleInputChange(v, "descripcion")} />

        <h4 className="mt-4 font-bold">Quins elements vols afegir al mòdul</h4>
        <div className="p-8 flex flex-col gap-4 ">
          {/* Recorro con map y pinto los checkbox con los select */}
          {["video", "acciona", "quiz", "act2", "act3", "material", "examen"].map((element) => (
            <div className="module-element justify-between flex items-center" key={element}>
              <Checkbox name={`have_${element}`} onValueChange={(value) => handleCheckboxChange(`have_${element}`, value)} isSelected={moduloData[`have_${element}`]} />
              <span>{element.charAt(0).toUpperCase() + element.slice(1)}</span>
              <select className="ms-3 w-[20%] flex text-center border rounded-sm border-gray-800" name={`${element}_cantidad`} value={moduloData[`have_${element}`] ? moduloData[`${element}_cantidad`] : 0} onChange={(e) => handleInputChange(parseInt(e.target.value, 10), e.target.name)}>
                {[0, 1, 2, 3, 4, 5].map((optionValue) => (
                  <option key={optionValue} value={optionValue}>
                    {optionValue}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>

        <Button className="bg-green-200 w-full" type="submit">
          Afegir
        </Button>
      </form>
    </div>
  );
};

export default ModuloForm;
