import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {NavLink} from "react-router-dom";
import { restore } from "../../actions";
import s from './NavBar.module.css';

export default function NavBar() {
    const dispatch = useDispatch();
    const numberOfCards = useSelector((state)=>state.filteredPokemons);

    function handleClick () {
        dispatch(restore())
    }

    return (
        <nav className={s.navbar}>
            <NavLink to="/pokemon" className={s.navbarLink} onClick={handleClick}>Home</NavLink>
            <div className={s.numberOfCards}>
                <h1 className={s.number}>{numberOfCards.length}</h1>
                <span>Cards</span>
            </div>
            <NavLink to="/" className={s.navbarLink}>EXIT</NavLink>
        </nav>
    )
}