import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GenerateInvoice: React.FC = () => {
    const [invoiceData, setInvoiceData] = useState<Blob | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchInvoice = async () => {
            try {
                const response = await axios.get('https://invoice-generator-lr-de650915df72.herokuapp.com/api/pdf/generate', {
                    responseType: 'blob'
                });
                setInvoiceData(response.data);
            } catch (error) {
                console.error('Error generating invoice:', error);
                setError('Failed to generate invoice. Please try again later.');
            }
        };

        fetchInvoice();
    }, []);

    const handleDownload = () => {
        if (invoiceData) {
            const url = window.URL.createObjectURL(new Blob([invoiceData], { type: 'application/pdf' }));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'invoice.pdf');
            document.body.appendChild(link);
            link.click();
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
            <h2 className="text-2xl font-bold mb-4">Generate Invoice</h2>
            {error && <p className="text-red-500">{error}</p>}
            {invoiceData ? (
                <button onClick={handleDownload} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200">
                    Download Invoice
                </button>
            ) : (
                !error && <p>Loading...</p>
            )}
        </div>
    );
};

export default GenerateInvoice;
