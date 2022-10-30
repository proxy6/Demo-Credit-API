import { Router } from 'express';
import {Validator} from '../middleware/validator'
import {Validation} from '../utils/joi-validation'
import $ from 'express-async-handler'
import UserController from '../controller/user.controller';
const router = Router();

router.post('/signup', $(Validator(Validation.Signup)), $(UserController.Signup))
router.post('/login', $(Validator(Validation.Login)), $(UserController.Login))
export default router