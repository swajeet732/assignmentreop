"use client";
import React, { useState } from 'react';
import Navbar from '../navbar/page'; // Adjust the import if needed
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'; // Import toast container
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for toast notifications

const Contact = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create the payload
        const payload = {
            name,
            email,
            message,
        };

        try {
            // Make a POST request to the contact API
            const response = await axios.post('/api/contact', payload);

            // Show success toast
            toast.success(response.data.message);

            // Clear the form fields
            setName('');
            setEmail('');
            setMessage('');
        } catch (error) {
            // Show error toast
            if (error.response) {
                toast.error(error.response.data.error || 'An error occurred. Please try again.');
            } else {
                toast.error('An error occurred. Please try again.');
            }
        }
    };

    return (
        <>
            <Navbar />
            <div>
                {/* Add padding to the top to avoid overlap with the fixed Navbar */}
                <main className="flex items-center justify-center h-screen bg-bodyGradientStart text-white p-4 pt-40">
                    <div className="bg-gray-800 p-4 rounded-lg shadow-lg w-full max-w-md">

                        <h2 className="text-lg font-semibold mb-1"
                            style={{
                                color: '#ffffff',
                                fontFamily: 'Montserrat, sans-serif',
                                fontWeight: 500,
                            }}>Get in Touch</h2>
                        <p className="mb-3"
                            style={{
                                color: '#ffffff',
                                fontFamily: 'Montserrat, sans-serif',
                                fontWeight: 500,
                            }}>
                            If you have any questions, feel free to reach out! Our team is dedicated to providing the best support and guidance.
                        </p>

                        <form onSubmit={handleSubmit} className="mt-4">
                            <div className="flex mb-3">
                                <div className="w-1/2 pr-2">
                                    <label className="block text-sm font-medium mb-1"
                                        style={{
                                            color: '#ffffff',
                                            fontFamily: 'Montserrat, sans-serif',
                                            fontWeight: 500,
                                        }} htmlFor="name">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
                                        placeholder="Your Name"
                                        required
                                    />
                                </div>
                                <div className="w-1/2 pl-2">
                                    <label className="block text-sm font-medium mb-1" htmlFor="email"
                                        style={{
                                            color: '#ffffff',
                                            fontFamily: 'Montserrat, sans-serif',
                                            fontWeight: 500,
                                        }}>
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
                                        placeholder="Your Email"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className="block text-sm font-medium mb-1" htmlFor="message"
                                    style={{
                                        color: '#ffffff',
                                        fontFamily: 'Montserrat, sans-serif',
                                        fontWeight: 500,
                                    }}>
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
                                    rows="3" // Reduced rows for shorter height
                                    placeholder="Your Message"
                                    required
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="bg-buttonBlue text-white p-2 rounded w-20"
                                    style={{
                                        color: '#ffffff',
                                        fontFamily: 'Montserrat, sans-serif',
                                        fontWeight: 500,
                                    }}
                                >
                                    Send
                                </button>
                            </div>

                        </form>
                    </div>
                </main>
            </div>
            <ToastContainer /> {/* Include the ToastContainer */}
        </>
    );
};

export default Contact;
