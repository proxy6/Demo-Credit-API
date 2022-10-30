const { Model } = require('objection');
import { User, UserModel } from "./user.model";

export enum TransactionType{
    Debit="Debit",
    Credit="Credit"
}
export interface Transaction{
    id: string,
    user_id: string
    sender: string,
    receiver: string,
    amount: number,
    type: TransactionType,
    trx_ref: string,
}
export class TransactionModel extends Model implements Transaction {
    static tableName= 'transactions';
    static async CreateTransaction(trxDetails: Transaction){
        const transaction = await this.query().insert({
            user_id: trxDetails.user_id,
            amount: trxDetails.amount,
            type: trxDetails.type,
            trx_ref: trxDetails.trx_ref
        })
        return transaction
    }
    static async TransferTransaction(trxDetails: Transaction){
        const transaction = await this.query().insert({
            sender: trxDetails.sender,
            receiver: trxDetails.receiver,
            amount: trxDetails.amount,
            type: trxDetails.type,
            trx_ref: trxDetails.trx_ref
        })
        return transaction
    }

}