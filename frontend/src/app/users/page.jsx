"use client";

import Image from "next/image";
import Link from "next/link";
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
        <div className="App">
            <Link href="/">
                <h2>Home</h2>
            </Link>
            <h1>Usuarios</h1>
            <br/>
            {users.map(user => (
                <div key={user.user_id} className="user-card">
                    <div className="user-info">
                        <h2>{user.nombre} {user.apellido} - {user.user_id}</h2>
                        <p>{user.nacimiento}</p>
                        <p>{user.edad} años</p>
                    </div>
                    <div className="user-image">
                        <Image src={user.foto} alt="Foto de perfil" width={500} height={350}/>
                    </div>
                </div>
            ))}
        </div>
    );
}