import { FormService } from '../services/FormService.js';

const formService = new FormService();

export const submitForm = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    const formData = { name, email, phone, message };
    
    await formService.submitForm(formData);
    res.json({ message: 'Form submitted successfully', success: true });
  } catch (error) {
    console.error('Error saving form data:', error);
    res.status(500).json({ message: 'Server error' });
  }
};