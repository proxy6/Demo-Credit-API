import Joi from "joi";

export class Validation{
    static get Signup(){
        return Joi.object().keys({
			firstname: Joi.string().required(),
            lastname: Joi.string().required(),
            phone: Joi.string().required(),
			email: Joi.string().email(),
			password: Joi.string().required(),
            role: Joi.valid('Customer', 'Admin'),
            trx_pin: Joi.string(),
		});
    }
    static get Login(){
        return Joi.object().keys({
			phone: Joi.string().required(),
            password: Joi.string().required(),
		});
    }
    static get DepositOrWithdraw(){
        return Joi.object().keys({
			user_id: Joi.string().required(),
            amount: Joi.number().positive(),
            type: Joi.string().required() 
		});
    }
    static get Transfer(){
        return Joi.object().keys({
			receiver: Joi.string().required(),
            sender: Joi.string().required(),
            amount: Joi.number().positive(),
		});
    }
}