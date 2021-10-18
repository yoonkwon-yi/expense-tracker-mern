const express = require('express')

const router = express.Router()

const {
  getTransactions,
  addTransactions,
  deleteTransactions
} = require('../controllers/transactions')

// router.get('/', (req, res) => res.send('Hellow'))

//get adn add function from controllers
router
  .route('/')
  .get(getTransactions)
  .post(addTransactions)

//use deleteTransaction fucntion from controller
router.route('/:id').delete(deleteTransactions)

module.exports = router
