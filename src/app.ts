import express, { Application } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import { UserRoutes } from './app/modules/users/user.route';
const app: Application = express();

app.use(cors());

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application route
app.use('/api/v1/users', UserRoutes);

// Testing
// app.get('/', (r eq: Request, res: Response, next: NextFunction) => {
//   throw new ApiError(400, 'ore baba error');
//   // next('Ore baba error'); // Error
// });

// global error handler
app.use(globalErrorHandler);

export default app;
