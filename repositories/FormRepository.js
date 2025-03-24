import Form from '../models/formmodel.js';
import { BaseRepository } from './BaseRepository.js';

export class FormRepository extends BaseRepository {
    constructor() {
        super(Form);
    }

    async findByEmail(email) {
        try {
            return await this.model.find({ email });
        } catch (error) {
            throw new Error(`Error finding forms by email: ${error.message}`);
        }
    }

    async findAll() {
        try {
            return await this.model.find();
        } catch (error) {
            throw new Error(`Error finding all forms: ${error.message}`);
        }
    }

    async createForm(formData) {
        try {
            return await this.create(formData);
        } catch (error) {
            throw new Error(`Error creating form: ${error.message}`);
        }
    }
}