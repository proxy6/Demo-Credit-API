import {Request, Response, NextFunction } from "express";
export default class TransactionController{
    static async deposit(req: Request, res: Response, next: NextFunction){}
    static async withdraw(req: Request, res: Response, next: NextFunction){}
    static async transfer(req: Request, res: Response, next: NextFunction){}
    static async getTransactionsOfAccount(req: Request, res: Response, next: NextFunction){}
    static async getTransactionDetails(req: Request, res: Response, next: NextFunction){}

}