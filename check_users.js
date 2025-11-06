import config from './src/config/config.js'
import knex from 'knex'

const db = knex(config)

async function checkUsers() {
    try {
        const users = await db('usuario').select('*')
        console.log('Usuarios en la base de datos:')
        users.forEach(user => {
            console.log(`ID: ${user.ID_USUARIO}, Nombre: ${user.NOMBRE_USUARIO} ${user.APELLIDO1_USUARIO}, Correo: ${user.CORREO_USUARIO}, Pregunta: ${user.PREGUNTA_SECRETA}, Respuesta: ${user.RESPUESTA_SECRETA}`)
        })
    } catch (error) {
        console.error('Error al consultar usuarios:', error)
    } finally {
        await db.destroy()
    }
}

checkUsers()
