import config from '../config/config.js'
import knex from 'knex'
export default class apoderadosService{
    constructor(){
        this.knex = knex(config)
    }
    
    async buscarClientePorRun(runCliente){
        return this.knex('clientes').select('*').where({run:runCliente}).first()
    }

    async obtenerTodosLosApoderados(){
        return this.knex('apoderado').select('*')
    }

}