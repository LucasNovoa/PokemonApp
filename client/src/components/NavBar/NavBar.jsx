import React from "react";
import { useSelector } from "react-redux";
import {NavLink} from "react-router-dom";
import s from './NavBar.module.css';

export default function NavBar() {

    const numberOfCards = useSelector((state)=>state.filteredPokemons);

    return (
        <nav className={s.navbar}>
            <NavLink to="/pokemon" className={s.navbarLink}>Home</NavLink>
            <div className={s.numberOfCards}>
                <h1 className={s.number}>{numberOfCards.length}</h1>
                <span>Cards</span>
            </div>
            <NavLink to="/" className={s.navbarLink}>EXIT</NavLink>
        </nav>
    )
}