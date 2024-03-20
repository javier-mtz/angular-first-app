import { Schema, Types, model } from 'mongoose';

const CarSchema = new Schema({
    model: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    engine: {
        type: String,
        required: true
    },
    images: {
        type: [String],
        required: true
    },
    busy: {
        type: Boolean,
        default: false,
        required: true
    },
    brandId: {
        type: Types.ObjectId,
        ref: 'Brand',
    },
    userId: {
        type: Types.ObjectId,
        ref: 'User'
    },
});

const Car = model('Car', CarSchema);

export default Car;