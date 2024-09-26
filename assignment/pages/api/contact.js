// pages/api/contact.js

import Customer from '../../src/app/models/contact'; // Import the Customer model
import connectDBB from '../../src/app/utils/db'; // Ensure this utility connects to your MongoDB instance

export default async function handler(req, res) {
    console.log('API handler called'); // Debugging: Check if the handler is hit
    await connectDBB(); // Ensure database connection
    console.log('Database connection successful'); // Debugging: Check if DB connection is successful

    if (req.method === 'POST') {
        console.log('POST request received'); // Debugging: Check if POST request is received
        const { name, email, message } = req.body;
        console.log('Request body:', req.body); // Debugging: Log the received body

        try {
            // Check for existing customer by email
            const existingCustomer = await Customer.findOne({ email });
            console.log('Existing customer:', existingCustomer); // Debugging: Check if the customer exists

            if (existingCustomer) {
                console.log('Email already exists'); // Debugging: Email exists
                return res.status(400).json({ error: 'Email already exists' });
            }

            const customer = new Customer({
                name,
                email,
                message,
            });

            await customer.save();
            console.log('Customer saved successfully'); // Debugging: Customer saved
            res.status(201).json({ message: 'Message sent successfully' });
        } catch (error) {
            console.error('Error saving customer:', error); // Debugging: Log any errors
            res.status(500).json({ error: 'Failed to save message' });
        }
    } else {
        console.log(`Method ${req.method} not allowed`); // Debugging: Invalid method
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
