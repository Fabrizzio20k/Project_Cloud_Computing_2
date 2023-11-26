import Image from 'next/image';
import styles from './Page.module.css';

export default function Page() {
    return (
        <div className={styles.presentationPage}>
            <h1 className={styles.title}>Proyecto Final del Curso de Cloud Computing</h1>

            <Image src="/prev.png" alt="Cloud Computing" width={500} height={500} className={styles.imgPresentation}/>

            <p className={styles.description}>Este proyecto es una aplicación web innovadora que ofrece una variedad de funcionalidades. Los usuarios pueden:</p>

            <ul className={styles.list}>
                <li>Registrarse en la plataforma</li>
                <li>Listar los usuarios existentes</li>
                <li>Utilizar el servicio de reconocimiento de texto de Amazon Textract para extraer texto de imágenes</li>
                <li>Ver el historial de extracciones de texto</li>
            </ul>

            <h2 className={styles.subtitle}>Tecnologías Utilizadas</h2>

            <p className={styles.description}>La aplicación está desarrollada con las siguientes tecnologías:</p>

            <ul className={styles.list}>
                <li>ReactJS para el frontend</li>
                <li>AWS Lambda (Python) para el backend</li>
                <li>Otros servicios serverless de AWS</li>
            </ul>
        </div>
    );
}
