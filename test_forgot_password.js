import config from './src/config/config.js'
import knex from 'knex'

const db = knex(config)

async function testForgotPassword() {
    try {
        console.log('Probando búsqueda de usuario por correo...')

        // Probar con un correo que existe
        const usuario = await db('usuario').select('*').where({CORREO_USUARIO: 'margot.herrera@andaliensur.cl'}).first()
        console.log('Usuario encontrado:', usuario)

        if (usuario) {
            console.log('Pregunta secreta:', usuario.PREGUNTA_SECRETA)
            console.log('Respuesta secreta:', usuario.RESPUESTA_SECRETA)
        }

        // Probar con un correo que no existe
        const usuarioInexistente = await db('usuario').select('*').where({CORREO_USUARIO: 'noexiste@andaliensur.cl'}).first()
        console.log('Usuario inexistente:', usuarioInexistente)

    } catch (error) {
        console.error('Error:', error)
    } finally {
        await db.destroy()
    }
}

testForgotPassword()
