
import * as jwt from 'jsonwebtoken'
import * as bcrypt from 'bcrypt'
import {v4 as uuid} from 'uuid'
const SECRET_KEY = `${process.env.JWT_SECRET}`

export default {
    generateSignature: async (payload: any) => {
        return jwt.sign(payload, SECRET_KEY, { expiresIn: '1d'} )
    },
    generateAccountNumber: async () => {
        const number = uuid().replace(/-/g, '')
        let account_number = (number.replace(/\D/g, '') ).substring(0, 10)
        return account_number
    },
    generateRefernce: async () => {
        const trx_ref = uuid().replace(/-/g, '').substring(0, 14)
        return trx_ref
    },

    hashPassword: async (password: any) => {
        const salt = bcrypt.genSaltSync(10)
        const userPassword = bcrypt.hash(password, salt)
        return userPassword
    },
    validatePassword: async (password: any, savedPassword: any)=>{
        const validatePassword = bcrypt.compareSync(password, savedPassword)
        if(!validatePassword) return false
        return true
        
    }
}