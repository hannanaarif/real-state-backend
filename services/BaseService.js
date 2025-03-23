export class BaseService {
    constructor(repository) {
        this.repository = repository;
    }

    async findById(id) {
        try {
            return await this.repository.findById(id);
        } catch (error) {
            throw new Error(`Error finding by id: ${error.message}`);
        }
    }

    async findOne(conditions) {
        try {
            return await this.repository.findOne(conditions);
        } catch (error) {
            throw new Error(`Error finding one: ${error.message}`);
        }
    }

    async find(conditions = {}) {
        try {
            return await this.repository.find(conditions);
        } catch (error) {
            throw new Error(`Error finding: ${error.message}`);
        }
    }

    async create(data) {
        try {
            return await this.repository.create(data);
        } catch (error) {
            throw new Error(`Error creating: ${error.message}`);
        }
    }

    async update(id, data) {
        try {
            return await this.repository.update(id, data);
        } catch (error) {
            throw new Error(`Error updating: ${error.message}`);
        }
    }

    async delete(id) {
        try {
            return await this.repository.delete(id);
        } catch (error) {
            throw new Error(`Error deleting: ${error.message}`);
        }
    }

    async count(conditions = {}) {
        try {
            return await this.repository.count(conditions);
        } catch (error) {
            throw new Error(`Error counting: ${error.message}`);
        }
    }
}