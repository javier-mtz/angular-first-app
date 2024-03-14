const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
    modelo: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    precio: {
        type: String,
        required: true
    },
    motor: {
        type: String,
        required: true
    },
    imagenes: {
        type: [String],
        required: true
    },
    busy: {
        type: Boolean,
        default: false,
        required: true
    },
    brandId: {
        type: mongoose.Types.ObjectId,
        unique :true,
    },
    userId: {
        type: mongoose.Types.ObjectId,
        unique :true,
    },
});

const Car = mongoose.model('Car', CarSchema);

module.exports = Car;