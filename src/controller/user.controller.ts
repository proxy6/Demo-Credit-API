import {Request, Response, NextFunction } from "express";
import UserService from '../service/user.service'
export default class UserController{
    static async signup(req: Request, res: Response, next: NextFunction){
        try{
            const user =  await UserService.signup(req.body)
            res.status(201).json(user)
        }catch(e){
            res.json(e)
        }
    }
    static async login(req: Request, res: Response, next: NextFunction){
        try{
            const user =  await UserService.login(req.body)
            res.status(200).json(user)
        }catch(e){
            res.json(e)
        }    
    }
    static async getUserByAccountNumber(req: Request, res: Response, next: NextFunction){
        try{
            const user = await UserService.fetchUser(req.body)
            res.status(200).json(user)
        }catch(e){
            res.json(e)
        }
    }
}