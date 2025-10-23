import config from '../config/config.js'
import knex from 'knex'
export default class ObservacionService{
    constructor(){
        this.knex = knex(config)
    }

    async obtenerTodasLasObservaciones(){
        return this.knex('observaciones').select('*')
    }

    async crearObservacion(data){
        return this.knex('observaciones').insert(data).returning('*')
    }

    async obtenerObservacionPorId(id){
        return this.knex('observaciones').select('*').where({ID_OBSERVACIONES: id}).first()
    }

    async editarObservacion(id, data){
        return this.knex('observaciones').where({ID_OBSERVACIONES: id}).update(data)
    }

    async eliminarObservacion(id){
        return this.knex('observaciones').where({ID_OBSERVACIONES: id}).del()
    }

    async obtenerEstudiantes(){
        return this.knex('estudiante').select('ID_ESTUDIANTE', 'NOMBRE_ESTUDIANTE', 'APELLIDO1_ESTUDIANTE', 'APELLIDO2_ESTUDIANTE')
    }

    async obtenerUsuarios(){
        return this.knex('usuario').select('ID_USUARIO', 'NOMBRE_USUARIO', 'APELLIDO1_USUARIO', 'APELLIDO2_USUARIO')
    }

}
