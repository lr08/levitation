import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/auth/register', { name, email, password });
            navigate('/login'); // Redirect to Login Page
        } catch (err) {
            setError('Error registering user');
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
            <h2 className="text-2xl font-bold mb-4">Register</h2>
            <form onSubmit={handleRegister} className="bg-white p-6 rounded shadow-md w-80">
                <div className="mb-4">
                    <label className="block text-gray-700">Name</label>
                    <input 
                        type="text" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        required 
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Password</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                {error && <p className="text-red-500">{error}</p>}
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-200 w-full">
                    Register
                </button>
            </form>
        </div>
    );
};

export default Register;
