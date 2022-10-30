import { Router } from 'express';
import userRouter from './user'
// import transaction from './transaction.router'
// import { isAuthorized } from '../middleware/auth';

const router = Router();
router.get('/', (req, res)=>{
    res.status(200).send("Welcome to Demo Credit API ")
})

router.use('/', userRouter);
// router.use('/transaction', isAuthorized('user'), transaction)

export default router;
