import { BaseService } from './BaseService.js';
import { FormRepository } from '../repositories/FormRepository.js';

export class FormService extends BaseService {
    constructor() {
        const formRepository = new FormRepository();
        super(formRepository);
    }

    async submitForm(formData) {
        try {
            return await this.repository.create(formData);
        } catch (error) {
            throw new Error(`Error submitting form: ${error.message}`);
        }
    }

    async getAllForms() {
        try {
            return await this.repository.find();
        } catch (error) {
            throw new Error(`Error getting forms: ${error.message}`);
        }
    }
}