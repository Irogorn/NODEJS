/**
 *
 * @module books/routes
 *
 */

import {
    bookSchema,
    newBookSchema,
    updateBookSchema,
    searchBookCriteriaSchema,
    bookCollectionSchema,
} from './schema.js';

export default async function bookRoutes(app) {
    app.post(
        '/books',
        {
            schema: {
                tags: ['Book'],
                body: newBookSchema,
                response: {
                    201: bookSchema,
                },
            },
        },
        async (request, reply) => {
            /*const result = await app.db
                .collection('books')
                .insertOne(request.body);
            const book = await app.db.collection('books').findOne({
                _id: result.insertedId,
            });
            reply.code(201);
            return book;*/

            await request.jwtVerify();

            reply.code(201);
            return app.books.create(request.body);
        },
    );

    app.delete(
        '/books/:id',
        {
            schema: {
                tags: ['Book'],
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
                    200: bookSchema,
                },
            },
        },
        async (request, reply) => {
            /*  const id = mongo.ObjectId(request.params.id);

            const book = await app.db.collection('books').findOne({
                _id: id,
            });

            if (!book) {
                reply.code(404);
                return { message: 'Book not found' };
            }

            await app.db.collection('books').deleteOne({
                _id: id,
            });

            return book;*/
            return app.books.delete(request.params.id);
        },
    );

    app.get(
        '/books/:id',
        {
            schema: {
                tags: ['Book'],
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
                    200: bookSchema,
                },
            },
        },
        async (request, reply) => {
            const id = request.params.id;
            const book = await app.db.collection('books').findOne({
                _id: mongo.ObjectId(id),
            });

            if (!book) {
                reply.code(404);
                return { message: 'Book not found' };
            }

            return book;
        },
    );

    app.get(
        '/books',
        {
            schema: {
                tags: ['Book'],
                querystring: searchBookCriteriaSchema,
                response: {
                    200: bookCollectionSchema,
                },
            },
        },
        async request => {
            /*   let filters = {};
            const limit =
                parseInt(request.query.limit) ||
                parseInt(process.env.API_DEFAULT_COLLECTION_LIMIT);
            const page = parseInt(request.query.page) || 1;
            const orderby = request.query.orderby;
            const direction = request.query.direction || 1;*/
            // const books = await app.db.collection('books').find().toArray();
            /*   if (!limit) {
                return await app.db.collection('books').find().toArray();
            } */
            //return books.slice(0, limit);

            // const findou = { $regex: /^Har/ };

            //{ price: { $gte: 0, $lte: 10 } }

            /*    if (request.query.title) {
                filters = {
                    ...filters,
                    title: { $regex: request.query.title },
                };
            }

            if (request.query.minPrice) {
                filters = {
                    ...filters,
                    price: { $gte: request.query.minPrice },
                };
            }

            if (request.query.maxPrice) {
                if (request.query.minPrice) {
                    filters = {
                        ...filters,
                        price: {
                            $gte: request.query.minPrice,
                            $lte: request.query.maxPrice,
                        },
                    };
                } else {
                    filters = {
                        ...filters,
                        price: { $lte: request.query.maxPrice },
                    };
                }
            }

            if (request.query.category) {
                filters = {
                    ...filters,
                    'category.title': { $regex: request.query.category },
                };
            }

            console.log({ title: { $regex: /^Har/ } });

            console.log({ [orderby]: { $regex: /^Har/ } });

            return await app.db
                .collection('books')
                .find({ [orderby]: { $regex: /^Har/ } })
                .limit(limit)
                .skip(limit * (page - 1))
                .sort({ [orderby]: `${direction})` === 'Croissant' ? 1 : -1 })
                .toArray();*/

            return app.books.search(request.query);
        },
    );

    app.patch(
        '/books/:id',
        {
            schema: {
                tags: ['Book'],
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
                body: updateBookSchema,
            },
        },
        async (request, reply) => {
            /*  const id = request.params.id;

            const oldBook = await app.db.collection('books').findOne({
                _id: mongo.ObjectId(id),
            });

            if (!oldBook) {
                reply.code(404);
                return { message: 'Book not found !' };
            }

            const newBook = request.body;

            const result = await app.db
                .collection('books')
                .updateOne(
                    { _id: mongo.ObjectId(id) },
                    { $set: { ...oldBook, ...newBook } },
                );

            return result.matchedCount;*/
            return app.books.update(request.params.id, request.body);
        },
    );
}
