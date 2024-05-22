import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';

const router = express.Router();

// Registration
router.post('/register', async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    try {
        const user: IUser = new User({ name, email, password });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err:any) {
        res.status(500).json({ error: err.message });
    }
});

// Login
router.post('/login', async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const user: IUser | null = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string, {
            expiresIn: '1h'
        });
        res.json({ token });
    } catch (err:any) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
