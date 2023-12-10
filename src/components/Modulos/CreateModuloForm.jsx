import { useState } from "react";
import { Input, Button, Textarea, Checkbox } from "@nextui-org/react";
import { RiAddFill, RiCloseFill } from "react-icons/ri";

const CreateModuloForm = ({ cursoId, onSubmit }) => {
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
    curso_id: cursoId,
    video_cantidad: 1,
    acciona_cantidad: 1,
    examen_cantidad: 1,
    act2_cantidad: 1,
    act3_cantidad: 1,
    material_cantidad: 1,
    quiz_cantidad: 1,
  });
  const [addModulSelected, setAddModulSelected] = useState(false);
  const handleInputChange = (value, name) => {
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

    try {
      onSubmit(body);
      setModuloData({
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
    } catch (error) {
      console.error("Error al crear el módulo:", error.message);
    }
  };
  if (!cursoId) return null;

  return (
    <div className="rounded-lg">
      <Button className="" onClick={() => setAddModulSelected(!addModulSelected)}>
        Crear mòdul {addModulSelected ? <RiCloseFill className="text-red-800" /> : <RiAddFill />}
      </Button>
      {/*  */}
      <form onSubmit={handleSubmit} className={`mt-4 flex flex-col gap-4  ${addModulSelected ? "block" : "hidden"}`}>
        {/* Nombre del modulo */}
        <Input name="nombre" type="text" autoComplete="new-module-name" label="Nom del mòdul" value={moduloData.nombre} onValueChange={(v) => handleInputChange(v, "nombre")} required />

        {/* Descripcion */}
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

export default CreateModuloForm;
