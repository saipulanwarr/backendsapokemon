'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Pokemon extends Model {
    static get table(){
        return 'pokemons'
    }

    static get primaryKey(){
        return 'id'
    }

    category(){
        return this.belongsTo('App/Models/Category');
    }

    type(){
        return this.hasMany('App/Models/Type');
    }
}

module.exports = Pokemon
