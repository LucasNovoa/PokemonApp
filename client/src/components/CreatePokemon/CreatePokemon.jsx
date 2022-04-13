import React, {useState, useEffect} from "react";
import { useHistory } from "react-router-dom";
import { postPokemon, getPokemons, getTypes } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import s from "./CreatePokemon.module.css";
import NavBar from "../NavBar/NavBar";
import validations from "./CreatePokemonValidations";
import Swal from "sweetalert2";

export default function CreatePokemon() {

    const dispatch = useDispatch();
    const types = useSelector((state)=>state.types);
    const pokemonNames = useSelector((state)=>state.allPokemons.map((pokemon)=>pokemon.name));
    const history = useHistory();
    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
        name: '',
        img: '',
        hp: '50',
        attack: '30',
        defense: '30',
        speed: '20',
        height: '5',
        weight: '30',
        types: []
    });

    useEffect(()=>{
        dispatch(getTypes());
    }, [dispatch])

    function handleChange(event) {
        setInput({
            ...input,
            [event.target.name] : event.target.value.replaceAll(/^\s+/g, "").replaceAll(/\s+/g, " ")
        });
        setErrors(validations({...input, [event.target.name] : event.target.value}, pokemonNames));
    }

    function handleSelect(event) {
        if(input.types.filter(type=> type === event.target.value).length) {
            input.types.pop();
            Swal.fire({
                title: 'Ups!',
                text: 'You have already chosen this type',
                icon: 'warning',
                confirmButtonText: 'Got it!'
            })
            // alert('You have already chosen this type');
        }
        // if(input.types.length>2) {                   *ya no necesito este bloque porque puse disabled las opc del select
        //     input.types.pop();
        //     alert('You can choose only two types')
        // }
        setInput({
            ...input,
            types: [...input.types, event.target.value]
        })
        event.target.value= 'default';
    }

    function handleClick(event) {
        event.preventDefault();
        setInput({
            ...input,
            types: input.types.filter(type=> type !== event.target.id)
        })
    }

    function handleSubmit(event){
        event.preventDefault();
        console.log('soy Create Pokemon. Este es el input--->', input)
        !input.img ? setInput({...input.img='https://images.wikidexcdn.net/mwuploads/wikidex/0/02/latest/20090125150654/Pok%C3%A9_Ball_%28Ilustraci%C3%B3n%29.png'}) : setInput(input);
        if(Object.keys(errors).length === 0 && input.name.length && input.types.length > 0) {
            dispatch(postPokemon(input));
            dispatch(getPokemons());
            Swal.fire({
                title: 'Congrats!',
                text: 'Your Pokemon has been created',
                icon: 'success',
                confirmButtonText: 'Cool!'
            })
            // alert('Your Pokemon has been created')
            history.push("/pokemon")
        } else {
            Swal.fire({
                title: 'Sorry',
                text: 'You must complete all the fields to continue...',
                icon: 'info',
                confirmButtonText: `I'll do it!`,
            })
            // alert('Please complete all the fields to continue...')
            setInput(input)
        }
    }

    return(
        <div className={s.createPokemon}>
            <NavBar/>
            <h1>Create your Pokemon</h1>
            <form onSubmit={(event)=>handleSubmit(event)}>
                <div>
                    <label>Name:</label>
                    <input
                        type='text'
                        value={input.name}
                        name= 'name'
                        autoComplete='off'
                        spellCheck="false"
                        onChange={handleChange}/>
                </div>
                {errors.name && (<p>{errors.name}</p>)}

                <div>
                    <label>Hit Points (HP):</label>
                    <input
                        type='number'
                        value={input.hp}
                        name= 'hp'
                        onChange={handleChange}/>
                </div>
                {errors.hp && (<p>{errors.hp}</p>)}

                <div>
                    <label>Attack:</label>
                    <input
                        type='number'
                        value={input.attack}
                        name= 'attack'
                        onChange={handleChange}/>
                </div>
                {errors.attack && (<p>{errors.attack}</p>)}

                <div>
                    <label>Defense:</label>
                    <input
                        type='number'
                        value={input.defense}
                        name= 'defense'
                        onChange={handleChange}/>
                </div>
                {errors.defense && (<p>{errors.defense}</p>)}

                <div>
                    <label>Speed:</label>
                    <input
                        type='number'
                        value={input.speed}
                        name= 'speed'
                        onChange={handleChange}/>
                </div>
                {errors.speed && (<p>{errors.speed}</p>)}

                <div>
                    <label>Height:</label>
                    <input
                        type='number'
                        value={input.height}
                        name= 'height'
                        onChange={handleChange}/>
                </div>
                {errors.height && (<p>{errors.height}</p>)}

                <div>
                    <label>Weight:</label>
                    <input
                        type='number'
                        value={input.weight}
                        name= 'weight'
                        onChange={handleChange}/>
                </div>
                {errors.weight && (<p>{errors.weight}</p>)}

                <div>
                    <label>URL Image (optional):</label>
                    <input
                        alt='image not found'
                        value={input.img}
                        name= 'img'
                        pattern="https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$"
                        title="FORMATO URL"
                        placeholder='paste url image'
                        autoComplete='off'
                        spellCheck="false"
                        onChange={handleChange}/>
                </div>
                {errors.img && (<p>{errors.img}</p>)}

                <div>
                    <select onChange={(event)=>handleSelect(event)}>
                        <option value='default'>Select Types</option>
                        {
                            input.types.length < 2 ?
                            types.map((type)=>(<option value ={type.name} key={type.name}>{type.name}</option>)) :
                            types.map((type)=>(<option value ={type.name} key={type.name} disabled>{type.name}</option>))
                        }
                    </select>
                </div>
                <div>
                    <div>
                    {input.types.map((selected)=>(
                        <div key={selected}>
                            <p>{selected}</p>
                            <button id={selected} onClick={handleClick}>x</button>
                        </div>
                        ))
                    }
                    </div>
                </div>
                {errors.types && (<p>{errors.types}</p>)}
                <button type='submit' className={s.backBtn}>Create Pokemon</button>
            </form>
        </div>
    )
}