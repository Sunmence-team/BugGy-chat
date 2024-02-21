import {  comparePassword, hashedPassword } from "../helper/authHelper.js";
import userModels from "../models/userModels.js";
import jwt from 'jsonwebtoken';



export const registerController = async (req, res)=>{
    try {
        const {name, email, password, phone, address} = req.body

        if(!name){
            return req.send("please include your name")
        }
        if(!email){
            return req.send("please include your email")
        }
        if(!password){
            return req.send("please include your password")
        }
        // if(!phone){
        //     return req.send("please include your phone")
        // }
        // if(!address){
        //     return req.send("please include your address")
        // }

        const hashPassword = await hashedPassword(password)

        const existingUser = await userModels.findOne({email})
        if(existingUser){
            return res.status(201). send({
                success:false,
                msg: "already registered email....log in or input another email"
            })
        }
        const users = await new userModels({name, email, password : hashPassword }).save()
        res.status(200).send({
            success : true,
            message: "registered!!, you can now log in",
            users
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message : "Error in registration",
            error
        })
    }
}

export const loginController = async (req, res)=>{
    try{
        const {email, password} = req.body
        if(!email || !password){
            res.status(201).send({
                success : false,
                message : "incorrect password or email"
            })
        }
        const user = await userModels.findOne({email})
        if(!user){
            res.status(201).send({
                success : false,
                message : "you have not registered... please do"
            })
        }

        const match = await comparePassword(password, user.password)
            if(!match){
                res.status(201).send({
                    success : false,
                    message: "incorrect password"
                })
            }
            const token = await jwt.sign({_id:user._id}, process.env.JWT_SECRET, {expiresIn : "7d"})
            res.status(200).send({
                    success: true,
                    message : "you are successfully logged in",
                    user : {
                        name : user.name,
                        email : user.email,
                        phone : user.phone,
                        address : user.address
                    },
                    token
            })

    }
    catch(error){
        console.log(error);
    }
}

//test
export const testController = async (req, res)=>{
    res.send("welcome to the dashboard")
}