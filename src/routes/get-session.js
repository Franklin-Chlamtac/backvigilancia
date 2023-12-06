import express from 'express';
import protectedRoutes from '../middlewares/protected-route';
import getSessionController from '../controllers/get-session-controller';


const router = express.Router();


router.get('/', protectedRoutes, getSessionController.handler )

export default router;