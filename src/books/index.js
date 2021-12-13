import bookRoutes from './routes.js';
import BookModel from './model.js';

export default async function book(app) {
    app.decorate('books', new BookModel(app.db, 'books'));
    app.register(bookRoutes);
}
