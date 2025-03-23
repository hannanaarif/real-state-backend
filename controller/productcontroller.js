import { PropertyService } from '../services/PropertyService.js';

const propertyService = new PropertyService();

const addproperty = async (req, res) => {
    try {
        const { title, location, price, beds, baths, sqft, type, availability, description, amenities, phone, email } = req.body;
        const propertyData = {
            email: email || (req.user ? req.user.email : null),
            title,
            location,
            price,
            beds,
            baths,
            sqft,
            type,
            availability,
            description,
            amenities,
            phone
        };

        const property = await propertyService.createProperty(propertyData, req.files);
        res.json({ message: "Property added successfully", success: true, property });
    } catch (error) {
        console.log("Error adding property: ", error);
        res.status(500).json({ message: error.message || "Server Error", success: false });
    }
};

const updateproperty = async (req, res) => {
    try {
        const { id, title, location, price, beds, baths, sqft, type, availability, description, amenities, phone } = req.body;
        const propertyData = {
            title,
            location,
            price,
            beds,
            baths,
            sqft,
            type,
            availability,
            description,
            amenities,
            phone
        };

        const property = await propertyService.updateProperty(id, propertyData, req.files);
        res.json({ message: "Property updated successfully", success: true, property });
    } catch (error) {
        if (error.message === 'Property not found') {
            return res.status(404).json({ message: error.message, success: false });
        }
        console.log("Error updating property: ", error);
        res.status(500).json({ message: error.message || "Server Error", success: false });
    }
};

const listproperty = async (req, res) => {
    try {
        let properties;
        if (req.query.email) {
            properties = await propertyService.getPropertiesByEmail(req.query.email);
        } else {
            properties = await propertyService.getAllProperties();
        }
        res.json({ property: properties, success: true });
    } catch (error) {
        console.log("Error listing properties: ", error);
        res.status(500).json({ message: error.message || "Server Error", success: false });
    }
};

const removeproperty = async (req, res) => {
    try {
        await propertyService.deleteProperty(req.body.id);
        return res.json({ message: "Property removed successfully", success: true });
    } catch (error) {
        if (error.message === 'Property not found') {
            return res.status(404).json({ message: error.message, success: false });
        }
        console.log("Error removing property: ", error);
        return res.status(500).json({ message: error.message || "Server Error", success: false });
    }
};

const singleproperty = async (req, res) => {
    try {
        console.log("Fetching property with ID:", req.params.id);
        const property = await propertyService.getPropertyById(req.params.id);
        res.json({ property, success: true });
    } catch (error) {
        if (error.message === 'Property not found') {
            return res.status(404).json({ message: error.message, success: false });
        }
        console.log("Error fetching property:", error);
        res.status(500).json({ message: error.message || "Server Error", success: false });
    }
};

const getSellerProperties = async (req, res) => {
    try {
        const email = req.query.email || (req.user ? req.user.email : null);
        
        if (!email) {
            return res.status(400).json({ message: "Email is required", success: false });
        }
        
        const properties = await propertyService.getPropertiesByEmail(email);
        res.json({ properties, success: true });
    } catch (error) {
        console.log("Error fetching seller properties:", error);
        res.status(500).json({ message: error.message || "Server Error", success: false });
    }
};

const buyProperty = async (req, res) => {
    try {
        const { propertyId } = req.body;
        const updatedProperty = await propertyService.buyProperty(propertyId);
        res.json({ message: "Property purchased successfully", success: true, property: updatedProperty });
    } catch (error) {
        console.log("Error buying property:", error);
        res.status(500).json({ message: error.message || "Server Error", success: false });
    }
}

export { 
    addproperty, 
    listproperty, 
    removeproperty, 
    updateproperty, 
    singleproperty,
    getSellerProperties ,
    buyProperty
};