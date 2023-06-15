import express from 'express';
// import validateRequest from '../../middlewares/validateRequest';
import { FacultyController } from './faculty.controller';
const router = express.Router();

router.get('/', FacultyController.getAllFaculties);

export const FacultyRoutes = router;
