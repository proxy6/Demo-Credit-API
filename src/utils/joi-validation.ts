import Joi from "joi";

export class Validation{
    static get Signup(){
        return Joi.object().keys({
			firstname: Joi.string().required(),
            lastname: Joi.string().required(),
            phone: Joi.string().required(),
			email: Joi.string().email(),
			password: Joi.string().required(),
            role: Joi.string().required(),
            trx_pin: Joi.string(),
		});
    }
}