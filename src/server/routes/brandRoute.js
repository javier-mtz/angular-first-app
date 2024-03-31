import BrandController from '../controllers/brandController.js';
import express from 'express';
import controllerHandler from '../middlewares/controllerHandler.js';

const brandRouter = express.Router();

brandRouter.route('/all').get(controllerHandler(BrandController.allBrands));

brandRouter.route('/create').post(controllerHandler(BrandController.createBrand));

brandRouter.route('/delete/:id').put(controllerHandler(BrandController.deleteBrand));

brandRouter.route('/update/:id').put(controllerHandler(BrandController.updateBrand));

brandRouter.route('/find/:id').get(controllerHandler(BrandController.getBrand));

brandRouter.route('/findbrandwithcars').get(controllerHandler(BrandController.getBrandWithCars));

export default brandRouter;