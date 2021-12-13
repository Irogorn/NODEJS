import categoriesRoutes from './routes.js';
import CategoryModel from './model.js';

export default async function category(app) {
    app.decorate('categories', new CategoryModel(app.db, 'categories'));
    app.register(categoriesRoutes);
}
