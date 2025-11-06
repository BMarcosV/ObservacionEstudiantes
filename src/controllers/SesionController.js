import SesionService from '../services/SesionService.js'
import { generateToken } from '../utils.js'
const Sesion = new SesionService()

const index = async(req,res) => {
    try {
        res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.set('Pragma', 'no-cache');
        res.set('Expires', '0');
        return res.render('sesion/index',{
            layout: 'sesion',
            title: 'Iniciar Sesion'
        })
    } catch (error) {

    }
}

const nopermitido = async(req,res) => {
    try {
        return res.status(300).send({status:false,message:'Usuario no encontrado'})
    } catch (error) {
         console.log(error.message)
    }
}

const login = async(req,res) => {
    if(!req.user)
        return res.status(400).send({status:false,message:'Credenciales invalidas'})
    const token = generateToken(req.user)
    return res.cookie('cookieToken',token,{
        maxAge:60*60*1000,
        httpOnly:true,
        secure:true,
        sameSite: 'strict'
    }).send({status:true,message:'ok'})
}

const logout = async(req,res) => {
    try {
        req.logout((err) => {
            if (err) {
                console.log(err);
                return res.status(500).send({status:false,message:'Error al cerrar sesión'})
            }
            res.clearCookie('cookieToken')
            res.redirect('/')
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).send({status:false,message:'Error interno'})
    }
}

export {index,login,nopermitido,logout}
