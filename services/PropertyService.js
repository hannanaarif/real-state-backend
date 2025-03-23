import { PropertyRepository } from '../repositories/PropertyRepository.js';
import cloudinary from '../config/cloudinary.js';
import fs from 'fs';

export class PropertyService {
    constructor() {
        this.propertyRepository = new PropertyRepository();
    }

    async buyProperty(propertyId) {
        try {
            return await this.propertyRepository.buyProperty(propertyId);
        } catch (error) {
            throw new Error(`Error buying property: ${error.message}`);
        }
    }

    async getPropertiesByEmail(email) {
        try {
            return await this.propertyRepository.findByEmail(email);
        } catch (error) {
            throw new Error(`Error getting properties by email: ${error.message}`);
        }
    }

    async getAllProperties() {
        try {
            return await this.propertyRepository.findAll();
        } catch (error) {
            throw new Error(`Error getting all properties: ${error.message}`);
        }
    }

    async createProperty(propertyData, files) {
        try {
            const imageUrls = await this.uploadImages(files);
            const parsedAmenities = this.parseAmenities(propertyData.amenities);

            const property = await this.propertyRepository.createProperty({
                ...propertyData,
                amenities: parsedAmenities,
                image: imageUrls
            });

            return property;
        } catch (error) {
            throw new Error(`Error creating property: ${error.message}`);
        }
    }

    async updateProperty(id, propertyData, files) {
        try {
            const parsedAmenities = this.parseAmenities(propertyData.amenities);
            let imageUrls = [];

            if (files && files.length > 0) {
                imageUrls = await this.uploadImages(files);
            }

            const updatedProperty = await this.propertyRepository.updateProperty(id, {
                ...propertyData,
                amenities: parsedAmenities,
                ...(imageUrls.length > 0 && { image: imageUrls })
            });

            return updatedProperty;
        } catch (error) {
            throw new Error(`Error updating property: ${error.message}`);
        }
    }

    async deleteProperty(id) {
        try {
            return await this.propertyRepository.deleteProperty(id);
        } catch (error) {
            throw new Error(`Error deleting property: ${error.message}`);
        }
    }

    async getPropertyById(id) {
        try {
            return await this.propertyRepository.findById(id);
        } catch (error) {
            throw new Error(`Error getting property: ${error.message}`);
        }
    }

    async uploadImages(files) {
        if (!files || files.length === 0) return [];

        try {
            const imageUrls = await Promise.all(
                files.map(async (file) => {
                    const result = await cloudinary.uploader.upload(file.path, {
                        folder: 'properties'
                    });

                    fs.unlink(file.path, (err) => {
                        if (err) console.log('Error deleting file:', err);
                    });

                    return result.secure_url;
                })
            );

            return imageUrls;
        } catch (error) {
            throw new Error(`Error uploading images: ${error.message}`);
        }
    }

    parseAmenities(amenities) {
        if (!amenities) return [];

        if (typeof amenities === 'string') {
            try {
                return JSON.parse(amenities);
            } catch (e) {
                return amenities.split(',').map(item => item.trim());
            }
        }

        return amenities;
    }
}