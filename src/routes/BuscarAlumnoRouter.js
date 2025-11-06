import {Router} from 'express'
import passport from 'passport';
const router = Router()
import {index,viewBuscarAlumno} from '../controllers/BuscarAlumnoController.js'


router.post('/',passport.authenticate('jwt',{session:false}),index)

router.get('/',passport.authenticate('jwt',{session:false}),viewBuscarAlumno)

router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            console.log(err);
            return res.status(500).send({status:false,message:'Error al cerrar sesión'})
        }
        res.clearCookie('cookieToken')
        res.redirect('/')
    })
})

export default router
