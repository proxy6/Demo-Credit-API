const { Model } = require('objection');
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
    created_at: string,
    updated_at: string
}
export class UserModel extends Model implements User {
    static tableName = 'users';

}