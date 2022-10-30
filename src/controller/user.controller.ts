import {Request, Response, NextFunction } from "express";
import UserService from '../service/user.service'
import {HashPassword, GenerateAccountNumber} from "../utils/utilities"
export default class UserController{
    static async Signup(req: Request, res: Response, next: NextFunction){
        try{
            req.body.password = await HashPassword(req.body.password)
            req.body.account_number = await GenerateAccountNumber()
            const user =  await UserService.Signup(req.body)
            res.status(201).json(user)
        }catch(e){
            console.log(e)
            res.send(e)
        }
    }
    static async Login(req: Request, res: Response, next: NextFunction){
        try{
            const user =  await UserService.Login(req.body)
            res.status(201).json(user)
        }catch(e){
            console.log(e)
            res.send(e)
        }    
    }
    static async getUserByAccountNumber(req: Request, res: Response, next: NextFunction){}
}