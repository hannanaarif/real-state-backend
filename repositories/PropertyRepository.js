import Property from '../models/propertymodel.js';
import { BaseRepository } from './BaseRepository.js';

export class PropertyRepository extends BaseRepository {
    constructor() {
        super(Property);
    }

    async buyProperty(propertyId) {
        try {
            return await Property.findByIdAndUpdate(propertyId, { sold: true });
        } catch (error) {
            throw new Error(`Error buying property: ${error.message}`);
        }
    }

    async findByEmail(email) {
        try {
            return await Property.find({ email });
        } catch (error) {
            throw new Error(`Error finding properties by email: ${error.message}`);
        }
    }

    async findAll() {
        try {
            return await Property.find();
        } catch (error) {
            throw new Error(`Error finding all properties: ${error.message}`);
        }
    }

    async createProperty(propertyData) {
        try {
            const property = new Property(propertyData);
            return await property.save();
        } catch (error) {
            throw new Error(`Error creating property: ${error.message}`);
        }
    }

    async updateProperty(id, propertyData) {
        try {
            const property = await Property.findById(id);
            if (!property) {
                throw new Error('Property not found');
            }
            Object.assign(property, propertyData);
            return await property.save();
        } catch (error) {
            throw new Error(`Error updating property: ${error.message}`);
        }
    }

    async deleteProperty(id) {
        try {
            const property = await Property.findByIdAndDelete(id);
            if (!property) {
                throw new Error('Property not found');
            }
            return property;
        } catch (error) {
            throw new Error(`Error deleting property: ${error.message}`);
        }
    }

    async findById(id) {
        try {
            const property = await Property.findById(id);
            if (!property) {
                throw new Error('Property not found');
            }
            return property;
        } catch (error) {
            throw new Error(`Error finding property: ${error.message}`);
        }
    }
}