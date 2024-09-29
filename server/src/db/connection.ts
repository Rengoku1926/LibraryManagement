import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectToDB = async() => {
    console.log("Logic entered connectToDB ")
    try {
        const dbConnected = await mongoose.connect(process.env.MONGODB_URI!, {
        })
        if(dbConnected){
            console.log("MongoDB connected : ")
        }else{
            console.log("Error ! dbConnected : ",dbConnected)
        }
    } catch (error) {
        console.log("Error while connecting to DataBase : ", error)
        process.exit(1);
    }
}

export default connectToDB;