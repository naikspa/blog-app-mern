import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

export const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);

  async function login(ev) {
    ev.preventDefault();
    const response = await fetch("http://localhost:4000/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (response.ok) {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
        setRedirect(true);
      });
    } else {
      alert("Usuario o Contraseña incorrectos");
    }
  }
  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <form className="login" onSubmit={login}>
      <h1>Iniciar Sesión</h1>
      <input
        type="text"
        placeholder="Nombre de usuario"
        id="username"
        value={username}
        onChange={(ev) => setUsername(ev.target.value)}
      ></input>
      <input
        type="password"
        placeholder="Contraseña"
        id="password"
        value={password}
        onChange={(ev) => setPassword(ev.target.value)}
      ></input>
      <button>Iniciar Sesión</button>
    </form>
  );
};
