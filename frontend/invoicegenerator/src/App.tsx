import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import AddProducts from './pages/AddProducts';
import GenerateInvoice from './pages/GenerateInvoice';

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/add-products" element={<AddProducts />} />
                    <Route path="/generate-invoice" element={<GenerateInvoice />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
