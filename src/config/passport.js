import passport from 'passport'
import local from 'passport-local'
import jwt from 'passport-jwt'
//import crypto from 'crypto'
const localStrategy = local.Strategy
const JWTStrategy = jwt.Strategy
const ExtractJWT = jwt.ExtractJwt
import SesionService from '../services/SesionService.js'
import { isValidPassword,createHash } from '../utils.js'
const Sesion = new SesionService()
const initializePassport = () => {

    passport.use(new localStrategy({usernameField:'email'},async (email,password,done) => {
        try {
            const usuario = await Sesion.buscarUsuarioPorCorreo(email)
           // console.log(await createHash('12345'))
            if(!usuario){
                return done(null,false)
            }
            if(!await isValidPassword(usuario.PASSWORD_USUARIO,password)){
                return done(null,false)
            }
            return done(null,usuario)
        } catch (err) {
            return done(`Error al obtener el usuario: ${err}`)
        }
    }))

    const cookieExtractor = req => {
        let token = null
        if(req && req.cookies){
            token = req.cookies['cookieToken']
        }
        return token
    }

    passport.use('jwt',new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey:'55a1d5f0e8bc2c0f4e5f67e83e14ab981d79fcfeb9d53ec3eed11252ddfbf10c'
    },async(jwt_payload,done) => {
        try {
            //Obtengo el id del cliente desde la cookie
            const {ID_USUARIO} = jwt_payload.user
            //Por si el usuario ha sufrido cambios
            const user = await Sesion.buscarUsuarioPorId(ID_USUARIO)
            return done(null,user)
        } catch (err) {
            return done(err)
        }
    }))

    passport.serializeUser(async (usuario,done) => {
        done(null,usuario.ID_USUARIO)
    })

    passport.deserializeUser(async (id,done) => {
        const usuario = await Sesion.buscarUsuarioPorId(id)
        done(null,usuario)
    })

}
export default initializePassport