
import * as jwt from 'jsonwebtoken'
import { Secret, JwtPayload }  from 'jsonwebtoken'
import * as bcrypt from 'bcrypt'
import {v4 as uuid} from 'uuid'
const SECRET_KEY = `${process.env.JWT_SECRET}`


export const GenerateSignature = async (payload: any) => {
    return await jwt.sign(payload, SECRET_KEY, { expiresIn: '1d'} )
}
export const GenerateAccountNumber = async () => {
    const number = uuid().replace(/-/g, '')
    let account_number = (number.replace(/\D/g, '') ).substring(0, 10)
    return number
}
export const HashPassword  = async (password: any) => {
    const salt = bcrypt.genSaltSync(10)
    const userPassword = bcrypt.hash(password, salt)
    return userPassword
}
export const validatePassword = async (password: any, savedPassword: any)=>{
    const validatePassword = bcrypt.compareSync(password, savedPassword)
    if(!validatePassword) return false
    return true
    
}
