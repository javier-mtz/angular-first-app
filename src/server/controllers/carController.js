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

    if (err) throw err;

    return result;
  };

  createCar = async (httpRequest) => {
    const { model, description, price, engine, images, brand } = httpRequest.body;
    if (!model || !description || !price || !engine || !images || !brand) {
      throw new CustomError("Someone is missing", 400);
    }

    if(isNaN(price)) throw new CustomError("Price must be a number", 400);
    
    if(price < 0) throw new CustomError("Price can not be negative", 400);


    const [err, result] = await to(this.carService.createCar(model, description, price, engine, images, brand));

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

    if (err) throw err;

    return result;
  };

  deleteCar = async (httpRequest) => {
    const { id } = httpRequest.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new CustomError("No record with given id : " + id, 400);
    }
    const [err, result] = await to(this.carService.deleteCar(id));


    if (err) throw err;

    return result;
  }

  getCar = async (httpRequest) => {
    const { id } = httpRequest.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new CustomError("No record with given id : " + id, 400);
    }
    const [err, result] = await to(this.carService.getCar(id));

    if (err) throw err;

    return result;
  }

  getCarsByUser = async (httpRequest) => {
    const { id } = httpRequest.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new CustomError("No record with given id : " + id, 400);
    }
    const [err, result] = await to(this.carService.getCarsByUser(id));

    if (err) throw err;

    return result;
  }

  rentCar = async (httpRequest) => {
    const { userId, carId } = httpRequest.params;
    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(carId)) {
      throw new CustomError("Invalid user or car id", 400);
    }
    const [err, result] = await to(this.carService.rentCar(userId, carId));

    if (err) throw err;

    return result;
  }

  returnCar = async (httpRequest) => {
    const { carId } = httpRequest.params;
    if (!mongoose.Types.ObjectId.isValid(carId)) {
      throw new CustomError("Invalid car id", 400);
    }
    const [err, result] = await to(this.carService.returnCar(carId));

    if (err) throw err;

    return result;
  }

  getRentedCars = async () => {
    const [err, result] = await to(this.carService.getRentedCars());

    if (err) throw err;

    return result;
  }

  getBrandCars = async (httpRequest) => {
    const { brandId } = httpRequest.params;
    if (!mongoose.Types.ObjectId.isValid(brandId)) {
      throw new CustomError("No record with given id : " + brandId, 400);
    }
    const [err, result] = await to(this.carService.getBrandCars(brandId));

    if (err) throw err;

    return result;
  }
}

const carController = new CarController();

export default carController;
