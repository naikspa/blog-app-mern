import React, { useState } from "react";

export const RegisterPage = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [password2, setPassword2] = useState();
  async function register(ev) {
    ev.preventDefault();
    if (password === password2) {
      const response = await fetch("http://localhost:4000/register", {
        method: "POST",
        body: JSON.stringify({ username, password, password2 }),
        headers: { "Content-Type": "application/json" },
      });
      if (response.status !== 200) {
        alert("Error al registrarse");
      } else {
        alert("Registro exitoso. Inicia Sesión");
      }
    } else {
      alert("Las contraseñas no coinciden!");
    }
  }
  return (
    <form className="register" onSubmit={register}>
      <h1>Registrarse</h1>
      <input
        type="text"
        placeholder="Nombre de usuario"
        name="username"
        id="username"
        value={username}
        onChange={(ev) => setUsername(ev.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        name="password"
        id="password"
        value={password}
        onChange={(ev) => setPassword(ev.target.value)}
      />
      <input
        type="password"
        placeholder="Repetir contraseña"
        name="password2"
        id="password2"
        value={password2}
        onChange={(ev) => setPassword2(ev.target.value)}
      />
      <button>Registrarse</button>
    </form>
  );
};
