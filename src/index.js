import Fastify from 'fastify';
import fp from 'fastify-plugin';
import { config } from 'dotenv';
import book from './books/index.js';
import category from './categories/index.js';
import swagger from './lib/swagger.js';
import cors from './lib/cors.js';
import mongodb from './lib/mongodb.js';
import jwt from './lib/jwt.js';

async function main() {
    config();

    const app = Fastify({
        /*Permet le debugage*/
        logger: process.env.NODE_ENV !== 'production',
    });

    app.register(fp(cors));
    app.register(fp(swagger));
    app.register(fp(mongodb));
    app.register(fp(jwt));

    app.register(fp(book));
    app.register(fp(category));

    app.listen(process.env.PORT, process.env.HOST, err => {
        if (err) {
            console.log(err);
            return;
        }
        console.log(
            `le serveur est disponible à l'addresse : ${process.env.SCHEME}://${process.env.HOST}:${process.env.PORT}`,
        );
    });
}

main();
