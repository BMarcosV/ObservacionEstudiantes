import config from '../config/config.js'
import knex from 'knex'
export default class EstudianteService{
    constructor(){
        this.knex = knex(config)
    }
    
    async buscarClientePorRun(runCliente){
        return this.knex('clientes').select('*').where({run:runCliente}).first()
    }

    async obtenerTodoslosEstudiantes(){
        return this.knex('estudiante').select('*')
    }

    async crearEstudiante(datos){
        // Obtener el próximo ID secuencial disponible
        const estudiantes = await this.knex('estudiante').select('ID_ESTUDIANTE').orderBy('ID_ESTUDIANTE')
        let proximoId = 1
        for (const estudiante of estudiantes) {
            if (estudiante.ID_ESTUDIANTE === proximoId) {
                proximoId++
            } else {
                break
            }
        }

        // Asignar el ID calculado
        datos.ID_ESTUDIANTE = proximoId

        // Insertar con ID específico
        await this.knex('estudiante').insert(datos)
        return [datos] // Retornar el objeto insertado para mantener compatibilidad
    }

    async actualizarEstudiante(id, datos){
        return this.knex('estudiante').where({ID_ESTUDIANTE: id}).update(datos).returning('*')
    }

    async eliminarEstudiante(id){
        return this.knex('estudiante').where({ID_ESTUDIANTE: id}).del()
    }

    async obtenerCursos(){
        return this.knex('curso').select('*').orderByRaw('CAST(SUBSTRING(NOMBRE_CURSO, 1, LENGTH(NOMBRE_CURSO)-1) AS UNSIGNED) ASC, SUBSTRING(NOMBRE_CURSO, -1) ASC')
    }

    async obtenerCursoPorId(id){
        return this.knex('curso').where({ID_CURSO: id}).first()
    }

    async verificarRutExistente(rut, excludeId = null){
        let query = this.knex('estudiante').where({RUT_ESTUDIANTE: rut})
        if (excludeId) {
            query = query.whereNot({ID_ESTUDIANTE: excludeId})
        }
        const estudiante = await query.first()
        return estudiante ? true : false
    }

    async reasignarIdsEstudiantes(){
        // Obtener todos los estudiantes ordenados por ID actual
        const estudiantes = await this.knex('estudiante').select('*').orderBy('ID_ESTUDIANTE')

        // Reasignar IDs secuenciales empezando desde 1
        let nuevoId = 1
        for (const estudiante of estudiantes) {
            await this.knex('estudiante')
                .where({ID_ESTUDIANTE: estudiante.ID_ESTUDIANTE})
                .update({ID_ESTUDIANTE: nuevoId})
            nuevoId++
        }

        // Resetear el auto-increment si es necesario (opcional, depende de la base de datos)
        // await this.knex.raw('ALTER TABLE estudiante AUTO_INCREMENT = ?', [nuevoId])
    }

}