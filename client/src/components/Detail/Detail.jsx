import React, {useEffect} from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetails, removeCard } from '../../actions/index';
import NavBar from "../NavBar/NavBar";
import s from './Detail.module.css';
import loading from '../../img/loading.gif';
// import Swal from "sweetalert2";

export default function Details() {
    const dispatch = useDispatch();
    const {id} = useParams();
    let history = useHistory();

    useEffect(() =>{
        dispatch(getDetails(id));
    }, [dispatch, id])

    const myPokemon = useSelector((state) => state.details);

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
        <div>
            <NavBar/>
            <div className={s.cardContainer}>
            {
                myPokemon.length > 0 ?
                <div className={s.detailCard}>
                    <h4>{myPokemon[0].id}</h4>
                    <h1>{myPokemon[0].name.toUpperCase()}</h1>
                    <img src={myPokemon[0].img} alt='img not found'/>
                    <h3>Types: {myPokemon[0].types.map(type => `${type.toUpperCase()} `)}</h3>
                    <ul>
                    <p>Hit Points: {myPokemon[0].hp}</p>
                    <p>Attack: {myPokemon[0].attack}</p>
                    <p>Defense: {myPokemon[0].defense}</p>
                    <p>Speed: {myPokemon[0].speed}</p>
                    <p>Height: {myPokemon[0].height}</p>
                    <p>Weight: {myPokemon[0].weight}</p>
                    </ul>
                    <div>
                        <button className={s.removeBtn} id={myPokemon[0].id} onClick={handleClick}>Remove this card</button>
                    </div>
                </div>
                :
                <div className={s.loading}>
                    <img src={loading} alt=''/>
                    <h3>Loading...</h3>
                </div>
            }
            </div>
            <div>
                <Link  to='/pokemon'>
                    <button className={s.backBtn}>Back to cards panel</button>
                </Link>
            </div>
        </div>
    )
}