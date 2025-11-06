import SesionService from './src/services/SesionService.js'
import argon2 from 'argon2'

const Sesion = new SesionService()

async function testForgotPasswordFlow() {
    try {
        console.log('=== TESTING FORGOT PASSWORD FLOW ===')

        const email = 'rodrigo.vidal@andaliensur.cl'

        console.log(`Testing forgot password for: ${email}`)

        // Step 1: Check if user exists and has secret question
        const usuario = await Sesion.buscarUsuarioPorCorreo(email)
        console.log('User found:', usuario ? 'YES' : 'NO')

        if (usuario) {
            console.log('User details:')
            console.log('- ID:', usuario.ID_USUARIO)
            console.log('- Pregunta:', usuario.PREGUNTA_SECRETA)
            console.log('- Respuesta exists:', usuario.RESPUESTA_SECRETA ? 'YES' : 'NO')

            // Step 2: Get secret question
            const pregunta = await Sesion.obtenerPreguntaSecreta(email)
            console.log('Secret question retrieved:', pregunta ? 'YES' : 'NO')
            console.log('Question:', pregunta)

            // Step 3: Verify secret answer
            const respuestaCorrecta = 'Rocky' // From our setup
            const isCorrect = await Sesion.verificarRespuestaSecreta(email, respuestaCorrecta)
            console.log('Secret answer verification:', isCorrect ? 'YES' : 'NO')

            if (isCorrect) {
                console.log('✅ Forgot password flow should work!')

                // Step 4: Test password update
                const nuevaPassword = 'newpassword123'
                const hashedPassword = await argon2.hash(nuevaPassword)
                await Sesion.actualizarContrasenaPorCorreo(email, hashedPassword)
                console.log('Password updated successfully')

                // Step 5: Verify new password works
                const updatedUser = await Sesion.buscarUsuarioPorCorreo(email)
                const isValidNewPassword = await argon2.verify(updatedUser.PASSWORD_USUARIO, nuevaPassword)
                console.log('New password verification:', isValidNewPassword ? 'YES' : 'NO')

                // Reset back to '12345' for consistency
                const resetPassword = await argon2.hash('12345')
                await Sesion.actualizarContrasenaPorCorreo(email, resetPassword)
                console.log('Password reset back to 12345')

            } else {
                console.log('❌ Secret answer verification failed!')
            }
        } else {
            console.log('❌ User not found!')
        }

    } catch (error) {
        console.error('Error in test:', error)
    }
}

testForgotPasswordFlow()
