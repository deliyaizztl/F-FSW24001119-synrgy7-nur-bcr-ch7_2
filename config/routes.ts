import express from 'express'
import controllers from '../app/controllers'
import { multerMemory } from '../app/middleware/multerMemory'
import { authorize } from '../app/middleware/authorization'
import { allowAccess } from '../app/middleware/allowAccess'

import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../openapi.json';

const apiRouter = express.Router()
const superAdmin = 'superadmin'
const admin = 'admin'

// DOCS
apiRouter.use('/docs', swaggerUi.serve);
apiRouter.get('/docs', swaggerUi.setup(swaggerDocument));

// AUTH
apiRouter.post("/auth/login", controllers.api.auth.login);
apiRouter.post("/auth/register", controllers.api.auth.register);

// USER
apiRouter.get("/whoami", authorize, controllers.api.users.whoAmI);
apiRouter.get("/users", authorize, allowAccess([superAdmin]), controllers.api.users.getUsers);
apiRouter.post("/users/admin", authorize, allowAccess([superAdmin]), controllers.api.users.createAdmin);

// CARS
apiRouter.get("/cars", controllers.api.cars.getCars);
// apiRouter.get("/cars/:id", authorize, controllers.api.cars.getCarsById);
// 
// apiRouter.post("/cars", authorize, allowAccess([admin, superAdmin]), multerMemory.single("photo"), controllers.api.cars.addCar);
// apiRouter.put("/cars/:id", authorize, allowAccess([admin, superAdmin]), multerMemory.single("photo"), controllers.api.cars.updateCar);
// apiRouter.delete("/cars/:id", authorize, allowAccess([admin, superAdmin]), controllers.api.cars.deleteCar);

// remove allow access
apiRouter.get("/cars/:id", controllers.api.cars.getCarsById);
apiRouter.post("/cars", multerMemory.single("photo"), controllers.api.cars.addCar);
apiRouter.put("/cars/:id", multerMemory.single("photo"), controllers.api.cars.updateCar);
apiRouter.delete("/cars/:id", controllers.api.cars.deleteCar);

apiRouter.use(controllers.api.main.onLost) //Error404
apiRouter.use(controllers.api.main.onError) //Error500

export default {
    apiRouter,
};