import mongoose from "mongoose";
import { to } from "await-to-js";
import BrandService from "../services/brandService.js";
import CustomError from "../utils/customError.js";
class BrandController {

  constructor() {
    this.brandService = new BrandService();
  }

  allBrands = async () => {
    const [err, result] = await to(this.brandService.allBrands());

    if (err) throw err;

    return result;
  };

  createBrand = async (httpRequest) => {
    const { name, color, logo } = httpRequest.body;
    if (!name || !color || !logo) {
      throw new CustomError("Someone is missing", 400);
    }
    const [err, result] = await to(this.brandService.createBrand(name, color, logo));

    if (err) throw err;

    return result;
  }

  deleteBrand = async (httpRequest) => {
    const { id } = httpRequest.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new CustomError("No record with given id : " + id, 400);
    }
    const [err, result] = await to(this.brandService.deleteBrand(id));

    if (err) throw err;

    return result;
  }

  updateBrand = async (httpRequest) => {
    const { id } = httpRequest.params;
    const { name, color, logo } = httpRequest.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new CustomError("No record with given id : " + id, 400);
    }
    const [err, result] = await to(this.brandService.updateBrand(id, name, color, logo));

    if (err) throw err;

    return result;
  }

  getBrand = async (httpRequest) => {
    const { id } = httpRequest.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new CustomError("No record with given id : " + id, 400);
    }

    const [err, result] = await to(this.brandService.getBrand(id));

    if (err) throw err;

    return result;
  }

  getBrandWithCars = async () => {
    const [err, result] = await to(this.brandService.getBrandWithCars());

    if (err) throw err;

    return result;
  }
}

const brandController = new BrandController();

export default brandController;
