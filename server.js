const path = require('path')

const express = require('express')
//ALLOW us to create global variables for port, db etc.
const dotenv = require('dotenv')
//color in console
const colors = require('colors')
//logging in console
const morgan = require('morgan')

//import the connectDB function from db.js file
const connectDB = require('./config/db.js')

//setting "global vairable by using dotenv" -- env variable set up
dotenv.config({ path: './config/config.env' })

connectDB()

//get routes functions
const transactions = require('./routes/transaction')

//initilaize express app
const app = express()

//this line MUST come prior to many lines below
app.use(express.json())

// if (process.env.NODE_ENV === 'development') {
//   app.use(morgan('dev'))
// }

//MOUNT route
//when '/api/v1/transactions/ is attempted to accessed then transactions (./routes/trasnasction)
//file is first routed then the function in the code in transaction.js
app.use('/api/v1/transactions', transactions)

// app.get('/', (req, res) => res.send('Hello'))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  )
}

//access env variable that we set by using dotenv by using syntax "process.env"
const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)
