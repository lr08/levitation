import express, { Request, Response } from 'express';
import Product, { IProduct } from '../models/Product';

const router = express.Router();

router.post('/add', async (req: Request, res: Response) => {
    try {
        const products: IProduct[] = req.body;
        const savedProducts = await Product.insertMany(products);
        res.status(201).json(savedProducts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/', async (req: Request, res: Response) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
