import React, { useState } from "react";
import { supabase } from "../supabase/supabaseClient";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "pol-ui";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [logo, setLogo] = useState("");
  const [avatar, setAvatar] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const { data: user, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        setError(error.message);
      } else {
        console.log("Registro exitoso:", user);

        // Crear un nuevo registro en la tabla "PERFILES"
        const { data: perfilData, error: perfilError } = await supabase
          .from("perfiles")
          .insert([
            {
              user_id: user.user.id,
              nombre: firstName,
              apellidos: lastName,
              telefono: phoneNumber,
              logo,
              avatar,
            },
          ]);

        if (perfilError) {
          console.error("Error al crear el perfil:", perfilError.message);
          setError(perfilError.message);
        } else {
          console.log("Perfil creado:", perfilData);

          // Redirigir al usuario a la página de inicio después del registro exitoso
          navigate("/login");
        }
      }
    } catch (error) {
      console.error("Error al registrarse:", error.message);
      setError(error.message);
    }
  };

  return (
    <form action="" className="p-8 w-50">
      <div className="flex-col gap-5 flex">
        <h1>Registrarse</h1>
        <Input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Nombre"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Apellidos"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <Input
          type="tel"
          placeholder="Número de teléfono"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <Input
          type="text"
          placeholder="URL del logo"
          value={logo}
          onChange={(e) => setLogo(e.target.value)}
        />
        <Input
          type="text"
          placeholder="URL del avatar"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
        />
        {error && <p>{error}</p>}
        <Button onClick={handleRegister}>Registrarse</Button>
      </div>
    </form>
  );
};

export default RegisterPage;
