import { Router } from "express";
import Car from "../models/Car.js";
import { to } from "await-to-js";
import CustomError from "../utils/customError.js";
import mongoose from "mongoose";
import CarService from "../services/carService.js";


class CarController {
  constructor() {
    this.carService = new CarService();
  }

  getAllCars = async () => {
    const [err, result] = await to(this.carService.getAllCars());

    if(!result){
      throw new CustomError("Internal Server Error", 500);
    }

    if (err) throw err;

    return result;
  };

  createCar = async (httpRequest) => {
    const { model, description, price, engine, images, brand } = httpRequest.body;
    if (!model || !description || !price || !engine || !images || !brand) {
      throw new CustomError("Someone is missing", 400);
    }
    const [err, result] = await to(this.carService.createCar(model, description, price, engine, images, brand));

    if(!result){
      throw new CustomError("Internal Server Error", 500);
    }

    if (err) throw err;

    return result;
  }

  updateCar = async (httpRequest) => {
    const { id } = httpRequest.params;
    const { model, description, price, engine, images, brand } = httpRequest.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new CustomError("No record with given id : " + id, 400);
    }
    const [err, result] = await to(this.carService.updateCar(id, model, description, price, engine, images, brand));

    if(!result){
      throw new CustomError("Internal Server Error", 500);
    }

    if (err) throw err;

    return result;
  };

  deleteCar = async (httpRequest) => {
    const { id } = httpRequest.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new CustomError("No record with given id : " + id, 400);
    }
    const [err, result] = await to(this.carService.deleteCar(id));

    if(!result){
      throw new CustomError("Internal Server Error", 500);
    }

    if (err) throw err;

    return result;
  }

  getCar = async (httpRequest) => {
    const { id } = httpRequest.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new CustomError("No record with given id : " + id, 400);
    }
    const [err, result] = await to(this.carService.getCar(id));

    if(!result){
      throw new CustomError("Internal Server Error", 500);
    }

    if (err) throw err;

    return result;
  }

  getCarsByUser = async (httpRequest) => {
    const { id } = httpRequest.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new CustomError("No record with given id : " + id, 400);
    }
    const [err, result] = await to(this.carService.getCarsByUser(id));

    if(!result){
      throw new CustomError("Internal Server Error", 500);
    }

    if (err) throw err;

    return result;
  }

  rentCar = async (httpRequest) => {
    const { userId, carId } = httpRequest.params;
    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(carId)) {
      throw new CustomError("Invalid user or car id", 400);
    }
    const [err, result] = await to(this.carService.rentCar(userId, carId));

    if(!result){
      throw new CustomError("Internal Server Error", 500);
    }

    if (err) throw err;

    return result;
  }

  returnCar = async (httpRequest) => {
    const { carId } = httpRequest.params;
    if (!mongoose.Types.ObjectId.isValid(carId)) {
      throw new CustomError("Invalid car id", 400);
    }
    const [err, result] = await to(this.carService.returnCar(carId));

    if(!result){
      throw new CustomError("Internal Server Error", 500);
    }

    if (err) throw err;

    return result;
  }

  getRentedCars = async () => {
    const [err, result] = await to(this.carService.getRentedCars());

    if(!result){
      throw new CustomError("Internal Server Error", 500);
    }

    if (err) throw err;

    return result;
  }

  getBrandCars = async (httpRequest) => {
    const { brandId } = httpRequest.params;
    if (!mongoose.Types.ObjectId.isValid(brandId)) {
      throw new CustomError("No record with given id : " + brandId, 400);
    }
    const [err, result] = await to(this.carService.getBrandCars(brandId));

    if(!result){
      throw new CustomError("Internal Server Error", 500);
    }

    if (err) throw err;

    return result;
  }
}

const carController = new CarController();

export default carController;


const router = Router();

router.get("/all", async (req, res) => {
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
    res.json(cars);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.post("/create", (req, res) => {
  const { model, description, price, engine, images, brand } = req.body;
  const car = new Car({
    model,
    description,
    price,
    engine,
    images,
    brandId: brand,
  });
  car.save()
    .then((car) => {
      res.json({ message: "Car created" });
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

router.put("/update/:id", (req, res) => {
  const id = req.params.id;
  const { model, description, price, engine, images, brand } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send("No record with given id : " + id);
  }
  const car = {
    model,
    description,
    price,
    engine,
    images,
    brandId: brand,
  };
  Car.findByIdAndUpdate(id, car, { new: true })
    .then((car) => {
      res.json({ message: "Car updated" });
    })
    .catch((error) => {
      res.status(500).send("Internal Server Error");
    });
});

router.get("/find/:id", (req, res) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send("No record with given id : " + id);
    }
    Car.findById(id, { busy: false, __v: false })
        .populate('brandId')
        .then((car) => {
        res.json(car);
        })
        .catch((error) => {
        res.status(500).send("Internal Server Error");
        });
});

router.get("/findbyuser/:id", (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send("No record with given id : " + id);
  }
  Car.find({userId: id})
      .populate('brandId').populate('userId')
      .then((car) => {
      res.json(car);
      })
      .catch((error) => {
      res.status(500).send("Internal Server Error");
      });
});


router.delete("/delete/:id", (req, res) => {
  console.log(req.params.id);
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send("No record with given id : " + id);
    }
    Car.findByIdAndDelete(id)
        .then((car) => {
        res.json({ message: "Car deleted" });
        })
        .catch((error) => {
        res.status(500).send("Internal Server Error");
        });
});

router.get("/rentCar/:userId/:carId", (req, res) => {
  const userId = req.params.userId;
  const carId = req.params.carId;

  if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(carId)) {
    return res.status(400).send("Invalid user or car id");
  }

  Car.findByIdAndUpdate(carId, { busy: true, userId: userId }, { new: true })
    .then((car) => {
      res.json({ message: "Car rented" });
    })
    .catch((error) => {
      res.status(500).send("Internal Server Error");
    });
});

router.get("/returnCar/:carId", (req, res) => {
  const carId = req.params.carId;

  if (!mongoose.Types.ObjectId.isValid(carId)) {
    return res.status(400).send("Invalid car id");
  }

  Car.findByIdAndUpdate(carId, { busy: false, userId: null }, { new: true })
    .then((car) => {
      res.json({ message: "Car returned" });
    })
    .catch((error) => {
      res.status(500).send("Internal Server Error");
    });
});

