import * as dotenv from 'dotenv'
import app from './server'
import connectDB from './database'
dotenv.config();
const port = process.env.PORT || 3500
connectDB().then(()=>{
    app.listen(port, async ()=>{
        console.log(`Listening to port ${port}`)
    });
})
    

