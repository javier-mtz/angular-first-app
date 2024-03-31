import {Router} from 'express';
import controllerHandler from '../middlewares/controllerHandler.js';
import CarController from '../controllers/carController.js';

const carRouter = Router();

carRouter.route('/all').get(controllerHandler(CarController.getAllCars));

carRouter.route('/create').post(controllerHandler(CarController.createCar));

carRouter.route('/update/:id').put(controllerHandler(CarController.updateCar));

carRouter.route('/delete/:id').delete(controllerHandler(CarController.deleteCar));

carRouter.route('/find/:id').get(controllerHandler(CarController.getCar));

carRouter.route('/findbyuser/:id').get(controllerHandler(CarController.getCarsByUser));

carRouter.route('/rentCar/:userId/:carId').get(controllerHandler(CarController.rentCar));

carRouter.route('/returnCar/:carId').get(controllerHandler(CarController.returnCar));

carRouter.route('/getRentedCars').get(controllerHandler(CarController.getRentedCars));

carRouter.route('/getBrandCars/:brandId').get(controllerHandler(CarController.getBrandCars));

export default carRouter;