import { AccountModel } from "../model/account.model";
import { Transaction, TransactionModel } from "../model/transaction.model";
import Util from '../utils/utilities'
export default class TransactionService {
    static async deposit(trxDetails: Transaction){
        trxDetails.trx_ref = await Util.generateRefernce()
        //check balance 
        const account =  await AccountModel.balance(trxDetails.user_id)
        if(!account) return Promise.reject("Account Does Not Exist")
        //calculate new account balance 
        const newBalance = account.current_balance + trxDetails.amount
        // update account balance
        await AccountModel.updateAccountBalance( newBalance, trxDetails)
        const transaction = await TransactionModel.createTransaction(trxDetails)

        return transaction
    }
    static async withdraw(trxDetails: Transaction){
        trxDetails.trx_ref = await Util.generateRefernce()
        //check balance 
        const account =  await AccountModel.balance(trxDetails.user_id)
        if(!account) return Promise.reject("Account Does Not Exist")
        //check if fund is sufficient
        if(account.current_balance < trxDetails.amount) return Promise.reject("Insufficient Funds")
        //calculate new account balance 
        const newBalance = account.current_balance - trxDetails.amount
        // update account balance
        await AccountModel.updateAccountBalance( newBalance, trxDetails)
        const transaction = await TransactionModel.createTransaction(trxDetails)
        return transaction
    }
    static async transfer(trxDetails: Transaction){
        //check balance 
        trxDetails.trx_ref = await Util.generateRefernce()
        const account =  await AccountModel.Balance(trxDetails.sender)
        if(!account) return Promise.reject("Account Does Not Exist")
        //confirm account details for transfer
        const acct = await AccountModel.confirmAccount(trxDetails.receiver)
        //calculate new sender account balance 
        const senderNewBalance = account.current_balance - trxDetails.amount
        // update account balance
        await AccountModel.updateAccountBalance( senderNewBalance, trxDetails)
         //calculate new sender account balance 
        const receiverNewBalance = acct.current_balance + trxDetails.amount
         // update account balance
        await AccountModel.updateAccountBalance( receiverNewBalance, trxDetails)
        const transaction = await TransactionModel.TransferTransaction(trxDetails)
        console.log(transaction)
        return transaction
    }
}
