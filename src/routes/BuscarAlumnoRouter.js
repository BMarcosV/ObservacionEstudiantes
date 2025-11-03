import {Router} from 'express'
import passport from 'passport';
const router = Router()
import {
    index,
    viewBuscarAlumno,
    observacion
} from '../controllers/BuscarAlumnoController.js'

const auth = passport.authenticate('jwt',{session:false})


router.post('/',auth, index)
    router.get('/observacion',auth, observacion)
    router.get('/alumno',auth, viewBuscarAlumno)

export default router