import {Router} from 'express'
import passport from 'passport';
const router = Router()
import {index, crear, actualizar, eliminar} from '../controllers/EstudianteController.js'


router.get('/',index)
router.post('/', crear)
router.put('/:id', actualizar)
router.delete('/:id', eliminar)

export default router
