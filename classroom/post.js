const express = require('express')
const router = express.Router();

//create new
router.post('/',(req,res)=>{
    res.send('All creation')
})
//update
router.put('/:id',(req,res)=>{
    res.send('All update')
})
//delete
router.delete('/:id',(req,res)=>{
    res.send('All delete')
})
module.exports = router;