import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
    name: string;
    quantity: number;
    rate: number;
}

const ProductSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    rate: {
        type: Number,
        required: true
    }
});

const Product = mongoose.model<IProduct>('Product', ProductSchema);
export default Product;
