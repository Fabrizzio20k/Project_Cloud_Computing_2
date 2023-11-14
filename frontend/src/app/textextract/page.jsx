"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TEXTEXTRACT_URL, GET_URL } from '@/functions/routes';
import './styles.css';

export default function ExtractPage() {
    const [userId, setUserId] = useState('<Selecciona un usuario>');
    const [users, setUsers] = useState([]);
    const [file, setFile] = useState(null);
    const [text, setText] = useState('');

    useEffect(() => {
        axios.get(GET_URL)
            .then(res => {
                setUsers(res.data.body);
            })
            .catch(err => console.error(err));
    }, []);

    const handleSubmit = event => {
        event.preventDefault();

        if (!file) {
            alert('Por favor, selecciona una imagen antes de enviar.');
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            axios.post(TEXTEXTRACT_URL, {
                username: userId,
                image: reader.result
            })
            .then(res => {
                setText(res.data.body);
            })
            .catch(err => console.error(err));
        };
        reader.readAsDataURL(file);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(text);
    };

    return (
        <div className="App">
            
            <h1>Extract</h1>
            <form onSubmit={handleSubmit}>
                <select
                    value={userId}
                    onChange={e => setUserId(e.target.value)}
                >
                    {users.map(user => (
                        <option key={user.user_id} value={user.user_id}>
                            {user.user_id}
                        </option>
                    ))}
                </select>
                <input
                    type="file"
                    onChange={e => setFile(e.target.files[0])}
                />
                <button type="submit">Submit</button>
            </form>

            {text && (
                <div className='text-content'>
                    <h2>El texto obtenido es el siguiente:</h2>
                    <p>{text}</p>
                    <button className='copy-button' onClick={copyToClipboard}>Copiar al portapapeles</button>
                </div>
            )}
        </div>
    );
}
