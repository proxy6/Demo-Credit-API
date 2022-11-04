import * as dotenv from 'dotenv'
dotenv.config();


import { mockNext, mockRequest, mockResponse } from '../__mocks__/http';
import UserController  from './user.controller';
import UserService from '../service/user.service'
import Util from '../utils/utilities'

describe('Signup Controller', () => {
	beforeEach(()=>{
		jest.clearAllMocks()
	})
	it('signup if phone number is unique', async () => {
		const req = mockRequest({
			body: {
				phone: '09283748393',
				password: 'thisisapassword',
				firstname: 'Progress',
                lastname: 'Eze',
				email: 'proxna96@gmail.com',
				role: 'Customer'
				
			}
		});
		const res = mockResponse();
		const userRegisterSpy = jest.spyOn(UserService, 'signup');
		userRegisterSpy.mockResolvedValueOnce({
			id: '1',
			phone: '09283748393',
			password: 'thisisapassword',
			firstname: 'Progress',
			lastname: 'Eze',
			email: 'proxna96@gmail.com',
			role: 'Customer'
		});

		await UserController.signup(req, res, mockNext);
        expect(res.status).toBeCalledWith(201);
		expect(userRegisterSpy).toBeCalledWith({
    		phone: '09283748393',
			password: 'thisisapassword',
			firstname: 'Progress',
            lastname: 'Eze',
			email: 'proxna96@gmail.com',
			role: 'Customer'
		});
	});

	
});