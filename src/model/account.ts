const { Model } = require('objection');
import { UserModel } from "./user";

export interface Account{
    id: string,
    user_id: number,
    current_balance: number,
    created_at: string,
    updated_at: string
}
export class AccountModel extends Model implements Account {
    static tableName= 'accounts';

    static relationMappings = {
        user_id: {
          relation: Model.BelongsToOneRelation,
          modelClass: UserModel,
          join: {
            from: 'accounts.user_id',
            to: 'users.id'
          }
        }
      };
}