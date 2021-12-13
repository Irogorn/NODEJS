import {
    categorieSchema,
    newCategorieSchema,
    updateCategorieSchema,
} from './schema.js';

import mongo from 'mongodb';

export default async function categoriesRoutes(app) {
    app.post(
        '/categories',
        {
            schema: {
                tags: ['Categorie'],
                body: newCategorieSchema,
                response: {
                    201: categorieSchema,
                },
            },
        },
        async (request, reply) => {
            const result = await app.db
                .collection('categories')
                .insertOne(request.body);
            const category = await app.db.collection('categories').findOne({
                _id: result.insertedId,
            });
            reply.code(201);
            return category;
        },
    );

    app.delete(
        '/categories/:id',
        {
            schema: {
                tags: ['Categorie'],
                params: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string',
                            description: 'the category identifier, as id',
                        },
                    },
                    required: ['id'],
                },
                response: {
                    200: categorieSchema,
                },
            },
        },
        async (request, reply) => {
            const id = mongo.ObjectId(request.params.id);

            const category = await app.db.collection('categories').findOne({
                _id: id,
            });

            if (!category) {
                reply.code(404);
                return { message: 'Category not found' };
            }

            await app.db.collection('categories').deleteOne({
                _id: id,
            });

            return category;
        },
    );

    app.get(
        '/categories/:id',
        {
            schema: {
                tags: ['Categorie'],
                params: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string',
                            description: 'the book identifier, as id',
                        },
                    },
                    required: ['id'],
                },
                response: {
                    200: categorieSchema,
                },
            },
        },
        async (request, reply) => {
            const id = request.params.id;
            const category = await app.db.collection('categories').findOne({
                _id: mongo.ObjectId(id),
            });

            if (!category) {
                reply.code(404);
                return { message: 'Category not found' };
            }

            return category;
        },
    );

    app.put(
        '/categorie/:id',
        {
            schema: {
                tags: ['Categorie'],
                params: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string',
                            description: 'the book identifier, as id',
                        },
                    },
                    required: ['id'],
                },
                body: updateCategorieSchema,
            },
        },
        async (request, reply) => {
            const id = request.params.id;

            const oldCategorie = await app.db.collection('categories').findOne({
                _id: mongo.ObjectId(id),
            });

            if (!oldCategorie) {
                reply.code(404);
                return { message: 'Category not found !' };
            }

            const newCategory = request.body;

            const result = await app.db
                .collection('categories')
                .updateOne(
                    { _id: mongo.ObjectId(id) },
                    { $set: { ...oldCategorie, ...newCategory } },
                );

            return result.matchedCount;
        },
    );
}
