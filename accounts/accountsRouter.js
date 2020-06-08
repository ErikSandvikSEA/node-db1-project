const express = require('express')
const knexDb = require("../data/dbConfig.js");

const router = express.Router()

router.get('/', (req, res) => {
     //get a list of all the accounts ins the 'accounts' table
     //select * from accounts
     knexDb
          .select('*')
          .from('accounts')
          .then(accounts => {
               res.status(200).json({
                    data: accounts
               })
          })
          .catch(err => {
               console.log( "GET / error", err)
               res.status(500).json({
                    message: err.message
               })
          })
})



module.exports = router