import config from './src/config/config.js'
import knex from 'knex'
import argon2 from 'argon2'

const db = knex(config)

async function updateDatabase() {
    try {
        console.log('Actualizando base de datos...')

        // Verificar si las columnas ya existen
        const columns = await db.raw("SHOW COLUMNS FROM usuario")
        const columnNames = columns[0].map(col => col.Field)

        if (!columnNames.includes('PASSWORD_USUARIO')) {
            console.log('Agregando columna PASSWORD_USUARIO...')
            await db.schema.alterTable('usuario', table => {
                table.string('PASSWORD_USUARIO', 255)
            })
        }

        if (!columnNames.includes('PREGUNTA_SECRETA')) {
            console.log('Agregando columna PREGUNTA_SECRETA...')
            await db.schema.alterTable('usuario', table => {
                table.string('PREGUNTA_SECRETA', 255)
            })
        }

        if (!columnNames.includes('RESPUESTA_SECRETA')) {
            console.log('Agregando columna RESPUESTA_SECRETA...')
            await db.schema.alterTable('usuario', table => {
                table.string('RESPUESTA_SECRETA', 255)
            })
        }

        console.log('Columnas verificadas/agregadas exitosamente.')

        // Actualizar contraseñas a '12345' hasheadas
        const hashedPassword = await argon2.hash('12345')
        console.log('Actualizando contraseñas...')

        await db('usuario').update({
            PASSWORD_USUARIO: hashedPassword,
            PREGUNTA_SECRETA: '¿Cuál es tu color favorito?',
            RESPUESTA_SECRETA: 'Azul'
        })

        console.log('Contraseñas actualizadas exitosamente.')

        // Verificar usuarios
        const users = await db('usuario').select('*')
        console.log('Usuarios actualizados:')
        users.forEach(user => {
            console.log(`ID: ${user.ID_USUARIO}, Nombre: ${user.NOMBRE_USUARIO} ${user.APELLIDO1_USUARIO}, Correo: ${user.CORREO_USUARIO}, Password: ${user.PASSWORD_USUARIO ? 'Set' : 'Not set'}`)
        })

    } catch (error) {
        console.error('Error actualizando base de datos:', error)
    } finally {
        await db.destroy()
    }
}

updateDatabase()
