import mongo from 'mongodb';

export default async function mongodb(app) {
    const client = await mongo.MongoClient.connect(
        'mongodb+srv://admin:admin@cluster0.crpjj.mongodb.net/DORANCO_COURS?retryWrites=true&w=majority',
    );
    console.log(client);
    const db = client.db('DORANCO_COURS');

    app.decorate('db', db);
}
