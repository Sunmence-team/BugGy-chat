import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import userModels from '../models/userModels.js'

dotenv.config()
export const signInController = async (req,res,next)=>{
    try {
        const authHeader = req.headers.authorization 
        const decode = await jwt.verify(authHeader, process.env.JWT_SECRET)
        req.user = decode
        next()
        
    } catch (error) {
        console.log(error)
    }
}
export const isAdmin = async (req, res, next)=>{
    try{
        const user = await userModels.findById(req.user._id)
        if(user.role !== 1){
            return res.status(201).send({
                success : false,
                message : "unauthorized users"
            })
        }else{
            next()
        }
    }catch(error){
        console.log(error);
    }
}