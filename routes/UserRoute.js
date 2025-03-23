import express from 'express';
import { login, register,getname } from '../controller/Usercontroller.js';
import { protect } from '../middleware/authmiddleware.js';
// import {protect} from '../middleware/authmiddleware.js';


const userrouter = express.Router();

userrouter.post('/login', login);
userrouter.post('/register', register);
userrouter.get('/me', protect, getname);

export default userrouter;