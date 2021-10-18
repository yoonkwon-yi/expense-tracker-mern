//this is a Mongoose data object we can call many mongoose function on it
const Transaction = require('../models/Transaction')

// @desc Get all transactions -- what it does
// @route GET /api/v1/transactions --- route that is connected to
// @access Public -- since wed on't have any authentication

//exporting functions! (multiple of them)
exports.getTransactions = async (req, res, next) => {
  // res.send('GET transactions')
  try {
    const transactions = await Transaction.find()

    return res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    })
  }
}

// @desc Add  transaction
// #route POST /api/v1/transactions
// @access Public

exports.addTransactions = async (req, res, next) => {
  try {
    console.log(req.body)
    const { text, amount } = req.body
    const transaction = await Transaction.create(req.body)
    return res.status(201).json({ success: true, data: transaction })
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message)

      return res.status(400).json({
        success: false,
        error: messages
      })
    } else {
      return res.status(500).json({
        success: false,
        error: 'Server Error'
      })
    }
    // console.log(error)
  }

  // res.send('POST transactions')
}

// @desc Delete  transaction
// #route DELETE /api/v1/transactions/:id
// @access Public

exports.deleteTransactions = async (req, res, next) => {
  try {
    const transaction = await Transaction.findById(req.params.id)

    if (!transaction) {
      return res.status(404).json({
        success: false,
        error: 'No transaction found'
      })
    }

    await transaction.remove()

    return res.status(200).json({
      success: true,
      data: {}
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    })
  } // res.send('DELETE transactions')
}
