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
    const [fileName, setFileName] = useState('Seleccionar archivo');

    const handleFileChange = e => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    };

    useEffect(() => {
        axios.get(GET_URL)
            .then(res => {
                setUsers(res.data.body);
                setUserId(res.data.body[0].user_id);
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
            }, { headers: { 'Content-Type': 'application/json' } })
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
        <>
            <div className="extract-tittle">
                <h1>Extract Text Here</h1>
            </div>

            <div className='extract'>
            
                <form onSubmit={handleSubmit} className='form-extract'>
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
                        id="fileInput"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />
                    <label htmlFor="fileInput" className="custom-file-upload">
                        {fileName}
                    </label>
                    <button type="submit" className='btn-submit' disabled={!file}>Submit</button>
                </form>

                {text && (
                    <div className='text-content'>
                        <h2>El texto obtenido es el siguiente:</h2>
                        <p>{text}</p>
                        <button className='copy-button' onClick={copyToClipboard}>Copiar al portapapeles</button>
                    </div>
                )}

                <div className='history'>
                    <h2>Historial de extracciones</h2>
                    <p>En esta sección se mostrará el historial de extracciones del usuario seleccionado.</p>

                    <div className='history-content'>
                        {users.find(user => user.user_id === userId)?.extract_history?.map((history, index) => (
                            <div className='history-item' key={index}>
                                <h2>{history.timestamp}</h2>
                                <p>{history.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
