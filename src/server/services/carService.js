import Car from "../models/Car.js";

class CarService {
    constructor() {}

    async getAllCars() {
        try {
            const cars = await Car.aggregate([
                {
                    $lookup: {
                        from: "brands",
                        localField: "brandId",
                        foreignField: "_id",
                        as: "brand",
                    },
                },
                {
                    $unwind: "$brand",
                },
                {
                    $project: {
                        __v: false,
                        status: false,
                        createdAt: false,
                        updatedAt: false,
                        brandId: false,
                        "brand.__v": false,
                        "brand.status": false,
                        "brand.createdAt": false,
                        "brand.updatedAt": false,
                        "brand.color": false,
                        "brand.logo": false,
                    },
                },
            ]);
            return cars;
        } catch (error) {
            return error;
        }
    }

    async createCar(model, description, price, engine, images, brand) {
        try {
            const car = new Car({
                model,
                description,
                price,
                engine,
                images,
                brandId: brand,
            });
            car.save();
            return { message: "Car created" };
        } catch (error) {
            return error;
        }
    }

    async updateCar(id, model, description, price, engine, images, brand) {
        try {
            const car = await Car.findByIdAndUpdate(id, {
                model,
                description,
                price,
                engine,
                images,
                brandId: brand,
            }, { new: true });
            return { message: "Car updated" };
        } catch (error) {
            return error;
        }
    }

    async deleteCar(id) {
        try {
            await Car.findByIdAndDelete(id);
            return { message: "Car deleted" };
        } catch (error) {
            return error;
        }
    }

    async getCar(id) {
        try {
            const car = await Car.findById(id, {
                __v: false,
                status: false,
                createdAt: false,
                updatedAt: false
            }).populate('brandId');
            return car;
        } catch (error) {
            return error;
        }
    }

    async getCarsByUser(id) {
        try {
            const cars = await Car.find({ userId: id }, {
                __v: false,
                status: false,
                createdAt: false,
                updatedAt: false,
                brandId: false,
            });
            return cars;
        } catch (error) {
            return error;
        }
    }

    async rentCar(userId, carId) {
        try {
            const car = await Car.findByIdAndUpdate(carId, { userId, busy: true }, { new: true });
            return { message: "Car rented" };
        } catch (error) {
            return error;
        }
    }

    async returnCar(carId) {
        try {
            const car = await Car.findByIdAndUpdate(carId, { userId: null, busy: false }, { new: true });
            return { message: "Car returned" };
        } catch (error) {
            return error;
        }
    }

    async getRentedCars() {
        try {
            const cars = await Car.find({ busy: true }, {
                __v: false,
                status: false,
                createdAt: false,
                updatedAt: false,
                brandId: false,
            });
            return cars;
        } catch (error) {
            return error;
        }
    };

    async getBrandCars(brandId) {
        try {
            const cars = await Car.find({ brandId }, {
                __v: false,
                status: false,
                createdAt: false,
                updatedAt: false,
                brandId: false,
            });
            return cars;
        } catch (error) {
            return error;
        }
    }
}

export default CarService;