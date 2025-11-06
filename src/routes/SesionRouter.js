import {Router} from 'express'
import passport from 'passport';
import argon2 from 'argon2'
import { generateToken } from '../utils.js'
const router = Router()



import {index,nopermitido,login, cambiarContrasenaForm, cambiarContrasena, cambiarContrasenaNueva, olvideContrasenaForm, olvideContrasena, responderPregunta, nuevaContrasena, logout, registerForm, register} from '../controllers/SesionController.js'

router.get('/',index)

router.get('/nopermitido',nopermitido)

router.get('/success',login)

router.get('/argon',async(req,res)=>{
    console.log(await argon2.hash('12345'))
})

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res.status(500).send({status: false, message: 'Error interno del servidor'})
        }
        if (!user) {
            return res.status(400).send({status: false, message: 'Credenciales inválidas'})
        }
        req.logIn(user, (err) => {
            if (err) {
                return res.status(500).send({status: false, message: 'Error al iniciar sesión'})
            }
            const token = generateToken(user)
            return res.cookie('cookieToken', token, {
                maxAge: 60 * 60 * 1000,
                httpOnly: true,
                secure: true,
                sameSite: 'strict'
            }).send({status: true, message: 'ok'})
        })
    })(req, res, next)
})


router.get('/logout',logout)

router.get('/cambiar-contrasena', passport.authenticate('jwt', {session: false}), cambiarContrasenaForm)
router.post('/cambiar-contrasena', passport.authenticate('jwt', {session: false}), cambiarContrasena)
router.get('/cambiar-contrasena/nueva', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.render('sesion/cambiarContrasenaNueva', {
        layout: 'main',
        title: 'Nueva Contraseña'
    })
})
router.post('/cambiar-contrasena/nueva', passport.authenticate('jwt', {session: false}), cambiarContrasenaNueva)

router.get('/olvide-contrasena', olvideContrasenaForm)
router.post('/olvide-contrasena', olvideContrasena)
router.post('/responder-pregunta', responderPregunta)
router.post('/nueva-contrasena', nuevaContrasena)

router.get('/register', registerForm)
router.post('/register', register)

export default router
