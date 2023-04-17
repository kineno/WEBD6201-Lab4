// Student's Names: Manuel Lopez, Kinen Ocitti
// File Name: user.ts
// Date: 2023-04-16
import express from 'express'
import {User} from '../db'

const router = express.Router()

// GET users
router.post('/user/read', (req, res, next) => {
    User.findOne({email: req.body.email})
    .then((user)=>{
        if(user){
            res.send({...user})
        }else{
            res.send({err: "not found"})
        }
    }).catch((e)=>{
        console.log("error reading, ", e)
        res.send({err: "server error"})
    })

})

router.get('/users', (req, res, next) => {
    User.find()
    .then((user)=>{
        if(user){
            res.send({...user})
        }else{
            res.send({err: "not found"})
        }
    }).catch((e)=>{
        console.log("error reading, ", e)
        res.send({err: "server error"})
    })

})

router.post('/user/login', (req, res, next) => {
    User.findOne({email: req.body.email, password: req.body.password})
    .then((user)=>{
        if(user){
            res.send({...user})
        }else{
            res.send({err: "not found"})
        }
    }).catch((e)=>{
        console.log("error reading, ", e)
        res.send({err: "server error"})
    })

})

router.post('/user', (req, res, next)=>{
    console.log(req.body)
    const u = new User({...req.body})

    u.save()
    .then(()=>{
        console.log("saved")
        res.send({ok: "saved"})
    })
    .catch((e)=>{
        console.log("saved failed", e)
        res.send({err: "server error"})
    })


})


router.put('/user', (req, res, next)=>{
    console.log(req.body)
    const u = new User({...req.body})

    User.findOneAndUpdate({email: u.email}, {...req.body}, {new: true})
        .then((up)=>{
            if(up){
                console.log('updated')

                res.send({ok: "updated"})
            }else{
                console.log('updating user not found')
                res.send({err: "not found"})
            }
        })
        .catch((e)=>{
            console.log('Failed to update ', e)
        })
})



router.delete('/user', (req, res, next)=>{
    console.log(req.body)

    User.findOneAndDelete({email: req.body.email})
        .then((up)=>{
            if(up){
                console.log('deleted')

                res.send({ok: "deleted"})
            }else{
                console.log('delete user not found')

                res.send({err: "not found"})
            }

        })
        .catch((e)=>{
            console.log('Failed to delete ', e)

            res.send({err: "server error"})
        })


})

export default router