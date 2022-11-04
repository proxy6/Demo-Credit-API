import { Router } from 'express';
import userRouter from './user'
import transactionRouter from './transaction.router'

const router = Router();
router.get('/', (req, res)=>{
    res.status(200).send("Welcome to Demo Credit API ")
})

router.use('/', userRouter);
router.use('/', transactionRouter)

export default router;
