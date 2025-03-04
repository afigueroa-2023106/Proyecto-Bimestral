'use stric'

import User from './user.model.js'

export const getAll = async(req,res)=>{
    try{
        const { limit = 20, skip = 0 } = req.query
        const users = await User.find()
            .skip(skip)
            .limit(limit)
            
        if(users.length === 0){
            return res.status(404).send(
                {
                    success: false,
                    message: 'Users not found'
                }
            )
        }
        return res.send(
            {
                success: true,
                message: 'Users found:', 
                users
            }   
        )
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'General error', err})
    }
}

export const get = async(req, res)=>{
    try {
        let { id } = req.params
        let user = await User.findById(id)

        if(!user) return res.status(404).send(
            {
                success: false,
                message: 'User not found'
            }
        )
        return res.send(
            {
                success: true,
                message: 'User found: ', 
                user
            }
        )
    } catch (err) {
        console.error('General error', err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error', 
                err
            }
        )
    }
}

export const update = async (req, res) => {
    try {
        const loggedUser  = {
            uid: req.user.uid,
            username: req.user.username,
            name: req.user.name,
            role: req.user.role
        }

        const data = req.body

        
        const updatedUser  = await User.findByIdAndUpdate(
            loggedUser .uid,
            data,
            { new: true }
        )

        if (!updatedUser ) {
            return res.status(404).send(
                {
                    success: false,
                    message: 'User  not found'
                }
            )
        }

        return res.send(
               {
                success: true,
                message: 'User  updated',
                user: updatedUser 
                }
        )
    } catch (err) {
        console.error('General error', err)
        return res.status(500).send({
            success: false,
            message: 'General error',
            err
        })
    }
}