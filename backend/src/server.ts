import express, { Application } from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
import authRoutes from './routes/auth';
import productRoutes from './routes/product';
import pdfRoutes from './routes/pdf';

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/pdf', pdfRoutes);

// MongoDB connection
const mongoURI: string = process.env.MONGO_URI as string;

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
} as ConnectOptions)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Start server
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'https://invoice-react-app-six.vercel.app/', // Replace with your actual Vercel domain
  credentials: true
}));


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
