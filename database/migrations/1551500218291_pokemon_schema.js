'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PokemonSchema extends Schema {
  up () {
    this.create('pokemons', (table) => {
      table.increments()
      table.string('name_pokemon').nullable()
      table.string('latitude').nullable()
      table.string('longitude').nullable()
      table.string('image_url').nullable()
      table.integer('category_id').unsigned().references().inTable('categories')
      table.timestamps()
    })
  }

  down () {
    this.drop('pokemons')
  }
}

module.exports = PokemonSchema
