import express, { Application } from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
const path = require('path');
dotenv.config();

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../../frontend/invoicegenerator/build')));
// Routes
import authRoutes from './routes/auth';
import productRoutes from './routes/product';
import pdfRoutes from './routes/pdf';

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/pdf', pdfRoutes);

// MongoDB connection
 const mongoURI: string =  "mongodb://localhost:27017/invoicegenerator";
//  const mongoURI: string = process.env.MONGO_URI as string;

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
} as ConnectOptions)
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Start server
const PORT = process.env.PORT || 5000;

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/invoicegenerator/build', 'index.html'));
  });

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
