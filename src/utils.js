import { fileURLToPath } from 'url'
import { dirname } from 'path'
import argon2 from 'argon2'
import jwt from 'jsonwebtoken'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)


export const createHash = (password) => argon2.hash(password)
export const isValidPassword = (hash,password) => argon2.verify(hash,password)

export const generateToken = (user) => {
  //crypto.randomBytes(32).toString('hex')
    return jwt.sign({user},'55a1d5f0e8bc2c0f4e5f67e83e14ab981d79fcfeb9d53ec3eed11252ddfbf10c',{/*algorithm: 'RS256',*/ expiresIn: '1h'})
}

export const verifyToken = (token) => {
    try {
        return jwt.verify(token, '55a1d5f0e8bc2c0f4e5f67e83e14ab981d79fcfeb9d53ec3eed11252ddfbf10c')
      } catch(error) {
        console.log(error)
      }
}

export default __dirname


