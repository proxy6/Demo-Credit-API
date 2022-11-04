import { Router } from 'express';
import {Validator} from '../middleware/validator'
import {Validation} from '../utils/joi-validation'
import $ from 'express-async-handler'
import TransactionController from '../controller/transaction.controller';
const router = Router();

router.post('/deposit', $(Validator(Validation.DepositOrWithdraw)), $(TransactionController.deposit))
router.post('/withdraw', $(Validator(Validation.DepositOrWithdraw)), $(TransactionController.withdraw))
router.post('/transfer', $(Validator(Validation.Transfer)), $(TransactionController.transfer))
export default router