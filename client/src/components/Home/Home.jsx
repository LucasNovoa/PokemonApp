import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons, getTypes, removeDetails, orderById, orderByName, orderByStrength, filterByOrigin, filterByType } from "../../actions/index";
import { Link } from "react-router-dom";
import s from "./Home.module.css";
import loading from '../../img/loading.gif'
import NavBar from "../NavBar/NavBar";
import SearchBar from "../SearchBar/SearchBar";
import Card from "../Card/Card";
import Pagination from "../Pagination/Pagination";

export default function Home() {
    const dispatch = useDispatch();
    const allPokemons = useSelector((state)=>state.allPokemons);
    const numberOfCards = useSelector((state)=>state.filteredPokemons);
    const types = useSelector((state)=>state.types);

    const [loadedPokemons /*, setLoadedPokemons*/] = useState(allPokemons.length ? true : false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pokemonPage /*, setPokemonPage*/] = useState(12);
    const indexLast = currentPage * pokemonPage;
    const indexFirst = indexLast - pokemonPage;
    const currentPokemons = allPokemons.slice(indexFirst, indexLast);
    const pagination = (pageNumber) => {setCurrentPage(pageNumber)}

    const [order, setOrder] = useState('')

    useEffect(()=>{
        dispatch(removeDetails());
        if(!loadedPokemons){
            dispatch(getPokemons());
            dispatch(getTypes());
        }
    }, [loadedPokemons, dispatch])

    useEffect(() =>{
        setCurrentPage(1);
    }, [allPokemons.length, setCurrentPage])

    function handleIdSort(e){
        e.preventDefault();
        dispatch(orderById(e.target.value));
        setOrder(`Card number ${e.target.value} order`);
        setCurrentPage(1);
        e.target.value= 'default';
    }

    function handleSort(e){
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setOrder(`Alphabetical ${e.target.value} order`);
        setCurrentPage(1);
        e.target.value= 'default';
    }

    function handleSortAttack(e) {
        e.preventDefault();
        dispatch(orderByStrength(e.target.value));
        setOrder(`Ordered by ${e.target.value} Pokemon`);
        setCurrentPage(1);
        e.target.value= 'default';
    }

    function handleFilterType(e) {
        e.preventDefault();
        dispatch(filterByType(e.target.value));
        setOrder(`Filtered by Type: ${e.target.value}`);
        e.target.value= 'default';
    }

    function handleFilterByOrigin(e){
        e.preventDefault();
        dispatch(filterByOrigin(e.target.value));
        setOrder(`Filtered by Origin: ${e.target.value}`);
        e.target.value= 'default';
    }

    return(
        <div className={s.home}>
            <NavBar/>
            <SearchBar/>
            <form className={s.filters}>
                <select className={s.homeFilters} onChange={e => handleIdSort(e)}>
                    <option value = "default">order by ID...</option>
                    <option value = "asc">asc order</option>
                    <option value = "desc">desc order</option>
                </select>
                <select className={s.homeFilters} onChange={e => handleSort(e)}>
                    <option value = "default">order by Name...</option>
                    <option value = "asc">A - Z</option>
                    <option value = "desc">Z - A</option>
                </select>
                <select className={s.homeFilters} onChange={e => handleSortAttack(e)}>
                    <option value = "default">order by Strength...</option>
                    <option value = "strongest">Strongest attack</option>
                    <option value = "weakest">Weakest attack</option>
                </select>
                <select className={s.homeFilters} onChange={e => handleFilterType(e)}>
                    <option value = "default">filter by Type...</option>
                    <option value = 'all'>all</option>
                    {types?.map((type) => (
                    <option value = {type.name} key={type.name}>{type.name}</option>
                    ))}
                </select>
                <select className={s.homeFilters} onChange={e => handleFilterByOrigin(e)}>
                    <option value = "default">filter by Origin...</option>
                    <option value = "all">Show all...</option>
                    <option value = "originals">Originals...</option>
                    <option value = "created by User">Created By User...</option>
                </select>
                {order.length > 0 && (<span className={s.filtered}>{order}</span>)}
            </form>
            <div className={s.numberOfCards}>
                <h1 className={s.number}>{numberOfCards.length}</h1>
                <span>Cards</span>
            </div>
            <div className={s.containerCards}>
                { currentPokemons.length ?
                currentPokemons.map((pokemon)=>{
                    return(
                        <div className={s.homeCards} key={pokemon.id}>
                            <Link to={`/pokemon/${pokemon.id}`} className={s.homeCardsLink}>
                                <Card
                                    name={pokemon.name}
                                    img={pokemon.img}
                                    hp={pokemon.hp}
                                    types={pokemon.types}
                                    id={pokemon.id}
                                    key={pokemon.id}
                                />
                            </Link>

                        </div>)    
                })
                :
                <div className={s.reloadingApp}>
                    <img src={loading} alt=''/>
                    <h3>There is no Pokemons...</h3>
                </div>
                }
            </div>
            <div>
                <Pagination
                    pokemonPage={pokemonPage}
                    Pokemons={allPokemons.length}
                    pagination={pagination}
                    page={currentPage}/>
            </div>
        </div>
    )
}