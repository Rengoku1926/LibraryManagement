import app from "./app";
import dotenv from "dotenv";
import connectToDB from "./db/connection";

dotenv.config();

const startServer = async() => {
    const port = process.env.PORT || 5000;
    await connectToDB();

    app.listen(port ,() => {
        console.log("Server running on port : ",port)
    })
}

startServer();