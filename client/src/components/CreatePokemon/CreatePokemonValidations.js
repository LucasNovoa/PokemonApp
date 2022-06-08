export default function validations(input, pokemonNames) {
    let errors = [];
    let RegExpression = /^[a-zA-Z\s]*$/;

    if(!input.name) {
        errors.name = 'Name is required'
    } else if(pokemonNames.includes(input.name)) {
        errors.name = 'That Pokemon name already exists'
    } else if(input.name.length < 4 || input.name.length > 15) {
        errors.name = 'Name must be longer than three characters... And less than 15!'
    } else if(!RegExpression.test(input.name)) {
        errors.name = 'Special characters and numbers are not allowed'
    }

    if(!input.hp) {
        errors.hp = 'required value'
    } else if(input.hp > 500){
        errors.hp = 'max Hit Points value is 500'
    }

    if(!input.attack) {
        errors.attack = 'required value'
    } else if(input.attack > 300){
        errors.attack = 'this Pokemos is to strong (max value is 300)'
    }

    if(!input.defense) {
        errors.defense = 'required value'
    } else if(input.defense > 300){
        errors.defense = 'max value is 300'
    }

    if(!input.speed) {
        errors.speed = 'required value'
    } else if(input.speed > 200){
        errors.speed = 'oh..! so fast, max value is 200'
    }

    if(!input.height) {
        errors.height = 'required value'
    } else if(input.height > 200){
        errors.height = 'oh..! to tall, max value is 200'
    }

    if(!input.weight) {
        errors.weight = 'required value'
    } else if(input.weight > 5000){
        errors.weight = 'oh..! to heavy, max value is 5000'
    }

    return errors
}