const users = require('../model/userModel')
exports.getUsers = async (req, res) => {
    try {
        const userlist = await users.find()
        if (userlist) {
            res.status(200).json(userlist)
        }
        else {
            res.status(400).json("No users added")
        }
    }
    catch (err) {
        res.status(401).json("get users api not working")
    }
}

exports.registerUser = async (req, res) => {
    const { name, email, age } = req.body
    try {
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            res.status(400).json("user already exists")
        }
        else {
            const newUser = new users({
                name, email, age
            })
            await newUser.save()
            res.status(200).json(`${name} is registered`)
        }
    }
    catch (err) {
        res.status(401).json("register api not working")
    }
}
exports.changeUser = async (req, res) => {
    const { name, age, email } = req.body

    const { _id } = req.params
    try {
        const existingUser = await users.findOne({_id:_id})
        if (existingUser) {

            existingUser.name = name
            existingUser.age = age
            existingUser.email = email
            await existingUser.save()
            res.status(200).json("user updated")
        }
        else {
            res.status(400).json("user not found")

        }
    }
    catch (err) {
        res.status(401).json(`update API not working ${err}`)
    }
}

exports.deleteUser=async(req,res)=>{
    
    try{
        await users.deleteOne({_id:req.params.id})
        res.status(200).json("user deleted")

    }
    catch(err){
        res.status(401).json("Delete API not working")
    }
}
   
