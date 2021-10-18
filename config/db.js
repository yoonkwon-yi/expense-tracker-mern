//used to connect to db

const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {})

    console.log(
      `MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold
    )
  } catch (error) {
    console.log(`${error.message}`.red)

    //exit with failture
    //applciation to shut down
    process.exit(1)
  }
}

module.exports = connectDB
