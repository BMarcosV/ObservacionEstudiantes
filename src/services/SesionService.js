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
}