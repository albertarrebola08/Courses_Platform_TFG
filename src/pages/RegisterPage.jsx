import React, { useState } from "react";
import { supabase } from "../supabase/supabaseClient";
import { useNavigate } from "react-router-dom";
import { Button, FileInput, Input, PasswordInput } from "pol-ui";

const RegisterPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
              avatar,
              rol: "usuario",
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
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-center text-3xl font-bold text-[#232f3e]">
          Rispot Consulting
        </h1>
        <p className="mt-2 text-center">Acceso a la plataforma de cursos</p>
        <form className="mt-6 space-y-6">
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="first-name"
            >
              Nombre
            </label>
            <Input
              className="mt-1"
              id="first-name"
              placeholder="Ej: Pau"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="last-name"
            >
              Apellidos
            </label>
            <Input
              className="mt-1"
              id="last-name"
              placeholder="Ej: Sans Martí"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="email"
            >
              Email{" "}
              <span className="text-gray-600 text-[12px]">
                (este será tu usuario de acceso)
              </span>
            </label>
            <Input
              className="mt-1"
              aria-required
              id="email"
              placeholder="Ej: usuario@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="password"
            >
              Password
            </label>
            <PasswordInput
              className="mt-1"
              id="password"
              placeholder="Indica una contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
            />
          </div>
          <div className="grid w-full items-center gap-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="avatar"
            >
              Avatar
            </label>
            <FileInput
              className="mt-1"
              id="avatar"
              onChange={(e) => setAvatar(e.target.files[0])}
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <Button
            className="w-full bg-[#232f3e] hover:bg-[#1e3a8a] text-white"
            onClick={handleRegister}
          >
           Registrarme
          </Button>
        </form>
        <div className="flex flex-col gap-4 items-center justify-center mt-4">
          <span className="text-sm text-gray-600">
            Ya tienes cuenta?
          </span>
          <Button className="bg-[#f97316] hover:bg-[#ea580c] text-white">
            Iniciar sesión
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
