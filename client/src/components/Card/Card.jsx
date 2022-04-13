import React from "react";
import s from './Card.module.css';

export default function Card({name, img, id, types}){

    return(
        <div className={s.homeCard}>
            <h6># {id}</h6>
            <img src={img} alt="Img not found"/>
            <h3>{name.toUpperCase()}</h3>
            <div>
                <h6>Types</h6>
                {types?.map((e)=>{
                    return (
                        <div className={s.showedCard} key={e}>
                            <span>{e.toUpperCase()} </span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}