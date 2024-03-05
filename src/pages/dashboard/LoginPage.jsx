import React, { useEffect, useState } from "react";
import { supabase } from "../../supabase/supabaseClient";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "pol-ui";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const { data: user, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
      } else {
        // Inicio de sesión exitoso
        console.log("Inicio de sesión exitoso:", user);

        if (user) {
          // Obtener el perfil del usuario
          const { data: profiles, error: profileError } = await supabase
            .from("perfiles")
            .select("rol,nombre")
            .eq("user_id", user.user.id)
            .single();

          if (profileError) {
            setError(profileError.message);
          } else {
            // Verificar el rol del usuario
            if (profiles) {
              if (profiles.rol === "admin" || profiles.rol === "superadmin") {
                console.log(profiles.nombre, profiles.rol);
                navigate(`/dashboard/${user.user.id}/cursos`);
              } else {
                console.log(profiles.nombre, profiles.rol);
                navigate(`/${user.user.id}/home`);
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
    <form action="" className="p-8 w-50">
      <div className="flex-col gap-5 flex">
        <h1>Iniciar sesión</h1>
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
        {error && <p>{error}</p>}
        <Button onClick={handleLogin}>Iniciar sesión</Button>
      </div>
    </form>
  );
};

export default LoginPage;
