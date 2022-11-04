import * as dotenv from 'dotenv'
dotenv.config();
import { mockNext, mockRequest, mockResponse } from '../__mocks__/http';
import TransactionController  from './transaction.controller';
import TransactionService from '../service/transaction.service'

describe("Transaction Controller", ()=>{
    describe("Deposit", ()=>{
        beforeEach(()=>{
			jest.clearAllMocks()
		})
        it("can deposit successfully", async ()=>{
            const req =  mockRequest({
                body: {
                    amount: 1000,
                    user_id: 1,
                    type: "Credit"
                }
            })
            const res = mockResponse()
            const depositSpy = jest.spyOn(TransactionService, 'deposit')
            depositSpy.mockResolvedValue({
                    user_id: "1",
                    amount: 10000,
                    type: "Credit",
                    trx_ref: "fb9355fb631546",
                    id: 1
            })
            await TransactionController.deposit(req, res, mockNext)
            expect(res.status).toBeCalledWith(201)
            expect(depositSpy).toBeCalledWith({
                amount: 1000,
                user_id: 1,
                type: "Credit"
            })
            expect(res.json).toBeCalledWith({
                data: {
                    user_id: "1",
                    amount: 10000,
                    type: "Credit",
                    trx_ref: "fb9355fb631546",
                    id: 1
                },
                message: "Deposit Successful"
            })
        })
    
    })
    describe("Withdraw", ()=>{
        beforeEach(()=>{
			jest.clearAllMocks()
		})
        it("can withdraw successfully", async ()=>{
            const req =  mockRequest({
                body: {
                    amount: 1000,
                    user_id: 1,
                    type: "Debit"
                }
            })
            const res = mockResponse()
            const withdrawSpy = jest.spyOn(TransactionService, 'withdraw')
            withdrawSpy.mockResolvedValue({
                    user_id: "1",
                    amount: 10000,
                    type: "Debit",
                    trx_ref: "fb935785fb631546",
                    id: 12
            })
            await TransactionController.withdraw(req, res, mockNext)
            expect(res.status).toBeCalledWith(201)
            expect(withdrawSpy).toBeCalledWith({
                amount: 1000,
                user_id: 1,
                type: "Debit"
            })
            expect(res.json).toBeCalledWith({
                data: {
                    user_id: "1",
                    amount: 10000,
                    type: "Debit",
                    trx_ref: "fb935785fb631546",
                    id: 12
                },
                message: "Withdraw Successful"
            })
        })
        it("withdraw fails if balance is insufficient", async ()=>{
            const req =  mockRequest({
                body: {
                    amount: 1000,
                    user_id: 1,
                    type: "Debit"
                }
            })
            const res = mockResponse()
            const withdrawSpy = jest.spyOn(TransactionService, 'withdraw')
            withdrawSpy.mockRejectedValueOnce("Insufficient Funds")
            try{
                await TransactionController.withdraw(req, res, mockNext)
            }catch(e){
                expect(withdrawSpy).toBeCalledWith({
                    amount: 1000,
                    user_id: 1,
                    type: "Debit"
                })
                expect(e).toEqual("Insufficient Funds")
                expect(res.json).toBeCalledTimes(0);
            }
        })
    
    })
    describe("Transfer", ()=>{
        beforeEach(()=>{
			jest.clearAllMocks()
		})  
        it("can transfer successfully", async ()=>{
            const req =  mockRequest({
                body: {
                    amount: 100.00,
                    sender: "1",
                    receiver: "2"
                }
            })
            const res = mockResponse()
            const transferSpy = jest.spyOn(TransactionService, 'transfer')
            transferSpy.mockResolvedValue({
                    sender: "1",
                    receiver: "2",
                    amount: 100,
                    trx_ref: "610ea0d6db024e",
                    id: 5,
            })
            await TransactionController.transfer(req, res, mockNext)
            expect(res.status).toBeCalledWith(201)
            expect(transferSpy).toBeCalledWith({
                amount: 100.00,
                sender: "1",
                receiver: "2"
            })
            expect(res.json).toBeCalledWith({
                data:{
                    amount: 100,
                    id: 5,
                    receiver: "2",
                    sender: "1",
                    trx_ref: "610ea0d6db024e",
                },
                message: "Transfer Successful",
            })  
        })
        it("transfer fails if balance is insufficient", async ()=>{
            const req =  mockRequest({
                body: {
                    amount: 100.00,
                    sender: "1",
                    receiver: "2"
                }
            })
            const res = mockResponse()
            const transferSpy = jest.spyOn(TransactionService, 'transfer')
            transferSpy.mockRejectedValueOnce("Insufficient Funds")
            try{
                await TransactionController.transfer(req, res, mockNext)
            }catch(e){
                expect(transferSpy).toBeCalledWith({
                    amount: 100.00,
                    sender: "1",
                    receiver: "2"
                })
                expect(e).toEqual("Insufficient Funds")
                expect(res.json).toBeCalledTimes(0);
            }
        })
        it("transfer fails if account does not exist", async ()=>{
            const req =  mockRequest({
                body: {
                    amount: 100.00,
                    sender: "1",
                    receiver: "2"
                }
            })
            const res = mockResponse()
            const transferSpy = jest.spyOn(TransactionService, 'transfer')
            transferSpy.mockRejectedValueOnce("Account Does Not Exists")
            try{
                await TransactionController.transfer(req, res, mockNext)
            }catch(e){
                expect(transferSpy).toBeCalledWith({
                    amount: 100.00,
                    sender: "1",
                    receiver: "2"
                })
                expect(e).toEqual("Account Does Not Exists")
                expect(res.json).toBeCalledTimes(0);
            }
        })
    })
    
})