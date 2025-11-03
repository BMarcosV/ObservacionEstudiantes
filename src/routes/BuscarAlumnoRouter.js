import {Router} from 'express'
import passport from 'passport';
const router = Router()
import {index,viewBuscarAlumno} from '../controllers/BuscarAlumnoController.js'


router.post('/',passport.authenticate('jwt',{session:false}),index)

router.get('/',passport.authenticate('jwt',{session:false}),viewBuscarAlumno)

export default router