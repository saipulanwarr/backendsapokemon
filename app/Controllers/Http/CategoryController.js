'use strict'

const Category = use('App/Models/Category');

class CategoryController {
    async index({ response }){
        let category = await Category.all()

        return response.json(category);
    }

    async store({ request, response }){
        const categoryInfo = request.only(['name_category'])
        
        const category = new Category()
        category.name_category = categoryInfo.name_category

        await category.save()

        return response.status(201).json(category)
    }

    async update({ params, request, response }){
        const categoryInfo = request.only(['name_category'])

        const category = await Category.find(params.id)

        if(!category){
            return response.status(404).json({
                data: 'Resource not found'
            })
        }

        category.name_category = categoryInfo.name_category

        await category.save()

        return response.status(200).json(category)
    }

    async delete({ params, response }){
        const category = await Category.find(params.id)

        if(!category){
            return response.status(404).json({
                data: 'Resource not found'
            })
        }

        await category.delete()

        return response.status(200).json({
            id: params.id
        })
    }
}

module.exports = CategoryController
