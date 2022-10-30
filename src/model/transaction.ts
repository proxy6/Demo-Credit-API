const { Model } = require('objection');
import { UserModel } from "./user";

export enum TransactionType{
    Debit="Debit",
    Credit="Credit"
}
export interface Transaction{
    id: string,
    sender: string,
    receiver: number,
    type: TransactionType,
    trx_ref: string,
    created_at: string,
    updated_at: string
}
export class TransactionModel extends Model implements Transaction {
    static tableName= 'transactions';

    static relationMappings = {
        sender: {
          relation: Model.BelongsToOneRelation,
          modelClass: UserModel,
          join: {
            from: 'transactions.sender',
            to: 'users.id'
          }
        },
        receiver: {
          relation: Model.BelongsToOneRelation,
          modelClass: UserModel,
          join: {
            from: 'transactions.reciever',
            to: 'users.id'
            }
        }
      };
}