import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input, PasswordInput } from "pol-ui";
import { UserContext } from "../UserContext";
import { supabase } from "../supabase/supabaseClient";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { setUser, setPerfilInfo } = useContext(UserContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data: usuario, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
      } else {
        // Inicio de sesión exitoso
        console.log("Inicio de sesión exitoso:", usuario);

        if (usuario) {
          console.log("actualizo contexto usuario:", usuario);
          setUser(usuario.user);

          // Obtener el perfil del usuario
          const { data: profiles, error: profileError } = await supabase
            .from("perfiles")
            .select("*")
            .eq("user_id", usuario.user.id)
            .single();

          console.log("mail del usuario que seteo perfil", usuario.user.email);

          if (profileError) {
            setError(profileError.message);
          } else {
            //seteo el perfil del contexto
            setPerfilInfo(profiles);
            // Verificar el rol del usuario
            if (profiles) {
              if (profiles.rol === "admin" || profiles.rol === "superadmin") {
                console.log(profiles.nombre, profiles.rol);
                navigate("/dashboard/cursos");
              } else {
                console.log(profiles.nombre, profiles.rol);
                navigate("/mis-cursos");
              }
            }
          }
        }
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error.message);
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
        <form className="mt-6 space-y-6" onSubmit={handleLogin}>
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="email"
            >
              Email
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
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <Button
            className="w-full bg-[#232f3e] hover:bg-[#1e3a8a] text-white"
            type="submit"
          >
            Iniciar sesión
          </Button>
        </form>
        <div className="flex flex-col items-center justify-center mt-4 gap-4">
          <span className="text-sm text-gray-600">Aun no tienes cuenta ? </span>
          <Button className="bg-[#f97316] hover:bg-[#ea580c] text-white">
            Registrarme
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
