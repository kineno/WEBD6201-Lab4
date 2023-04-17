import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String
})

export const User = mongoose.model('User', userSchema);

mongoose.connect('mongodb+srv://kinen:123456abc@cluster0.qln9tjx.mongodb.net/?retryWrites=true&w=majority')
.then(()=>{
    console.log('Connected to mongo')
})
.catch(()=>{
    console.log('faild to connect to mongo')
})
