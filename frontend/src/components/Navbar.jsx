"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './Navbar.module.css'; // Asume que tienes un archivo de estilos CSS en el mismo directorio

export default function Navbar() {
  const router = useRouter();

  return (
    <nav className={styles.navbar}>
        <Link legacyBehavior href="/">
            <Image className={styles.logo} src="/logo.png" width={100} height={50} alt='logo'/>
        </Link>
        <Link legacyBehavior href="/">
            <a className={styles.logo}>CloudText Magic</a>
        </Link>
        <Link legacyBehavior href="/register">
            <a className={router.pathname === '/register' ? styles.active : ''}>Registrar</a>
        </Link>
        <Link legacyBehavior href="/list">
            <a className={router.pathname === '/list' ? styles.active : ''}>Listar</a>
        </Link>
        <Link legacyBehavior href="/textextract">
            <a className={router.pathname === '/textextract' ? styles.active : ''}>Textextract</a>
        </Link>
    </nav>
  );
}
