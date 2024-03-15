const mongoose = require('mongoose');

const BrandSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    paletteColors: {
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

const Brand = mongoose.model('Brand', BrandSchema);

module.exports = Brand;