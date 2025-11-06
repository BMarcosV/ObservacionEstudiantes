import {Router} from 'express'
import passport from 'passport';
const router = Router()
import {index} from '../controllers/apoderadosController.js'


router.get('/',index)

export default router