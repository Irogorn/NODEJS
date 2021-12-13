import S from 'fluent-json-schema';

export const newCategorieSchema = S.object()
    .additionalProperties(false)
    .description('Correspond à une nouvelle catégorie dans notre api.')
    .title('NewCategorie')
    .prop('title', S.string().required());

export const categorieSchema = newCategorieSchema
    .title('Categorie')
    .description("Une catégorie dans l'api")
    .prop('_id', S.string().required());

export const updateCategorieSchema = S.object()
    .additionalProperties(false)
    .description('Correspond à une nouvelle catégorie dans notre api.')
    .title('NewBook')
    .prop('title', S.string());
