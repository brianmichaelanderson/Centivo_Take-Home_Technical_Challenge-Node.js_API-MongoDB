const mongoose = require('mongoose');
const User = require('../models/User');
const router = require('express').Router();

// GET /users/:id
router.get('/:id', async(req, res, next) => {
    try{
        const { id } = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({error: 'Invalid user ID'});
        }
        const user = await User.findOne({
            _id: id,
            age: { $gt: 21 }  // Only return if age is > 21 
        })
        if(!user) {
            return res.status(404).json({ error: 'User not found or is 21 or younger'});
        }
        res.json(user); // send user data
    } catch(error){
        console.error('Error fetching user by ID: ', error);
        next(error); // Pass to global error handler
    }
})

module.exports = router;