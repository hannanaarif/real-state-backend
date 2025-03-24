import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import validator from 'validator';
import { BaseService } from './BaseService.js';
import UserRepository from '../repositories/UserRepository.js';
import transporter from '../config/nodemailer.js';
import { getWelcomeTemplate } from '../email.js';

class UserService extends BaseService {
    constructor() {
        super(UserRepository);
    }

    createToken(id) {
        return jwt.sign({ id }, process.env.JWT_SECRET, {
            expiresIn: '30d',
        });
    }

    async login(email, password) {
        const user = await this.repository.findByEmail(email);
        if (!user) {
            return { message: 'Email not found', success: false };
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = this.createToken(user._id);
            return {
                token,
                user: {
                    name: user.name,
                    email: user.email,
                    role: user.role
                },
                success: true
            };
        } else {
            return { message: 'Invalid password', success: false };
        }
    }

    async register(userData) {
        const { name, email, password, role } = userData;

        if (!validator.isEmail(email)) {
            return { message: 'Invalid email', success: false };
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await this.repository.createUser({
            name,
            email,
            password: hashedPassword,
            role
        });

        const token = this.createToken(newUser._id);

        // Send welcome email
        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: email,
            subject: 'Welcome to BuildEstate - Your Account Has Been Created',
            html: getWelcomeTemplate(name)
        };

        await transporter.sendMail(mailOptions).catch(error => {
            console.log('Error sending welcome email:', error);
        });

        return {
            token,
            user: {
                name: newUser.name,
                email: newUser.email
            },
            success: true
        };
    }

    async getUserProfile(userId) {
        return await this.repository.getUserById(userId);
    }
}

export default new UserService();