// import * as dotenv from 'dotenv'
// dotenv.config();


// import { mockNext, mockRequest, mockResponse } from '../__mocks__/http';
// import UserController  from './user.controller';
// import UserService from '../service/user.service'
// import Util from '../utils/utilities'

// describe('Signup Controller', () => {
// 	beforeEach(()=>{
// 		jest.clearAllMocks()
// 	})
// 	it('signup if phone number is unique', async () => {
// 		const req = mockRequest({
// 			body: {
// 				phone: '09283748393',
// 				password: 'thisisapassword',
// 				firstname: 'Progress',
//                 lastname: 'Eze',
// 				email: 'proxna96@gmail.com',
// 				role: 'Customer'
				
// 			}
// 		});
// 		Util.HashPassword = jest.fn().mockReturnValue({ userPassword: "thisisahashedpassword" });
// 		expect(Util.HashPassword).toBeCalled()
// 		Util.GenerateAccountNumber = jest.fn().mockReturnValue({ account_number: "1234567890" });
// 		expect(Util.HashPassword).toBeCalled()
// 		const res = mockResponse();
// 		const userRegisterSpy = jest.spyOn(UserService, 'Signup');
// 		userRegisterSpy.mockResolvedValueOnce({
// 			id: '1',
// 			phone: '09283748393',
// 			password: 'thisisapassword',
// 			firstname: 'Progress',
// 			lastname: 'Eze',
// 			email: 'proxna96@gmail.com',
// 			role: 'Customer'
// 		});

// 		await UserController.Signup(req, res, mockNext);
//         expect(res.status).toBeCalledWith(201);
// 		expect(userRegisterSpy).toBeCalledWith({
// 			account_number: "1234567890",
//     		phone: '09283748393',
// 			password: 'thisisahashedpassword',
// 			firstname: 'Progress',
//             lastname: 'Eze',
// 			email: 'proxna96@gmail.com',
// 			role: 'Customer'
// 		});

// 		expect(res.data).toBeCalledWith({
// 			id: '1',
// 			phone: '09283748393',
// 			password: 'thisisapassword',
// 			firstname: 'Progress',
// 			lastname: 'Eze',
// 			email: 'proxna96@gmail.com',
// 			role: 'Customer'
// 		});
// 	});

// 	// it('Cant Register user if email is not unique', async () => {
// 	// 	const req = mockRequest({
// 	// 		body: {
// 	// 			email: 'ironman@avengers.com',
// 	// 			password: 'password',
// 	// 			fullname: 'Tony Stark'
// 	// 		}
// 	// 	});
// 	// 	const res = mockResponse();

// 	// 	const userRegisterSpy = jest.spyOn(AuthService, 'createUser');
// 	// 	userRegisterSpy.mockRejectedValueOnce('Email already exists');

// 	// 	try {
// 	// 		await AuthController.register(req, res, mockNext);
// 	// 	} catch (e) {
// 	// 		expect(userRegisterSpy).toBeCalledWith({
// 	// 			email: 'ironman@avengers.com',
// 	// 			password: 'password',
// 	// 			fullname: 'Tony Stark'
// 	// 		});
// 	// 		expect(e).toEqual('Email already exists')
	
// 	// 		expect(res.data).toBeCalledTimes(0);
// 	// 	}
// 	// });

// 	// it('Signup fails user if params are missing', async () => {
// 	// 	const req = mockRequest({
// 	// 		body: {
				
// 	// 		}
// 	// 	});
// 	// 	const res = mockResponse();

// 	// 	const userRegisterSpy = jest.spyOn(UserController, 'Signup');
// 	// 	userRegisterSpy.mockRejectedValueOnce({
// 	//         firstname: "firstname is required",
//     //         lastname: "lastname is required",
//     //         phone: "phone is required",
//     //         password: "password is required"
// 	// 	});

// 	// 	try {
// 	// 		await UserController.Signup(req, res, mockNext);
// 	// 	} catch (e) {
// 	// 		expect(userRegisterSpy).toBeCalledWith({
				
// 	// 		});
// 	// 		expect(e).toEqual({
//     //             firstname: "firstname is required",
//     //             lastname: "lastname is required",
//     //             phone: "phone is required",
//     //             password: "password is required"
// 	// 		})
	
// 	// 		expect(res.data).toBeCalledTimes(0);
// 	// 	}
// 	// });
//     // it('Cant Register user if params are missing', async () => {
// 	// 	const req = mockRequest({
// 	// 		body: {
// 	// 			firstname: "Precious Kings",
//     //             lastname: "Kings",
//     //             phone: "99323420920",
//     //             email: "proxy12@gmail.com",
//     //             password: "19960000",
// 	// 		}
// 	// 	});
// 	// 	const res = mockResponse();

// 	// 	const userRegisterSpy = jest.spyOn(UserController, 'Signup');
// 	// 	userRegisterSpy.mockRejectedValueOnce({
// 	//         firstname: "firstname is required",
//     //         lastname: "lastname is required",
//     //         phone: "phone is required",
//     //         password: "password is required"
// 	// 	});

// 	// 	try {
// 	// 		await UserController.Signup(req, res, mockNext);
// 	// 	} catch (e) {
// 	// 		expect(userRegisterSpy).toBeCalledWith({
				
// 	// 		});
// 	// 		expect(e).toEqual({
//     //             firstname: "firstname is required",
//     //             lastname: "lastname is required",
//     //             phone: "phone is required",
//     //             password: "password is required"
// 	// 		})
	
// 	// 		expect(res.data).toBeCalledTimes(0);
// 	// 	}
// 	// });

// });