'use strict'

const Type = use('App/Models/Type');

class TypeController {
    async index({ response }){
        let type = await Type.all()

        return response.json(type)
    }

    async store({ request, response }){
        const typeInfo = request.only(['name_type', 'pokemon_id'])

        const type = new Type()
        type.name_type = typeInfo.name_type
        type.pokemon_id = typeInfo.pokemon_id

        await type.save()

        return response.status(201).json(type)
    }

    async update({ params, request, response }){
        const typeInfo = request.only(['name_type', 'pokemon_id'])

        const type = await Type.find(params.id)

        if(!type){
            return response.status(404).json({
                data: 'Resource not found'
            })
        }

        type.name_type = typeInfo.name_type
        type.pokemon_id = typeInfo.pokemon_id

        await type.save()

        return response.status(200).json(type)
    }

    async delete({ params, response }){
        const type = await Type.find(params.id)

        if(!type){
            return response.status(404).json({
                data: 'Resource not found'
            })
        }

        await type.delete()

        return response.status(200).json({
            id: params.id
        })
    }
}

module.exports = TypeController
