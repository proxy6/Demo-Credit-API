import { User, UserModel } from "../model/user";

export default class UserService{

    static async Signup(userDetails: Partial<User>){
        console.log(userDetails)
        const existingUser = await UserModel.query().findOne({phone: userDetails.email})
        if(existingUser) Promise.reject("User Exists")
        const user = await UserModel.query().insert({
            firstname: userDetails.firstname, 
            lastname: userDetails.lastname, 
            phone: userDetails.phone,
            role: userDetails.role,
            password: userDetails.password 
        })
        //create user account using account number and user_id
        return user
    }
}