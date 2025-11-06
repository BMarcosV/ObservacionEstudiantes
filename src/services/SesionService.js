import config from '../config/config.js'
import knex from 'knex'
export default class SesionService{
    constructor(){
        this.knex = knex(config)
    }

    async buscarUsuarioPorCorreo(email){
        return this.knex('usuario').select('*').where({CORREO_USUARIO:email}).first()
    }

    async buscarUsuarioPorId(id){
        return this.knex('usuario').select('*').where({ID_USUARIO:id}).first()
    }

    async actualizarContrasena(id, nuevaContrasena){
        return this.knex('usuario').where({ID_USUARIO: id}).update({PASSWORD_USUARIO: nuevaContrasena})
    }

    async obtenerPreguntaSecreta(correo){
        const usuario = await this.buscarUsuarioPorCorreo(correo)
        return usuario ? usuario.PREGUNTA_SECRETA : null
    }

    async obtenerPreguntaSecretaPorId(id){
        const usuario = await this.buscarUsuarioPorId(id)
        return usuario ? usuario.PREGUNTA_SECRETA : null
    }

    async verificarRespuestaSecreta(correo, respuesta){
        const usuario = await this.buscarUsuarioPorCorreo(correo)
        return usuario && usuario.RESPUESTA_SECRETA === respuesta
    }

    async verificarRespuestaSecretaPorId(id, respuesta){
        const usuario = await this.buscarUsuarioPorId(id)
        return usuario && usuario.RESPUESTA_SECRETA === respuesta
    }

    async actualizarContrasenaPorCorreo(correo, nuevaContrasena){
        return this.knex('usuario').where({CORREO_USUARIO: correo}).update({PASSWORD_USUARIO: nuevaContrasena})
    }

    async createUser(userData){
        const { nombre, apellido1, apellido2, correo, rut, password, preguntaSecreta, respuestaSecreta, tipo } = userData
        return this.knex('usuario').insert({
            NOMBRE_USUARIO: nombre,
            APELLIDO1_USUARIO: apellido1,
            APELLIDO2_USUARIO: apellido2,
            CORREO_USUARIO: correo,
            RUT_USUARIO: rut,
            PASSWORD_USUARIO: password,
            PREGUNTA_SECRETA: preguntaSecreta,
            RESPUESTA_SECRETA: respuestaSecreta,
            TIPO_USUARIO: tipo
        })
    }
}
