import { User, UserModel } from "../model/user.model";
import { omit } from 'lodash';
import {GenerateSignature} from '../utils/utilities'
export default class UserService{
    static async Signup(userDetails: Partial<User>){
        const user = await UserModel.CreateUser(userDetails)
        return omit(user.toJSON(), ['password']);
    }
      static async Login(userDetails: Partial<User>){
        const user = await UserModel.Login(userDetails)
        const token = await GenerateSignature({_id: user.id, role: user.role})
        const returnedUser = omit(user.toJSON(), ['password', 'trx_pin', 'updated_at']);
        return {...returnedUser, token}
    }
}