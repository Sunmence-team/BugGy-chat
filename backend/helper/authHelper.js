import  bcrypt from 'bcrypt'


//hash password
export const hashedPassword = async (password) => {
    try {
        const saltRound = 10;
        const hashedPassword = await bcrypt.hash(password, saltRound)
        return hashedPassword
    } catch (error) {
        console.log(error);       
    }
}


//compare password
export const comparePassword = async (password, hashedPassword)=>{
    return bcrypt.compare(password, hashedPassword)
}
