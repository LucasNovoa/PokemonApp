import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';
import { getPokemons, getTypes } from '../../actions/index';
import {Link} from "react-router-dom";
import s from'./LandingPage.module.css';

export default function LandingPage(){

    const dispatch = useDispatch();
    const allPokemons = useSelector((state)=>state.allPokemons);
    const [loadedPokemons /*, setLoadedPokemons*/] = useState(allPokemons.length ? true : false);

    useEffect(() =>{
        if(!loadedPokemons){
            dispatch(getTypes());
            dispatch(getPokemons());
        }
    }, [loadedPokemons, dispatch])

    return(
        <div className={s.landingPageContainer}>
            { allPokemons.length ?
            <div>
                <Link to='/pokemon'>
                    <button className={s.button}>Try PokemonApp...</button>
                </Link>
            </div>
            :
            <div className={s.loadingApp}>
                <p className={s.loadingAppText}>Loading Pokemon App...</p>
            </div>
            }
        </div>
    )
}