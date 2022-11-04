import * as dotenv from 'dotenv'
dotenv.config();
import { mockNext, mockRequest, mockResponse } from '../__mocks__/http';
import UserController  from './user.controller';
import UserService from '../service/user.service'

describe('User Controller', ()=>{
	describe('Signup', () => {
		beforeEach(()=>{
			jest.clearAllMocks()
		})
		it('signup successful', async () => {
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
			const signupSpy = jest.spyOn(UserService, 'signup');
			signupSpy.mockResolvedValueOnce({
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
			expect(signupSpy).toBeCalledWith({
				phone: '09283748393',
				password: 'thisisapassword',
				firstname: 'Progress',
				lastname: 'Eze',
				email: 'proxna96@gmail.com',
				role: 'Customer'
			});
			expect(res.json).toBeCalledWith({
				id: '1',
				phone: '09283748393',
				password: 'thisisapassword',
				firstname: 'Progress',
				lastname: 'Eze',
				email: 'proxna96@gmail.com',
				role: 'Customer'
			});
		});
		it('cannot signup if required request body is missing', async () => {
			const req = mockRequest({
				body: {
					phone: '09283748393',
					password: 'thisisapassword',
					firstname: 'Progress',
					email: 'proxna96@gmail.com',
				}
			});
			const res = mockResponse();
	
			const signupSpy = jest.spyOn(UserService, 'signup');
			signupSpy.mockRejectedValueOnce({
				error:[
					"lastname is required",
					"role is required",
				]
			});
	
			try {
				await UserController.signup(req, res, mockNext);
			} catch (e) {
				expect(signupSpy).toBeCalledWith({
					body: {
						phone: '09283748393',
						password: 'thisisapassword',
						firstname: 'Progress',
						email: 'proxna96@gmail.com',
					}
				});
				expect(e).toEqual({
					error:[
						"lastname is required",
						"role is required",
					]
				 
				})
		
				expect(res.data).toBeCalledTimes(0);
			}
		});
		it('cannot signup if phone number is not unique', async () => {
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
	
			const signupSpy = jest.spyOn(UserService, 'signup');
			signupSpy.mockRejectedValueOnce('User Exists, Phone Number Already Exist');
	
			try {
				await UserController.signup(req, res, mockNext);
			} catch (e) {
				expect(signupSpy).toBeCalledWith({
					phone: '09283748393',
					password: 'thisisapassword',
					firstname: 'Progress',
					lastname: 'Eze',
					email: 'proxna96@gmail.com',
					role: 'Customer'
				});
				expect(e).toEqual('User Exists, Phone Number Already Exist')
		
				expect(res.json).toBeCalledTimes(0);
			}
		});
	
	});
	describe('Login', () => {
		beforeEach(()=>{
			jest.clearAllMocks()
		})
		it('login successful', async () => {
			const req = mockRequest({
				body: {
					phone: '09283748393',
					password: 'thisisapassword',
				}
			});
			const res = mockResponse();
			const loginSpy = jest.spyOn(UserService, 'login');
			loginSpy.mockResolvedValueOnce({token: 'thisisatoken' });
			await UserController.login(req, res, mockNext);
			expect(res.status).toBeCalledWith(200);
			expect(loginSpy).toBeCalledWith({
				phone: '09283748393',
				password: 'thisisapassword'
			});
			expect(res.json).toBeCalledWith({
				token: 'thisisatoken'
			});
		});

		it('login fails if phone number or password is incorrect', async () => {
			const req = mockRequest({
				body: {
					phone: '09283748393',
					password: 'thisisapassword',
				}
			});
			const res = mockResponse();
	
			const loginSpy = jest.spyOn(UserService, 'login');
			loginSpy.mockRejectedValueOnce("Phone Number or Password Incorrect");
			try {
				await UserController.login(req, res, mockNext);
			} catch(e) {
				expect(loginSpy).toBeCalledWith({
					phone: '09283748393',
					password: 'thisisapassword',
				});
				expect(e).toEqual('Phone Number or Password Incorrect')
		
				expect(res.json).toBeCalledTimes(0);
			}
	
		});	
	});
	describe('Get User Details', () => {
		beforeEach(()=>{
			jest.clearAllMocks()
		})
		it('fetched user details successful', async () => {
			const req = mockRequest({
				body: {
					user_id: '1'
				}
			});
			const res = mockResponse();
			const userSpy = jest.spyOn(UserService, 'fetchUser');
			userSpy.mockResolvedValueOnce({
				firstname: "Precious Kings",
				lastname: "Kings",
				email: "proxy12@gmail.com",
				account_number: "7216526944",
				current_balance: 0
			});
			await UserController.getUserByAccountNumber(req, res, mockNext);
			expect(res.status).toBeCalledWith(200);
			expect(userSpy).toBeCalledWith({
				user_id: '1'
			});
			expect(res.json).toBeCalledWith({
				firstname: "Precious Kings",
				lastname: "Kings",
				email: "proxy12@gmail.com",
				account_number: "7216526944",
				current_balance: 0
			});
		});

		it('fails if user doest exist', async () => {
			const req = mockRequest({
				body: {
					user_id: '09283748393',
				}
			});
			const res = mockResponse();
	
			const userSpy = jest.spyOn(UserService, 'fetchUser');
			userSpy.mockRejectedValueOnce("User Not Found");
			try {
				await UserController.getUserByAccountNumber(req, res, mockNext);
			} catch(e) {
				expect(userSpy).toBeCalledWith({
					user_id: '09283748393',
				});
				expect(e).toEqual("User Not Found")
		
				expect(res.json).toBeCalledTimes(0);
			}
	
		});	
	});
})
