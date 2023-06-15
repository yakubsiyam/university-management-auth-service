import express from 'express';
// import validateRequest from '../../middlewares/validateRequest';
import { FacultyController } from './faculty.controller';
const router = express.Router();

router.get('/', FacultyController.getAllFaculties);

router.get('/:id', FacultyController.getSingleFaculty);

export const FacultyRoutes = router;
