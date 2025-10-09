import config from '../config/config.js'
import knex from 'knex'
export default class ClienteService{
    constructor(){
        this.knex = knex(config)
    }
    
    async obtenerAlumnoPorId(id){
        return this.knex('estudiante').select('*').where({id_estudiante:id}).first()
    }

}