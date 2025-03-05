import React from 'react';
import { Link } from 'react-router-dom';
import AAULogo from '../../assets/AAU/AAULogo.png.png'
import styles from './Navbar.module.css';
import { AppBar, Grid2 } from '@mui/material';

export default function Navbar() {
  return (
    <nav className={styles.navBar}>
      <ul className={styles.linksContainer}>
      <img src={AAULogo} alt="Image"/>
        <Link to="/">Home</Link>
        <Link to="/foster-sms">Foster SMS</Link>
        <Link to="/admin">Admin</Link>
      </ul>
    </nav>
  );
}
