import express from 'express';
import multer from 'multer';
import path from 'path';
import { 
    addproperty, 
    listproperty, 
    removeproperty, 
    updateproperty, 
    singleproperty,
    getSellerProperties, 
    buyProperty
} from '../controller/productcontroller.js';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'h:/Project/Real_State/Real-Estate-Website/backend/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

// Add file filter for images
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Not an image! Please upload only images.'), false);
    }
};

const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
});

// Routes
router.post('/upload', upload.array('image', 4), addproperty);
router.put('/update', upload.array('image', 4), updateproperty);
router.get('/list', listproperty);
router.delete('/remove', removeproperty);
router.get('/single/:id', singleproperty);
router.get('/seller', getSellerProperties);
router.post('/buy', buyProperty);


export default router;