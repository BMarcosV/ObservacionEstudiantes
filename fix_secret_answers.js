import config from './src/config/config.js'
import knex from 'knex'
import argon2 from 'argon2'

const db = knex(config)

async function fixSecretAnswers() {
    try {
        console.log('=== FIXING SECRET ANSWERS ===')

        // Get all users
        const users = await db('usuario').select('*')
        console.log(`Found ${users.length} users`)

        // Define proper secret questions and answers for each user
        const userUpdates = [
            {
                id: 1,
                pregunta: '¿Cuál es el nombre de tu mascota?',
                respuesta: 'Rocky'
            },
            {
                id: 2,
                pregunta: '¿Cuál es tu color favorito?',
                respuesta: 'Azul'
            },
            {
                id: 3,
                pregunta: '¿Cuál es tu comida favorita?',
                respuesta: 'Pizza'
            },
            {
                id: 4,
                pregunta: '¿Cuál es tu deporte favorito?',
                respuesta: 'Fútbol'
            },
            {
                id: 5,
                pregunta: '¿Cuál es tu película favorita?',
                respuesta: 'Titanic'
            },
            {
                id: 6,
                pregunta: '¿Cuál es tu libro favorito?',
                respuesta: 'Harry Potter'
            }
        ]

        // Update each user with unique secret questions and answers
        for (const update of userUpdates) {
            await db('usuario')
                .where({ ID_USUARIO: update.id })
                .update({
                    PREGUNTA_SECRETA: update.pregunta,
                    RESPUESTA_SECRETA: update.respuesta
                })
            console.log(`Updated user ${update.id}: ${update.pregunta} -> ${update.respuesta}`)
        }

        // Set all passwords to '12345'
        const hashedPassword = await argon2.hash('12345')
        await db('usuario').update({ PASSWORD_USUARIO: hashedPassword })
        console.log('All passwords set to 12345')

        console.log('✅ Secret answers fixed successfully!')

    } catch (error) {
        console.error('Error fixing secret answers:', error)
    } finally {
        await db.destroy()
    }
}

fixSecretAnswers()
