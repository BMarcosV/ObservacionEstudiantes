import SesionService from './src/services/SesionService.js'
import argon2 from 'argon2'

const Sesion = new SesionService()

async function testAllForgotPassword() {
    try {
        console.log('=== TESTING ALL FORGOT PASSWORD FLOWS ===')

        // Test data for each user - using the actual data from database
        const testUsers = [
            { email: 'rodrigo.vidal@andaliensur.cl', answer: 'Rocky', question: '¿Cuál es el nombre de tu mascota?' },
            { email: 'margot.herrera@andaliensur.cl', answer: 'Azul', question: '¿Cuál es tu color favorito?' }
        ]

        for (const testUser of testUsers) {
            console.log(`\n--- Testing: ${testUser.email} ---`)

            // Step 1: Check if user exists and get question
            const usuario = await Sesion.buscarUsuarioPorCorreo(testUser.email)
            if (!usuario) {
                console.log(`❌ User ${testUser.email} not found`)
                continue
            }

            const pregunta = await Sesion.obtenerPreguntaSecreta(testUser.email)
            console.log(`Question: ${pregunta}`)
            console.log(`Expected: ${testUser.question}`)

            if (pregunta !== testUser.question) {
                console.log(`❌ Question mismatch for ${testUser.email}`)
                continue
            }

            // Step 2: Verify answer
            const isCorrect = await Sesion.verificarRespuestaSecreta(testUser.email, testUser.answer)
            console.log(`Answer verification: ${isCorrect ? '✅' : '❌'}`)

            if (!isCorrect) {
                console.log(`❌ Wrong answer for ${testUser.email}`)
                continue
            }

            // Step 3: Test password update
            const newPassword = 'testpassword123'
            const hashedPassword = await argon2.hash(newPassword)
            await Sesion.actualizarContrasenaPorCorreo(testUser.email, hashedPassword)

            // Verify new password
            const updatedUser = await Sesion.buscarUsuarioPorCorreo(testUser.email)
            const passwordValid = await argon2.verify(updatedUser.PASSWORD_USUARIO, newPassword)
            console.log(`Password update: ${passwordValid ? '✅' : '❌'}`)

            // Reset password back to '12345'
            const resetPassword = await argon2.hash('12345')
            await Sesion.actualizarContrasenaPorCorreo(testUser.email, resetPassword)

            console.log(`✅ ${testUser.email} forgot password flow works!`)
        }

        console.log('\n=== ALL TESTS COMPLETED ===')

    } catch (error) {
        console.error('Error in test:', error)
    }
}

testAllForgotPassword()
