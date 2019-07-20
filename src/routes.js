import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import ProviderController from './app/controllers/ProviderController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import AppointmentController from './app/controllers/AppointmentController';
import ScheduleController from './app/controllers/ScheduleController';
import AvailableController from './app/controllers/AvailableController';
import NotificationController from './app/controllers/NotificationController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

// Create User
routes.post('/users', UserController.store);

// User login
routes.post('/sessions', SessionController.store);

// Auth middleware (Only logined users can access the following routes)
routes.use(authMiddleware);

// User's update information
routes.put('/users', UserController.update);

// List all providers
routes.get('/providers', ProviderController.index);
// List all available time for provider
routes.get('/providers/:providerId/available', AvailableController.index);

// List all appointments if the user is provider
routes.get('/appointments', AppointmentController.index);
// Create a new appointment
routes.post('/appointments', AppointmentController.store);
// Delete appointment
routes.delete('/appointments/:id', AppointmentController.delete);

// List the shedule of the provider
routes.get('/schedule', ScheduleController.index);

// List all the notifications of the provider
routes.get('/notifications', NotificationController.index);
// Update notification when the provider see
routes.put('/notifications/:id', NotificationController.update);

// Store the avatar of the user
routes.post('/files', upload.single('file'), FileController.store);

export default routes;
