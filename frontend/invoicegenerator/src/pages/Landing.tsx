import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
            <h1 className="text-4xl font-bold mb-8">Welcome to the Product Invoice Generator</h1>
            <div className="flex space-x-4">
                <Link to="/login">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200">
                        Login
                    </button>
                </Link>
                <Link to="/register">
                    <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-200">
                        Register
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default LandingPage;
