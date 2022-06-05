import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeCard, removeDetails, restore } from "../../actions/index";
import { Link, useHistory } from "react-router-dom";
import s from "./AddedCard.module.css";
import sd from "../Detail/Detail.module.css";
import pokeBall from '../../img/pokeBall.gif'
import loading from '../../img/loading.gif';
import NavBar from "../NavBar/NavBar";
import SearchBar from "../SearchBar/SearchBar";
import Card from "../Card/Card";

export default function AddedCards() {
    const dispatch = useDispatch();
    const history = useHistory();
    const allPokemons = useSelector((state)=>state.allPokemons);
    const addedPokemons = useSelector((state)=>state.addedPokemons);

    const [loadedPokemons /*, setLoadedPokemons*/] = useState(allPokemons.length ? true : false);

    useEffect(()=>{
        dispatch(removeDetails());
        dispatch(restore())
        if(!loadedPokemons || !addedPokemons){
            history.push('/pokemon');
        }
    }, [loadedPokemons, dispatch])

    function handleClick(event){
        event.preventDefault();
        dispatch(removeCard(event.target.id));
        history.push('/pokemon')
        // para cuando la app tenga permisos :)
        // Swal.fire({
        //     title: 'Sorry',
        //     text: 'Only premium users can remove Cards',
        //     icon: 'info',
        //     confirmButtonText: `Maybe Later`,
        // })
        // alert('Only premium users can remove Cards')
    }

    return(
        <div className={sd.details}>
            <NavBar/>
            <SearchBar/>
            <div className={sd.cardContainer}>
                { addedPokemons.length ?
                addedPokemons.map((pokemon)=>{
                    return(
                        <div className={sd.detailCard}>
                            <h4># {pokemon.id.length > 5 ? pokemon.id.slice(0,-31):pokemon.id}</h4>
                            <h1>{pokemon.name.toUpperCase()}</h1>
                            <img src={pokemon.img} alt='img not found'/>
                            <h3>Types: {pokemon.types.map(type => `${type.toUpperCase()} `)}</h3>
                            <ul>
                            <p>Hit Points: {pokemon.hp}</p>
                            <p>Attack: {pokemon.attack}</p>
                            <p>Defense: {pokemon.defense}</p>
                            <p>Speed: {pokemon.speed}</p>
                            <p>Height: {pokemon.height}</p>
                            <p>Weight: {pokemon.weight}</p>
                            </ul>
                            <button className={sd.removeBtn} id={pokemon.id} onClick={handleClick}>Remove Card</button>                    
                            <Link className={sd.backBtn} to='/pokemon'>Back to Cards</Link>
                        </div>)
                }) :
                <div className={sd.loading}>
                    <img src={loading} alt=''/>
                    <h3>Try another Name or ID!</h3>
                </div>
                }
            </div>
        </div>
    )
}