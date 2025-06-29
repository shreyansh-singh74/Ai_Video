import mongoose from 'mongoose'

const MONOGODB_URI = process.env.MONGODB_URI!

if(!MONOGODB_URI){
    throw new Error("Please define mongo_uri in env variables");
}

let cached = global.mongoose;

if(!cached){
    global.mongoose = {conn:null,promise:null}
}

export async function connectToDatabase(){
    if(cached.conn){
        return cached.conn;
    }
    if(!cached.promise){
        const opts = {
            bufferCommands:true,
            maxPoolSize:10
        }
        mongoose
        .connect(MONOGODB_URI,opts)
        .then(()=> mongoose.connection)
    }
    try{
        cached.conn = await cached.promise
    }
    catch(error){
        cached.promise = null;
        throw error;
    }
    return cached.conn;
}