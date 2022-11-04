import { User, UserModel, User_role } from "../model/user.model";
import { omit } from 'lodash';
import Util from '../utils/utilities'
import { Account, AccountModel } from "../model/account.model";
export default class UserService{
    static async signup(userDetails: Partial<User>){
        userDetails.password = await Util.hashPassword(userDetails.password)
        userDetails.account_number = await Util.generateAccountNumber()
        const user = await UserModel.CreateUser(userDetails)
        return user
    }
      static async login(userDetails: Partial<User>){
        const user = await UserModel.Login(userDetails)
        const token = await Util.generateSignature({_id: user.id, role: user.role})
        const returnedUser = omit(user.toJSON(), ['password', 'trx_pin', 'updated_at']);
        return {...returnedUser, token}
    }
    static async fetchUser(userDetails: Pick<Account, "account_number" | 'user_id'>){
        const user = await AccountModel.fetchUser(userDetails)
        if(user.length == 0) return Promise.reject("User Not Found")
        return user
    }
}