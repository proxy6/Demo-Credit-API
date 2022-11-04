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
})