"use client";

import { useState } from 'react';
import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import styles from './Navbar.module.css'; // Asume que tienes un archivo de estilos CSS en el mismo directorio

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname()

    const activation = () => {
        setIsOpen(!isOpen);
    }

    // Actualiza isOpen cuando el tamaño de la ventana cambia
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) {
                setIsOpen(false);
            }
        }
    
        window.addEventListener('resize', handleResize);
    
        // Limpia el evento al desmontar el componente
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);

  return (
    <nav className={styles.navbar}>
        <div className={styles.logo}>
            <Link legacyBehavior href="/" className={styles.mainMenu}>
                <Image className={styles.logo} src="/logo.png" width={100} height={50} alt='logo'/>
            </Link>
            <Link legacyBehavior href="/" className={styles.mainMenu}>
                <a className={styles.logo}>CloudText Magic</a>
            </Link>
        </div>

        <div className={styles.menuMobile} onClick={activation}>
            <Image className={styles.burguer} src="/hamburguesa.png" width={30} height={30} alt='hmenu'/>
        </div>
        <div className={styles.menu}>
            <Link legacyBehavior href="/register">
                <a className={pathname === '/register' ? styles.active : ''}>Registrar</a>
            </Link>
            <Link legacyBehavior href="/list">
                <a className={pathname === '/list' ? styles.active : ''}>Listar</a>
            </Link>
            <Link legacyBehavior href="/textextract">
                <a className={pathname === '/textextract' ? styles.active : ''}>Textextract</a>
            </Link>
        </div>
        <div className={`${isOpen ? styles.modMenu + ' ' + styles.open : styles.modMenu}`}>
            <Link legacyBehavior href="/register" className={styles.elementMenu}>
                <a className={pathname === '/register' ? styles.active : ''}>Registrar</a>
            </Link>
            <Link legacyBehavior href="/list" className={styles.elementMenu}>
                <a className={pathname === '/list' ? styles.active : ''}>Listar</a>
            </Link>
            <Link legacyBehavior href="/textextract" className={styles.elementMenu}>
                <a className={pathname === '/textextract' ? styles.active : ''}>Textextract</a>
            </Link>
        </div>
    </nav>
  );
}




