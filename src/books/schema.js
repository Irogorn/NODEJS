/**
 *
 * @module books/schema
 *
 */

import S from 'fluent-json-schema';
import {
    newCategorieSchema,
    updateCategorieSchema,
} from '../categories/schema.js';

export const newBookSchema = S.object()
    .additionalProperties(false)
    .description('Correspond à un nouveau livre dans notre api.')
    .title('NewBook')
    .prop('title', S.string().required())
    .prop('description', S.string().required())
    .prop('image', S.string().required())
    .prop('price', S.number().exclusiveMinimum(0).required())
    .prop('category', newCategorieSchema);

export const bookSchema = newBookSchema
    .title('Book')
    .description("Un livre dans l'api")
    .prop('_id', S.string().required());

export const bookCollectionSchema = S.array()
    .title('CollectionBooks')
    .items(bookSchema);

export const updateBookSchema = S.object()
    .description('Correspond à un nouveau livre dans notre api.')
    .title('UpdateBook')
    .prop('title', S.string())
    .prop('description', S.string())
    .prop('image', S.string())
    .prop('price', S.number().exclusiveMinimum(0))
    .prop('category', updateCategorieSchema);

export const searchBookCriteriaSchema = S.object()
    .additionalProperties(false)
    .title('search criteria')
    .prop(
        'limit',
        S.number()
            .exclusiveMinimum(0)
            .default(process.env.API_DEFAULT_COLLECTION_LIMIT),
    )
    .prop('page', S.number().exclusiveMinimum(0))
    .prop('orderBy', S.enum(['title', 'price', '_id']))
    .prop('direction', S.enum(['ASC', 'DESC']))
    .prop('title', S.string())
    .prop('minPrice', S.number())
    .prop('maxPrice', S.number())
    .prop('category', S.string());
