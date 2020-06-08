const express = require('express')
const knexDb = require("../data/dbConfig.js");

const router = express.Router()

//GETs
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

router.get('/:id', (req, res) => {
     const accountId = req.params.id 
     knexDb
          .select('*')
          .from('accounts')
          .where({
               id: accountId
          })
          .then(account => {
               res.status(200).json({
                    data: account
               })
          })
          .catch(err => {
               console.log('GET / error', err)
               res.status(500).json({
                    error: err,
                    message: 'Error retrieving account'
               })
          })
})

//POSTs
router.post(
     '/',
     requiredProperty('name'),
     requiredProperty('budget'),
     (req, res) => {
          //always validate data coming from the client before calling the database
          //NEVER TRUST THE CLIENT
          const newAccount = req.body
          knexDb('accounts')
          .insert(newAccount, 'id')
          .then(([id]) => {
               res.status(201).json({newAccountId: id})
          })
          .catch(err => {
               console.log('POST / error', err)
               res.status(500).json({ message: err.message })
          })
     }
)

router.put(
     '/:id',
     requiredProperty('name'),
     requiredProperty('budget'),
     (req, res) => {
          const { id } = req.params
          const updatedAccount = req.body
          knexDb('accounts')
          .where({ id: id })
          .update(updatedAccount)
          .then(count => {
               if(count === 1){
                    res.status(200).json({
                         message: 'Account updated!',
                         numberOfAccountsUpdated: count
                    })
               } else {
                    res.status(404).json({
                         message: 'Account could not be updated, double-check for a valid ID and properties'
                    })
               }
          })
          .catch(err => {
               console.log('PUT / error', err)
               res.status(500).json({
                    message: err.message
               })
          })
     }
)

//middleware
   function requiredProperty(property) {
     return function(req, res, next){
       if(!req.body[property]) {
         res.status(400).json({ message: `Needs to have a ${property} property` })
       } else {
         next()
       }
     }
   }



module.exports = router