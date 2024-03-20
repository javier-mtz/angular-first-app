import { Schema, model } from 'mongoose';

const BrandSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    color: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        default: 1,
        required: true
    }
});

const Brand = model('Brand', BrandSchema);

export default Brand;