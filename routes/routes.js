const express=require('express')
const router= new express.Router()
const user=require('../controles/userLogic')

router.get('/user/viewdetails',user.getUsers)
router.post('/user/adduser',user.registerUser)
router.put('/user/edituser/:_id',user.changeUser)
router.delete('/user/delete/:id',user.deleteUser)

module.exports=router