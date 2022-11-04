import {Request, Response, NextFunction } from "express";
import {v4 as uuid} from 'uuid'
import TransactionService from "../service/transaction.service";
export default class TransactionController{
    static async deposit(req: Request, res: Response, next: NextFunction){
        try{
        //call deposit service
        const deposit = await TransactionService.deposit(req.body)

        res.status(201).json({message: "Deposit Successful", data: deposit})
        }catch(e){
            res.json(e)
        }
    }
    static async withdraw(req: Request, res: Response, next: NextFunction){
        try{
            //call withdraw service
            const withdraw = await TransactionService.withdraw(req.body)
            res.status(201).json({message: "Withdraw Successful", data: withdraw})
            }catch(e){
                res.json(e)
            }
    }
    static async transfer(req: Request, res: Response, next: NextFunction){
        try{
            //call transfer service
            const transfer = await TransactionService.transfer(req.body)
            res.status(201).json({message: "Transfer Successful", data: transfer})
            }catch(e){
                res.json(e)
            }    
    }
    static async getTransactionsOfAccount(req: Request, res: Response, next: NextFunction){}
    static async getTransactionDetails(req: Request, res: Response, next: NextFunction){}

}