import S from 'fluent-json-schema';

export const NewUser = S.object()
    .title('NewUser')
    .description('Définie un nouvelle uitlisateur')
    .prop('email', S.string().required())
    .prop('password', S.string().required());

export const User = NewUser.prop('_id', S.string().required());

export const Credential = S.object()
    .title('Credential')
    .description('Contient les informations nescessaire pour se connécter')
    .prop('email', S.string().required())
    .prop('password', S.string().required());
