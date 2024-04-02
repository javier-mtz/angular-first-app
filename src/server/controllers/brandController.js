import Brand from "../models/Brand.js";
import { Router } from "express";
import mongoose from "mongoose";
import { to } from "await-to-js";
import BrandService from "../services/brandService.js";
import CustomError from "../utils/customError.js";
const router = Router();

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

    if(!result){
      throw new CustomError("Internal Server Error", 500);
    }

    if (err) throw err;

    return result;
  }

  deleteBrand = async (httpRequest) => {
    const { id } = httpRequest.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new CustomError("No record with given id : " + id, 400);
    }
    const [err, result] = await to(this.brandService.deleteBrand(id));

    if(!result){
      throw new CustomError("Internal Server Error", 500);
    }

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

    if(!result){
      throw new CustomError("Internal Server Error", 500);
    }

    if (err) throw err;

    return result;
  }

  getBrand = async (httpRequest) => {
    const { id } = httpRequest.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new CustomError("No record with given id : " + id, 400);
    }

    const [err, result] = await to(this.brandService.getBrand(id));

    if(!result){
      throw new CustomError("Internal Server Error", 500);
    }

    if (err) throw err;

    return result;
  }

  getBrandWithCars = async () => {
    const [err, result] = await to(this.brandService.getBrandWithCars());

    if(!result){
      throw new CustomError("Internal Server Error", 500);
    }

    if (err) throw err;

    return result;
  }
}

const brandController = new BrandController();

export default brandController;


router.get("/all", async (req, res) => {
  Brand.find(
    { status: 1 },
    { __v: false, status: false, createdAt: false, updatedAt: false }
  )
    .then((brands) => {
      res.json(brands);
    })
    .catch((error) => {
      res.status(500).send("Internal Server Error");
    });
});

router.post("/create", (req, res) => {
  const { name, color, logo } = req.body;
  Brand.findOne({ name }).then((brand) => {
    if (brand) {
      Brand.findByIdAndUpdate(brand._id, { status: 1 }, { new: true });
    } else {
      const brand = new Brand({
        name,
        color,
        logo,
      });
      brand.save()
        .then((brand) => {
          res.json({ message: "Brand created" });
        })
        .catch((error) => {
          res.status(500).send("Internal Server Error");
        });
    }
  });
});

router.put("/delete/:id", (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send("No record with given id : " + id);
  }
  Brand.findByIdAndUpdate(id, { status: 2 }, { new: true })
    .then((brand) => {
      res.json({ message: "Brand deleted" });
    })
    .catch((error) => {
      res.status(500).send("Internal Server Error");
    });
});

router.put("/update/:id", (req, res) => {
  const id = req.params.id;
  const { name, color, logo } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send("No record with given id : " + id);
  }
  Brand.findByIdAndUpdate(id, { name, color, logo }, { new: true })
    .then((brand) => {
      res.json({ message: "Brand updated" });
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
  Brand.findById(id, {
    __v: false,
    status: false,
    createdAt: false,
    updatedAt: false,
  })
    .then((brand) => {
      res.json(brand);
    })
    .catch((error) => {
      res.status(500).send("Internal Server Error");
    });
});

