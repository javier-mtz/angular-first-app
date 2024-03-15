import { Router } from "express";
import Brand from "../models/Brand.js";
import mongoose from "mongoose";

const router = Router();

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

export default router;
