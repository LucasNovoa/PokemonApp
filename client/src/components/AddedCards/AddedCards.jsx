import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons, getTypes, removeDetails, restore } from "../../actions/index";
import { Link, useHistory } from "react-router-dom";
import s from "./AddedCard.module.css";
import pokeBall from '../../img/pokeBall.gif'
import NavBar from "../NavBar/NavBar";
import SearchBar from "../SearchBar/SearchBar";
import Card from "../Card/Card";

export default function AddedCards() {
    const dispatch = useDispatch();
    const history = useHistory();
    const allPokemons = useSelector((state)=>state.allPokemons);
    const addedPokemons = useSelector((state)=>state.addedPokemons);

    const [loadedPokemons /*, setLoadedPokemons*/] = useState(allPokemons.length ? true : false);

    function handleClick(event){
        event.preventDefault();
        history.push('/pokemon');
    }

    useEffect(()=>{
        dispatch(removeDetails());
        dispatch(restore())
        if(!loadedPokemons || !addedPokemons){
            history.push('/pokemon');
        }
    }, [loadedPokemons, dispatch])

    return(
        <div>
            <NavBar/>
            <SearchBar/>
            <div className={s.containerCardsPok}>
                { addedPokemons.length ?
                addedPokemons.map((pokemon)=>{
                    return(
                        <div className={s.containerCards} key={pokemon.id}>
                            <Link to={`/pokemon/${pokemon.id}`} className={s.addPokemonLink}>
                                <Card
                                    name={pokemon.name}
                                    img={pokemon.img}
                                    types={pokemon.types}
                                    id={pokemon.id}
                                    key={pokemon.id}
                                />
                            </Link>

                        </div>)    
                }) :
                <div className={s.loading}>
                    <img className={s.loadingGif} src={pokeBall} alt=''/>
                    {/* <p>You can create a new Pokemon any time at the botton above!</p> */}
                </div>
                }
            </div>
            <button className={s.backBtn} onClick={e => {handleClick(e)}}>Back to Cards</button>
        </div>
    )
}