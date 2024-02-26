import { useState } from "react";
import { RiAddFill, RiCloseFill } from "react-icons/ri";
import { Button, Checkbox, Input, Textarea, Badge, Loader } from "pol-ui";

const CreateModuloForm = ({ cursoId, onSubmit }) => {
  const [loading, setLoading] = useState(false);
  const [moduloData, setModuloData] = useState({
    id: "",
    nombre: "",
    descripcion: "",
    have_material: false,
    have_video: false,
    have_acciona: false,
    have_numeral: false,
    have_camino: false,
    have_examen: false,
    have_quiz: false,
    curso_id: cursoId,
    video_cantidad: 1,
    acciona_cantidad: 1,
    examen_cantidad: 1,
    numeral_cantidad: 1,
    camino_cantidad: 1,
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
  const handleCheckboxChange = (name, checked) => {
    setModuloData({ ...moduloData, [name]: checked ? 1 : 0 });
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
      have_camino: moduloData.have_camino,
      have_numeral: moduloData.have_numeral,
      acciona_cantidad: moduloData.acciona_cantidad,
      video_cantidad: moduloData.video_cantidad,
      quiz_cantidad: moduloData.quiz_cantidad,
      numeral_cantidad: moduloData.numeral_cantidad,
      camino_cantidad: moduloData.camino_cantidad,
      material_cantidad: moduloData.material_cantidad,
      examen_cantidad: moduloData.examen_cantidad,
    };

    try {
      setLoading(true);
      onSubmit(body);
      setModuloData({
        nombre: "",
        descripcion: "",
        have_material: false,
        have_video: false,
        have_acciona: false,
        have_numeral: false,
        have_camino: false,
        have_examen: false,
        have_quiz: false,
        video_cantidad: 0,
        acciona_cantidad: 0,
        examen_cantidad: 0,
        numeral_cantidad: 0,
        camino_cantidad: 0,
        material_cantidad: 0,
        quiz_cantidad: 0,
      });
    } catch (error) {
      console.error("Error al crear el módulo:", error.message);
    } finally {
      setLoading(false); // Desactivar indicador de carga
    }
  };
  if (!cursoId) return null;

  return (
    <div className="rounded-lg ">
      <Button
        className={`mt-4 ${
          addModulSelected ? "bg-error-700" : "bg-orange-400"
        }`}
        onClick={() => setAddModulSelected(!addModulSelected)}
      >
        Crear mòdul{" "}
        {addModulSelected ? (
          <RiCloseFill className="text-white" />
        ) : (
          <RiAddFill />
        )}
      </Button>
      {/*  */}
      <form
        onSubmit={handleSubmit}
        className={`mt-6 flex flex-col gap-4 rounded-xl  ${
          addModulSelected ? "block" : "hidden"
        }`}
      >
        {/* Nombre del modulo */}
        <Input
          className="w-[20%]"
          name="nombre"
          type="text"
          label="Nom del mòdul"
          value={moduloData.nombre}
          onChange={(v) => handleInputChange(v.target.value, "nombre")} //los inputs de pol ui son mas nativos que nextui y no tienen el valor en el value. debes acceder al target.value
          required
        />

        {/* Descripcion */}
        <Textarea
          className="w-[20%]"
          innerClassName="resize"
          label="Descripció"
          name="descripcion"
          value={moduloData.descripcion}
          onChange={(v) => handleInputChange(v.target.value, "descripcion")}
        />

        <h5 className="mt-4 ">Quins elements vols afegir al mòdul</h5>
        <div className="p-8 flex gap-4 ">
          {/* Recorro con map y pinto los checkbox con los select */}
          {[
            "video",
            "acciona",
            "quiz",
            "numeral",
            "camino",
            "material",
            "examen",
          ].map((element) => (
            <div
              className="module-element justify-between flex items-center"
              key={element}
            >
              <Checkbox
                label={element.charAt(0).toUpperCase() + element.slice(1)}
                className=""
                name={`have_${element}`}
                onChange={(value) =>
                  handleCheckboxChange(`have_${element}`, value.target.checked)
                }
                checked={moduloData[`have_${element}`]}
              />

              <Input
                type="number"
                className="ms-3  flex text-center "
                name={`${element}_cantidad`}
                value={
                  moduloData[`have_${element}`]
                    ? moduloData[`${element}_cantidad`]
                    : 0
                }
                onChange={(e) =>
                  handleInputChange(parseInt(e.target.value, 10), e.target.name)
                }
              ></Input>
            </div>
          ))}
        </div>

        <Button className="bg-success-400 text-black w-[20%]" type="submit">
          Afegir
        </Button>
      </form>
      <div>
        {loading && (
          <Button color="secondary" outline className="mt-2">
            <Loader aria-label="Loading" color="primary" />
            <span className="pl-3">Carregant...</span>
          </Button>
        )}
      </div>
    </div>
  );
};

export default CreateModuloForm;
