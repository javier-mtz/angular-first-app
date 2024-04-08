import Brand from "../models/Brand.js";
import mongoose from "mongoose";

class BrandService {
  constructor() {}

  async allBrands() {
    try {
      const brands = await Brand.find(
        { status: 1 },
        { __v: false, status: false, createdAt: false, updatedAt: false }
      );
      return brands;
    } catch (error) {
      throw error;
    }
  }

  async createBrand(name, color, logo) {
    try {
      const brand = await Brand.findOne({ name });
      if (brand) {
        await Brand.findByIdAndUpdate(brand._id, { status: 1, color, logo }, { new: true });

        return { message: "Brand created" };
      } else {
        const brand = new Brand({
          name,
          color,
          logo,
        });
        await brand.save();
        return { message: "Brand created" };
      }
    } catch (error) {
      throw error;
    }
  }

  async deleteBrand(id) {
    try {
      await Brand.findByIdAndUpdate(id, { status: 2 }, { new: true });

      return { message: "Brand deleted" };
    } catch (error) {
      throw error;
    }
  }

  async updateBrand(id, name, color, logo) {
    try {
      await Brand.findByIdAndUpdate(id, { name, color, logo }, { new: true });

      return { message: "Brand updated" };
    } catch (error) {
      throw error;
    }
  }

  async getBrand(id) {
    try {
      const brand = await Brand.findById(id, {
        __v: false,
        status: false,
        createdAt: false,
        updatedAt: false,
      });
      return brand;
    } catch (error) {
      throw error;
    }
  }

  async getBrandWithCars() {
    try {
      const cars = await Brand.aggregate([
        {
          $lookup: {
            from: "cars",
            localField: "_id",
            foreignField: "brandId",
            as: "cars",
          },
        },
        {
          $match: {
            cars: { $ne: [] }
          }
        },
        {
          $project: {
            __v: false,
            status: false,
            createdAt: false,
            updatedAt: false,
            color: false,
            "cars.__v": false,
            "cars.status": false,
            "cars.createdAt": false,
            "cars.updatedAt": false,
            "cars.brandId": false,
            "cars.images": false,
            "cars.engine": false,
            "cars.description": false,
          },
        },
      ]);
      return cars;
    } catch (error) {
      throw error;
    }
  };
}

export default BrandService;
