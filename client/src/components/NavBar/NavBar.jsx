import React from "react";
import {NavLink} from "react-router-dom";
import s from './NavBar.module.css';

export default function NavBar() {
    return (
        <nav className={s.navbar}>
            <NavLink to="/pokemon" className={s.navbarLink}>Home</NavLink>
            <NavLink to="/" className={s.navbarLink}>EXIT</NavLink>
        </nav>
    )
}