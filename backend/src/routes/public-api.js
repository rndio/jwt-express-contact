import express from 'express';
import userController from '../controller/user-controller.js';
import contactController from '../controller/contact-controller.js';


const publicRouter = new express.Router();
publicRouter.get('/', (req, res) => {
  res.send('rndio\'s contact REST API!');
});

publicRouter.post('/api/users', userController.register);
publicRouter.get('/api/users/:username', userController.check);
publicRouter.post('/api/users/login', userController.login);
publicRouter.post('/api/contacts/:username', contactController.store);

export default publicRouter;