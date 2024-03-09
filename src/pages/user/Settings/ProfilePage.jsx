import { useContext, useState } from "react";
import { Button, IconButton, Input } from "pol-ui";
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
      <div className="p-8">
        <h1 className="my-4">Profile Page</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-[50%]">
          <Input
            label="Nombre:"
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
          />
          <Input
            label="Apellidos:"
            type="text"
            name="apellidos"
            value={formData.apellidos}
            onChange={handleChange}
          />
          <Input
            label="Teléfono:"
            type="text"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
          />
          <Input
            label="Avatar:"
            type="text"
            name="avatar"
            value={formData.avatar}
            onChange={handleChange}
          />
          {perfilInfo && perfilInfo.rol === "admin" && (
            <IconButton onClick={() => setShowRolInput(true)}>
              <MdAdminPanelSettings />
            </IconButton>
          )}

          {showRolInput && (
            <Input
              label="Rol:"
              type="text"
              name="rol"
              value={formData.rol}
              onChange={handleChange}
            />
          )}

          <Button type="submit">Guardar cambios</Button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
