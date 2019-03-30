'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TypesPokemonSchema extends Schema {
  up () {
    this.create('types_pokemons', (table) => {
      table.increments()
      table.integer('pokemon_id').unsigned().references().inTable('pokemons')
      table.integer('types_id').unsigned().references().inTable('types')
      table.timestamps()
    })
  }

  down () {
    this.drop('types_pokemons')
  }
}

module.exports = TypesPokemonSchema
