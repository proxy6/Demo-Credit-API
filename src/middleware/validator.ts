import joi from 'joi';
import { Request, Response, NextFunction} from 'express'
/**
 * @param {JoiSchema} schema
 * @returns middleware
 */
export const Validator = (schema: joi.Schema) => async (req: Request, res: Response, next: NextFunction) => {
	try {
		const value = await joi.attempt(req.body || {}, schema, {
			abortEarly: false,
			convert: true,
			stripUnknown: true,
		});
		// refined request body
		req.body = value;
		next();
	} catch (error: any) {
		// refined error message
		res.status(400).json({error: error.details.map((data: object | any) => data.message.replace(new RegExp('"', 'ig'), ''))})
	}
};