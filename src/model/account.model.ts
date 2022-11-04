const { Model } = require('objection');
import { Transaction } from "./transaction.model";
import { UserModel, User } from "./user.model";

export interface Account{
    id: string,
    user_id: string,
    account_number: string
    current_balance: number,
}
export class AccountModel extends Model implements Account {
    static tableName= 'accounts';

    static async balance(id: string){
    const balance = this.query()
    .select('current_balance').where({user_id: id})
    .first()
    return balance
    }

    static async updateAccountBalance(newBalance: number, trxDetails: Transaction ){
      trxDetails.user_id = trxDetails.user_id || trxDetails.sender || trxDetails.receiver
      const deposit = this.query().update({current_balance: newBalance}).where({user_id: trxDetails.user_id})
      return deposit
    }

    static async confirmAccount(id: string){
      const account = this.query().select("current_balance").where({user_id: id}).first()
      if(!account) return Promise.reject("Account Not Found")
      if(account.user_id == id) return Promise.reject("Sorry, You cant transfer funds to yourself")
      return account
    }
    static async fetchUser(userDetails: any){
      const user = this.query()
      .select('u.firstname', 'u.lastname', 'u.email', 'accounts.account_number', 'accounts.current_balance')
      .join('users as u', 'u.id', 'accounts.user_id')
      .skipUndefined()
      .where({user_id: userDetails.user_id})
      .orWhere({account_number: userDetails.account_number})
      return user
    }
  
}