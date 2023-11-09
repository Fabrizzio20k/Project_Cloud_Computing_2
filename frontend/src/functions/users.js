import axios from "axios";
import { CREATE_URL } from '@/functions/routes';

export function createUser(data, user) {
    return new Promise((resolve, reject) => {
        if (user.foto) {
            const reader = new FileReader();
            reader.readAsDataURL(user.foto);
            reader.onloadend = () => {
                data.foto = reader.result;
                axios.post(CREATE_URL, data, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    console.error(error);
                    reject(error);
                });
            };
            reader.onerror = reject;
        } else {
            axios.post(CREATE_URL, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                console.error(error);
                reject(error);
            });
        }
    });
}
