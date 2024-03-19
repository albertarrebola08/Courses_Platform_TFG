import { useContext, useState } from "react";
import { Button, FileInput, IconButton, Input } from "pol-ui";
import { UserContext } from "../../../UserContext";
import { supabase } from "../../../supabase/supabaseClient";
import { MdAdminPanelSettings } from "react-icons/md";
import UserHeader from "../Home/UserHeader";

const ProfilePage = () => {
  const { perfilInfo, setPerfilInfo, user, setUser } = useContext(UserContext);
  const [showRolInput, setShowRolInput] = useState(false);

  const [formData, setFormData] = useState({
    nombre: perfilInfo.nombre,
    apellidos: perfilInfo.apellidos,
    telefono: perfilInfo.telefono,
    avatar: perfilInfo.avatar,
    rol: perfilInfo.rol,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPerfilInfo({ ...perfilInfo, ...formData });

    try {
      console.log(formData);
      const { data, error } = await supabase
        .from("perfiles")
        .update({
          nombre: formData.nombre,
          apellidos: formData.apellidos,
          telefono: formData.telefono,
          avatar: formData.avatar,
          rol: formData.rol,
        })
        .eq("user_id", user.id)
        .select();

      if (error) {
        throw error;
      } else {
        console.log("Perfil actualizado:", data);
      }
    } catch (error) {
      console.error("Error al actualizar perfil:", error.message);
    }
  };

  const handleRolInput = () => {
    if (perfilInfo.rol === "admin") {
      setShowRolInput(true);
    }
  };

  return (
    <div className="">
      <UserHeader></UserHeader>
      <div className="p-12 items-center bg-primary-50 rounded-lg shadow-lg m-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <Input
            label="Nombre:"
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="mb-3 w-1/2"
          />
          <Input
            label="Apellidos:"
            type="text"
            name="apellidos"
            value={formData.apellidos}
            onChange={handleChange}
            className="mb-3 w-1/2"
          />
          <Input
            label="Teléfono:"
            type="text"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            className="mb-3 w-1/2"
          />

          <FileInput
            name="file"
            color="secondary"
            className="mb-3 w-1/2"
            label="Avatar"
          />
          {perfilInfo && perfilInfo.rol === "admin" && (
            <div className="flex items-center gap-2">
              <IconButton
                onClick={() => setShowRolInput(true)}
                className="text-blue-500"
              >
                <MdAdminPanelSettings className="w-6 h-6" />
              </IconButton>
              <span className="text-sm text-gray-500">Cambiar rol</span>
            </div>
          )}

          {showRolInput && (
            <Input
              label="Rol:"
              type="text"
              name="rol"
              value={formData.rol}
              onChange={handleChange}
              className="mb-3"
            />
          )}

          <Button
            type="submit"
            className="col-span-2 w-fit bg-[#ff9900] text-gray-100"
          >
            Guardar cambios
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
