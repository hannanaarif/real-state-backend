import { BaseRepository } from './BaseRepository.js';
import userModel from '../models/Usermodel.js';

class UserRepository extends BaseRepository {
    constructor() {
        super(userModel);
    }

    async findByEmail(email) {
        return await this.model.findOne({ email });
    }

    async createUser(userData) {
        return await this.create(userData);
    }

    async getUserById(id) {
        return await this.findById(id).select('-password');
    }
}

export default new UserRepository();