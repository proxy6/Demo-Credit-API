import {Request, Response, NextFunction } from "express";
import {v4 as uuid} from 'uuid'
import TransactionService from "../service/transaction.service";
export default class TransactionController{
    static async Deposit(req: Request, res: Response, next: NextFunction){
        try{
        //call deposit service
        req.body.trx_ref = uuid().replace(/-/g, '').substring(0, 14)
        const deposit = await TransactionService.Deposit(req.body)

        res.status(201).json({message: "Deposit Successful", data: deposit})
        }catch(e){
            res.json(e)
        }
    }
    static async Withdraw(req: Request, res: Response, next: NextFunction){
        try{
            //call withdraw service
            req.body.trx_ref = uuid().replace(/-/g, '').substring(0, 14)
            const withdraw = await TransactionService.Withdraw(req.body)
    
            res.status(201).json({message: "Withdraw Successful", data: withdraw})
            }catch(e){
                res.json(e)
            }
    }
    static async Transfer(req: Request, res: Response, next: NextFunction){
        try{
            //call transfer service
            req.body.trx_ref = uuid().replace(/-/g, '').substring(0, 14)
            const transfer = await TransactionService.Transfer(req.body)
            res.status(201).json({message: "Transfer Successful", data: transfer})
            }catch(e){
                res.json(e)
            }    
    }
    static async getTransactionsOfAccount(req: Request, res: Response, next: NextFunction){}
    static async getTransactionDetails(req: Request, res: Response, next: NextFunction){}

}