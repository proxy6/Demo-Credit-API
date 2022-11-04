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
        await AccountModel.updateAccountBalance( newBalance, trxDetails.user_id)
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
        await AccountModel.updateAccountBalance( newBalance, trxDetails.user_id)
        const transaction = await TransactionModel.createTransaction(trxDetails)
        return transaction
    }
    static async transfer(trxDetails: Transaction){
        //check balance 
        trxDetails.trx_ref = await Util.generateRefernce()
        const senderAccount =  await AccountModel.balance(trxDetails.sender)
        if(!senderAccount) return Promise.reject("Account Does Not Exists")
        //check for sufficient fund
        if(senderAccount.current_balance < trxDetails.amount) return Promise.reject("Insufficient Funds")
        //confirm  receiver account details for transfer
        const receiverAccount = await AccountModel.confirmAccount(trxDetails.receiver)
        if(!receiverAccount) return Promise.reject("Account Does Not Exists")
        //calculate new sender account balance 
        const senderNewBalance = senderAccount.current_balance - trxDetails.amount
        //calculate new sender account balance 
        const receiverNewBalance = receiverAccount.current_balance + trxDetails.amount
        // update account balance
        await AccountModel.updateAccountBalance( senderNewBalance, trxDetails.sender)
        await AccountModel.updateAccountBalance( receiverNewBalance, trxDetails.receiver)
        const transaction = await TransactionModel.transferTransaction(trxDetails)
        return transaction
    }
}
