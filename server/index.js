import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import bodyParser from 'body-parser'
import Connection from './database/db.js'
import router from './routes/route.js'

//Start Express App
const app = express()

const PORT = process.env.PORT || 8000

dotenv.config()

app.use(cors())
app.use(bodyParser.json({extended : true}))
app.use(bodyParser.urlencoded({extended : true}))
app.use("/" , router)

const USER = process.env.DB_USER
const PASSWORD = process.env.DB_PASSWORD

app.listen(PORT , (err) => {
    if(!err) console.log(`Server is running on port : ${PORT}`)
    else console.log(err.message)
})

const URL = process.env.MONGODB_URI || `mongodb+srv://${USER}:${PASSWORD}@blog-database.rvmhavn.mongodb.net/?retryWrites=true&w=majority`

//Making Db Connection
Connection(URL)