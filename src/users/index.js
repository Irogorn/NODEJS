import UserModel from './model.js';
import userRoutes from './routes.js';

export default async function users(app) {
    app.decorate('users', new UserModel(app.db, 'users'));
    app.register(userRoutes);
}
