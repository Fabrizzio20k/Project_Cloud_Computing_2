"use client";

import { useState } from 'react';
import { createUser } from '@/functions/users';
import "./styles.css";

export default function HomePage() {

  const [user, setUser] = useState({
    nombre: '',
    apellido: '',
    edad: '',
    nacimiento: '',
    foto: null,
    username: ''
  });

  const [success, setSuccess] = useState(false);
  const [sended, setSended] = useState(false);

  const handleChange = (e) => {
    setUser({
        ...user,
        [e.target.name]: e.target.value
    });
  }

  const handleFileChange = (e) => {
    setUser({
        ...user,
        foto: e.target.files[0]
    });
  }

  const enviarDatos = async (e) => {
    e.preventDefault();
    let data = {
        nombre: user.nombre,
        apellido: user.apellido,
        edad: user.edad,
        nacimiento: user.nacimiento,
        username: user.username
    };

    const response = await createUser(data, user);
    setSended(true);

    if(response) {
      if(response.status === 200) {
        setSuccess(true);
      }
      else {
        setSuccess(false);
      }
    }
    else {
      setSuccess(false);
    }
  }

  return (
    <div className="App">
      <h1>Registro de usuarios</h1>
      <form onSubmit={enviarDatos}>
        <input type="text" name="nombre" onChange={handleChange} placeholder="Nombre" />
        <input type="text" name="apellido" onChange={handleChange} placeholder="Apellido" />
        <input type="number" name="edad" onChange={handleChange} placeholder="Edad" />
        <input type="date" name="nacimiento" onChange={handleChange} placeholder="Fecha de Nacimiento" />
        <input type="file" name="foto" onChange={handleFileChange} placeholder="Foto" />
        <input type="text" name="username" onChange={handleChange} placeholder="Nombre de Usuario" />
        <button type="submit">Enviar</button>
      </form>

      <h3 className={`${success ? "success":"fail"} ${sended ? "":"non-visible"}`}>{success ? "Exito al registrar":"Fallo al registrar"}</h3>
      
    </div>
  );
}