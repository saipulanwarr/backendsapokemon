'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Type extends Model {
    static get table(){
        return 'types'
    }

    static get primaryKey(){
        return 'id'
    }
}

module.exports = Type
