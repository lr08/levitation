import React, { useState } from 'react';
import axios from 'axios';

const AddProducts: React.FC = () => {
    const [products, setProducts] = useState([{ name: '', quantity: 0, rate: 0 }]);

    const handleInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        const newProducts = [...products];
        newProducts[index] = { ...newProducts[index], [name]: value };
        setProducts(newProducts);
    };

    const handleAddProduct = () => {
        setProducts([...products, { name: '', quantity: 0, rate: 0 }]);
    };

    const handleSaveProducts = async () => {
        try {
            await axios.post('https://invoice-generator-lr-de650915df72.herokuapp.com/api/products/add', products);
            alert('Products saved successfully!');
        } catch (error) {
            console.error('Error saving products:', error);
            alert('Failed to save products.');
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-100">
            <h2 className="text-2xl font-bold mb-4">Add Products</h2>
            {products.map((product, index) => (
                <div key={index} className="bg-white p-6 rounded shadow-md w-80 mb-4">
                    <input
                        type="text"
                        name="name"
                        value={product.name}
                        onChange={(e) => handleInputChange(index, e)}
                        placeholder="Product Name"
                        className="w-full px-3 py-2 mb-2 border rounded"
                    />
                    <input
                        type="number"
                        name="quantity"
                        value={product.quantity}
                        onChange={(e) => handleInputChange(index, e)}
                        placeholder="Quantity"
                        className="w-full px-3 py-2 mb-2 border rounded"
                    />
                    <input
                        type="number"
                        name="rate"
                        value={product.rate}
                        onChange={(e) => handleInputChange(index, e)}
                        placeholder="Rate"
                        className="w-full px-3 py-2 mb-2 border rounded"
                    />
                    <span className="block mb-2">Total: {product.quantity * product.rate}</span>
                    <span className="block mb-2">GST (18%): {(product.quantity * product.rate * 0.18).toFixed(2)}</span>
                </div>
            ))}
            <button onClick={handleAddProduct} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200 mb-4">
                Add Another Product
            </button>
            <button onClick={handleSaveProducts} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-200 mb-4">
                Save Products
            </button>
            <button onClick={() => window.location.href = '/generate-invoice'} className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-700 transition duration-200">
                Next
            </button>
        </div>
    );
};

export default AddProducts;
