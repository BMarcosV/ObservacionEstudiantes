import config from './src/config/config.js'
import knex from 'knex'
import argon2 from 'argon2'

const db = knex(config)

async function insertUsers() {
    try {
        const users = [
            {
                NOMBRE_USUARIO: 'Margot',
                APELLIDO1_USUARIO: 'Herrera',
                APELLIDO2_USUARIO: '',
                CORREO_USUARIO: 'margot.herrera@andaliensur.cl',
                RUT_USUARIO: '12345678-9',
                TIPO_USUARIO: 'Profesor',
                PASSWORD_USUARIO: await argon2.hash('password123'),
                PREGUNTA_SECRETA: '¿Cuál es el nombre de tu alumno favorito?',
                RESPUESTA_SECRETA: 'Axel Ormeño'
            },
            {
                NOMBRE_USUARIO: 'Rodrigo',
                APELLIDO1_USUARIO: 'Vidal',
                APELLIDO2_USUARIO: '',
                CORREO_USUARIO: 'rodrigo.vidal@andaliensur.cl',
                RUT_USUARIO: '98765432-1',
                TIPO_USUARIO: 'Profesor',
                PASSWORD_USUARIO: await argon2.hash('password123'),
                PREGUNTA_SECRETA: '¿Cuál es el nombre de tu mascota?',
                RESPUESTA_SECRETA: 'Rocky'
            }
        ]

        for (const user of users) {
            await db('usuario').insert(user)
        }

        console.log('Usuarios insertados correctamente')
    } catch (error) {
        console.error('Error al insertar usuarios:', error)
    } finally {
        await db.destroy()
    }
}

insertUsers()
