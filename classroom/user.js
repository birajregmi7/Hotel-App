const express = require('express')
const router = express.Router();


//show route
router.get('/user',(req,res)=>{
    res.send('All showings')
})
//create new
router.post('/',(req,res)=>{
    res.send('All showings')
})
//update
router.put('/:id',(req,res)=>{
    res.send('All showings')
})
//delete
router.delete('/user/:id',(req,res)=>{
    res.send('All showings')
})

//show route
router.get('/',(req,res)=>{
    res.send('All showings')
})

module.exports = router;