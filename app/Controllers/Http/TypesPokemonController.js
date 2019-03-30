'use strict'

const TypesPokemon = use('App/Models/TypesPokemon');

class TypesPokemonController {
    async store({ request, response }){
        const typesInfo = request.only(['pokemon_id', 'types_id'])

        const types = new TypesPokemon()
        types.pokemon_id = typesInfo.pokemon_id
        types.types_id = typesInfo.types_id

        await types.save()

        return response.status(201).json(types)
    }

    async delete({ params, response }){
        const types = await TypesPokemon.find(params.id)

        if(!types){
            return response.status(404).json({
                data: 'Resource not found'
            })
        }

        await types.delete()

        return response.status(200).json({
            id: params.id
        })
    }
}

module.exports = TypesPokemonController
