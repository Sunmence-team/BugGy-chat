import mongoose from 'mongoose'
import colors from 'colors'

import dotenv from 'dotenv'

//dotenv configuration
dotenv.config()

const connectdB = async () =>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`connected to database on host ${conn.connection.host}`.bgYellow);
    }catch(error){
        console.log(`the error is ${error}`.bgRed)
    }
}

export default connectdB