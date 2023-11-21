"use client";

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import styles from './Navbar.module.css'; // Asume que tienes un archivo de estilos CSS en el mismo directorio

export default function Navbar() {
    const pathname = usePathname()

  return (
    <nav className={styles.navbar}>
        <Link legacyBehavior href="/">
            <Image className={styles.logo} src="/logo.png" width={100} height={50} alt='logo'/>
        </Link>
        <Link legacyBehavior href="/">
            <a className={styles.logo}>CloudText Magic</a>
        </Link>
        <Link legacyBehavior href="/register">
            <a className={pathname === '/register' ? styles.active : ''}>Registrar</a>
        </Link>
        <Link legacyBehavior href="/list">
            <a className={pathname === '/list' ? styles.active : ''}>Listar</a>
        </Link>
        <Link legacyBehavior href="/textextract">
            <a className={pathname === '/textextract' ? styles.active : ''}>Textextract</a>
        </Link>
    </nav>
  );
}
