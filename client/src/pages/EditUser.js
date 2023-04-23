import React, { useState, useEffect, useContext } from "react";
import { useParams, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

export const EditUser = () => {
  const { id } = useParams();
  const [username, setUsername] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [redirectD, setRedirectD] = useState(false);
  // const [userInfo, setUserInfo] = useContext(UserContext);

  useEffect(() => {
    fetch("http://localhost:4000/user/" + id).then((response) => {
      response.json().then((postInfo) => {
        setUsername(postInfo.username);
      });
    });
  }, []);

  async function updateUser(ev) {
    ev.preventDefault();
    const data = { id, username };
    const response = await fetch("http://localhost:4000/user/", {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (response.ok) {
      setRedirect(true);
    }
  }

  async function deleteUser(ev) {
    ev.preventDefault();
    const data = { id, username };
    const response = await fetch("http://localhost:4000/user", {
      method: "DELETE",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (response.ok) {
      await fetch("http://localhost:4000/logout", {
        credentials: "include",
        method: "POST",
      });
      // setUserInfo(null);
      setRedirectD(true);
    }
  }

  if (redirect) {
    return <Navigate to={"/user/" + id} />;
  }

  if (redirectD) {
    return <Navigate to={"/register"} />;
  }

  return (
    <div>
      <form onSubmit={updateUser}>
        <input
          type="username"
          placeholder={"Nombre de Usuario"}
          value={username}
          onChange={(ev) => setUsername(ev.target.value)}
        />
        <button style={{ marginTop: "5px" }}>Guardar Cambios</button>
      </form>
      <form onSubmit={deleteUser}>
        <button style={{ marginTop: "5px", backgroundColor: "#ff3535" }}>
          Eliminar Usuario
        </button>
      </form>
    </div>
  );
};
