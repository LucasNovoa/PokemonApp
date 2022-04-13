const { Router } = require('express');
const { getAllPokemons, getDbPokemons, getPokemonByNameOrId, getApiType } = require('./utils');
const { Pokemon, Type } = require('../db');

const router = Router();

router.get('/', async (req, res) => {
    const name = req.query.name;
    if(!name) {
        const totalPokemons = await getAllPokemons();
        totalPokemons ? res.status(200).send(totalPokemons) : res.status(404).send(`Ups! We can't find any Pokemons...`);
    } else {
        try {
            const foundPokemon = await getPokemonByNameOrId(name.toLowerCase());
            if(foundPokemon){
                return res.status(200).send([foundPokemon])
            } else {
                const pokemonsDB = await getDbPokemons();
                const foundPokemonDB = await pokemonsDB.filter(
                    pokemon => pokemon.name.toLowerCase() == name.toLowerCase()
                )
                return foundPokemonDB.length ? res.status(200).send(foundPokemonDB)
                                            : res.status(404).send(`Ups! We can't find the Pokemon you're looking for...`)
            }
        } catch (error) {
            console.log(error)
        }
    }


    // try {
    // if(name){
    //     const foundPokemon = await getPokemonByNameOrId(name.toLowerCase());    //cuando no entra acá y va a buscar a DB deja un error en consola
    //     if(foundPokemon){
    //         return res.status(200).send([foundPokemon])
    //     } else {
    //         const pokemonsDB = await getDbPokemons();
    //         const foundPokemonDB = await pokemonsDB.filter(
    //             pokemon => pokemon.name.toLowerCase() == name.toLowerCase()
    //         )
    //         return foundPokemonDB.length ? res.status(200).send(foundPokemonDB)
    //                                      : res.status(404).send(`Ups! We can't find the Pokemon you're looking for...`)
    //     }
    // }} catch (error) {
    //     console.log(error)
    // } finally {
    //     if(!name) res.status(200).send(await getAllPokemons());
    // }
});

router.get('/:idPokemon', async (req, res) => {
    const { idPokemon } = req.params;
    let foundPokemon;
    if(idPokemon > 0 && idPokemon < 899 || idPokemon > 10000 && idPokemon < 10229) {
        const foundPokemon = await getPokemonByNameOrId(idPokemon);
        return foundPokemon ? res.status(200).send([foundPokemon])
                            : res.status(404).send(`Ups! We can't find the Pokemon ID you're looking for...`)
    }
    const pokemonsDB = await getDbPokemons();
    if(!foundPokemon && idPokemon){
        const pokemonDb = pokemonsDB.filter(pokemon=> pokemon.id === idPokemon)
        return pokemonDb.length ? res.status(200).send(pokemonDb)
                                : res.status(404).send(`Ups! We can't find the Pokemon ID you're looking for...`)
    }
})

router.post('/', async (req, res) => {
    const { name, img, hp, attack, defense, speed, height, weight, types } = req.body;

    const newPokemon = await Pokemon.create({ name, img, hp, attack, defense, speed, height, weight });
    let typeDB = await Type.findAll({
        where: {name: types}
    })
    if(!typeDB.length){                 //agrego este if para verificar y cargar los types si no están el la DB
        await getApiType();
        typeDB = await Type.findAll({
            where: {name: types}
        })
    }
    newPokemon.addType(typeDB);
    res.send('Great! You have created a Pokemon!');

})

module.exports = router;
