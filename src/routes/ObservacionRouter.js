import {Router} from 'express'
import passport from 'passport';
const router = Router()
import {
    crearForm, 
    crear, 
    editarForm, 
    editar, eliminar} from '../controllers/ObservacionController.js'

//router.get('/', index)
router.get('/crear', crearForm)
router.post('/crear', crear)
router.get('/editar/:id', editarForm)
router.post('/editar/:id', editar)
router.post('/eliminar/:id', eliminar)

export default router
