import express from 'express';
// import { UserController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { academicSemesterValidation } from './academicSemester.validation';
const router = express.Router();

router.post(
  '/create-user',
  validateRequest(academicSemesterValidation.createAcademicSemesterZodSchema)
  //   UserController.createUser
);

export const UserRoutes = router;
