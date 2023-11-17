"use client";

import Image from "next/image";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { GET_URL } from "@/functions/routes";
import './styles.css';

export default function UsersPage() {
    const [users, setUsers] = useState([]);
    
    useEffect(() => {
      axios.get(GET_URL)
        .then(res => {
          setUsers(res.data.body);
        })
        .catch(err => console.error(err));
    }, []);
    
    return (
      <div className="List">
        <h1>Lista de usuarios</h1>
        <br/>
        <div className="users">
          {users.map((user, index) => (
            <div className="card" key={index}>
              <div className="card-header">
                <h3>{user.nombre} {user.apellido} - {user.user_id}</h3>
              </div>
              <div className="card-body">
                <h4>{user.nacimiento}</h4>
                <h4>{user.edad} años</h4>
              </div>
              <div className="card-image">
                <Image src={user.foto} width={400} height={300} alt="user-img" priority={true} className="img-user"/>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  