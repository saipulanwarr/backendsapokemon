'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class TypesPokemon extends Model {
    static get table(){
        return 'types_pokemons'
    }

    static get primaryKey(){
        return 'id'
    }
}

module.exports = TypesPokemon
