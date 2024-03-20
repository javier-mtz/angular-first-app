import { Router } from "express";
import Car from "../models/Car.js";
import mongoose from "mongoose";

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


export default router;
// Path: src/server/models/Car.js
