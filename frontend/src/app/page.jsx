import "./styles.css";

export default function Page() {
    return (
        <div className="presentation-page">
            <h1>Proyecto final del curso de Cloud Computing</h1>

            <p>Este proyecto consiste en una aplicación web que permite a los usuarios registrarse, listar los usuarios existentes, usar el servicio
                de reconocimiento de texto de Google Cloud Vision para extraer texto de imágenes, y ver el historial de extracciones de texto.</p>

            <h2>La aplicación está desarrollada con ReactJS para el frontend, y AWS Lambda (Python) para el backend</h2>
        </div>
    );
}