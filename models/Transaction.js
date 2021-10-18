const mongoose = require('mongoose')

const TransactionSchema = new mongoose.Schema({
  text: {
    type: String,
    // trim any white sapce
    trim: true,
    //make it required and pass message if it doesn't follow the rule
    required: [true, 'Please add some text']
  },
  amount: {
    type: Number,
    required: [true, 'Please add a positive or negative number ']
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
})

// The first argument is the singular name of the collection your
// model is for. Mongoose automatically looks for the plural,
//lowercased version of your model name. Thus, for the example
//above, the model Tank is for the tanks collection in the database.
module.exports = mongoose.model('Transaction', TransactionSchema)
