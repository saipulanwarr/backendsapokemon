'use strict'

const Pokemon = use('App/Models/Pokemon')
const DataGrid = use('DataGrid')

class PokemonController {
    async index({ response }){
        try{
            const config = {
                query(){
                    return Pokemon.query().with('category').with('type')
                },

                sortable: {
                    name_pokemon: 'name_pokemon',
                    deleted (query, value){
                        query[+value ? 'whereNotNull' : 'whereNUll']('deleted_at')
                    }
                },
    
                searchable: ['name_pokemon'],
    
                filterable: {
                    name_pokemon: 'name_pokemon'
                },
    
                exportOptions: {
                    fields: [
                        {label: 'name_pokemon', value: 'name_pokemon'},
                        {
                            label: 'Deleted',
                            value: row => row.deleted_at ? 'YES' : 'NO',
                        }
                    ]
                }
    
            }
    
            return DataGrid.paginate(config);
        }
        catch(e){
            return response.status(404).json({
                data: 'Data Not Found'
            })
        }
    }

    async store({ request, response }){
        const pokemonInfo = request.only(['name_pokemon', 'latitude', 'longitude', 'category_id', 'image_url'])

        const pokemon = new Pokemon()
        pokemon.name_pokemon = pokemonInfo.name_pokemon
        pokemon.latitude = pokemonInfo.latitude
        pokemon.longitude = pokemonInfo.longitude
        pokemon.category_id = pokemonInfo.category_id
		pokemon.image_url = pokemonInfo.image_url

        await pokemon.save()

        return response.status(201).json(pokemon)

    }

    async detail({ params, response }){
        const pokemon = await Pokemon.query().with('category').with('type').where('id', '=', params.id).fetch()

        return response.status(200).json(pokemon);
    }

    async update({ params, request, response }){
        const pokemonInfo = request.only([
            'name_pokemon', 'latitude', 'longitude', 'category_id', 'image_url'
        ])

        const pokemon = await Pokemon.find(params.id)

        if(!pokemon){
            return response.status(404).json({
                data: 'Resource not found'
            })
        }

        pokemon.name_pokemon = pokemonInfo.name_pokemon
        pokemon.latitude = pokemonInfo.latitude
        pokemon.longitude = pokemonInfo.longitude
        pokemon.category_id = pokemonInfo.category_id
		pokemon.image_url = pokemonInfo.image_url

        await pokemon.save()

        return response.status(200).json(pokemon)
    }

    async delete({ params, response }){
        const pokemon = await Pokemon.find(params.id)

        if(!pokemon){
            return response.status(404).json({
                data: 'Resource not found'
            })
        }

        await pokemon.delete()

        return response.status(200).json({
            id: params.id
        })
    }
}

module.exports = PokemonController
