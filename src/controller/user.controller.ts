import {Request, Response, NextFunction } from "express";
import {User} from '../model/user'
import UserService from '../service/user-service'
import {HashPassword, GenerateAccountNumber} from "../utils/utilities"
export default class UserController{
    static async Signup(req: Request, res: Response, next: NextFunction){
        const userPassword = await HashPassword(req.body.password)
        const acctNumber = await GenerateAccountNumber()
        req.body.password = userPassword
        const user =  await UserService.Signup({...req.body, acctNumber})
        res.status(201).json(user)
    }
    static async Login(req: Request, res: Response, next: NextFunction){}
    static async getUserByAccountNumber(req: Request, res: Response, next: NextFunction){}
}