import { AccountModel } from "../model/account.model";
import { Transaction, TransactionModel } from "../model/transaction.model";
import { User } from "../model/user.model";
export default class TransactionService {
    static async Deposit(trxDetails: Transaction){
        //check balance 
        const account =  await AccountModel.Balance(trxDetails.user_id)
        if(!account) return Promise.reject("Account Does Not Exist")
        //calculate new account balance 
        const newBalance = account.current_balance + trxDetails.amount
        // update account balance
        await AccountModel.UpdateAccountBalance( newBalance, trxDetails)
        const transaction = await TransactionModel.CreateTransaction(trxDetails)

        return transaction
    }
    static async Withdraw(trxDetails: Transaction){
        //check balance 
        const account =  await AccountModel.Balance(trxDetails.user_id)
        if(!account) return Promise.reject("Account Does Not Exist")
        //check if fund is sufficient
        if(account.current_balance < trxDetails.amount) return Promise.reject("Insufficient Funds")
        //calculate new account balance 
        const newBalance = account.current_balance - trxDetails.amount
        // update account balance
        await AccountModel.UpdateAccountBalance( newBalance, trxDetails)
        const transaction = await TransactionModel.CreateTransaction(trxDetails)
        return transaction
    }
    static async Transfer(trxDetails: Transaction){
        //check balance 
        const account =  await AccountModel.Balance(trxDetails.sender)
        if(!account) return Promise.reject("Account Does Not Exist")
        //confirm account details for transfer
        const acct = await AccountModel.ConfirmAccount(trxDetails.receiver)
        //calculate new sender account balance 
        const senderNewBalance = account.current_balance - trxDetails.amount
        // update account balance
        await AccountModel.UpdateAccountBalance( senderNewBalance, trxDetails)
         //calculate new sender account balance 
        const receiverNewBalance = acct.current_balance + trxDetails.amount
         // update account balance
        await AccountModel.UpdateAccountBalance( receiverNewBalance, trxDetails)
        const transaction = await TransactionModel.TransferTransaction(trxDetails)
        console.log(transaction)
        return transaction
    }
}
