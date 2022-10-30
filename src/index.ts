import * as dotenv from 'dotenv'
import app from './server'
import connectDB from './database'
dotenv.config();
const port = process.env.PORT || 3500
    
    app.listen(port, async ()=>{
        await connectDB()
        console.log(`Listening to port ${port}`)
    });

    

