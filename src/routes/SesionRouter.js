import {Router} from 'express'
import passport from 'passport';
import argon2 from 'argon2'
const router = Router()
import {index,nopermitido,login} from '../controllers/SesionController.js' 

router.get('/',index)

router.get('/nopermitido',nopermitido)

router.get('/success',login)

router.get('/argon',async(req,res)=>{
    console.log(await argon2.hash('12345'))
})

router.post('/login',passport.authenticate('local',{
        successRedirect:'/success',
        failureRedirect:'/nopermitido'
    }
))

export default router