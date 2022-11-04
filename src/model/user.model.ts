import { AccountModel } from "./account.model";
const { Model } = require('objection');
import Util from '../utils/utilities'

import _, { omit, __ } from 'lodash';
export enum User_role{
    User="Customer",
    Admin="Admin"
}
export interface User{
    id: string,
    firstname: string,
    lastname: string,
    phone: string,
    password:string,
    trx_pin: number,
    email: string,
    role: User_role,
    account_number: string
}
export class UserModel extends Model implements User {
    
    static tableName = 'users';
    static async CreateUser(userDetails: Partial<User>){
        const existingUser = await this.query().select("id").where({phone: userDetails.phone}).first()
        if(existingUser) return Promise.reject("User Exists, Phone Number Already Exist")
        const user = await UserModel.query().insert({
            firstname: userDetails.firstname, 
            lastname: userDetails.lastname, 
            phone: userDetails.phone,
            role: userDetails.role,
            password: userDetails.password, 
            email: userDetails.email
        })
        //create user account using account number and user_id
         const account = await AccountModel.query().insert({
            user_id: user.id,
            account_number: userDetails.account_number
        })

        _.merge(user, userDetails )
        const returnedUser = omit(user.toJSON(), ['password', 'trx_pin', 'updated_at']);
        return returnedUser
    }
    static async Login(userDetails: Partial<User>){
        const user = await this.query().select("*").where({phone: userDetails.phone}).first()
        if(!user) return Promise.reject("Phone Number or Password Incorrect")
        const validatePass = await Util.validatePassword(userDetails.password, user.password)
        if(validatePass == false) return Promise.reject('Phone Number or Password Incorrect') 
        return user
    }


}