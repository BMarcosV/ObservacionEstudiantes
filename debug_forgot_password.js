import SesionService from './src/services/SesionService.js'

const Sesion = new SesionService()

async function debugForgotPassword() {
    try {
        console.log('=== DEBUGGING FORGOT PASSWORD ===')

        // Probar con el correo que el usuario dice que está usando
        const correo = 'margot.herrera@andaliensur.cl'
        console.log(`Buscando usuario con correo: ${correo}`)

        const usuario = await Sesion.buscarUsuarioPorCorreo(correo)
        console.log('Resultado de buscarUsuarioPorCorreo:', usuario)

        if (usuario) {
            console.log('Usuario encontrado:')
            console.log('- ID:', usuario.ID_USUARIO)
            console.log('- Nombre:', usuario.NOMBRE_USUARIO)
            console.log('- Correo:', usuario.CORREO_USUARIO)
            console.log('- Pregunta secreta:', usuario.PREGUNTA_SECRETA)
            console.log('- Respuesta secreta:', usuario.RESPUESTA_SECRETA)

            const pregunta = await Sesion.obtenerPreguntaSecreta(correo)
            console.log('Pregunta obtenida:', pregunta)
        } else {
            console.log('❌ Usuario NO encontrado')
        }

        // Probar con otro correo
        const correo2 = 'rodrigo.vidal@andaliensur.cl'
        console.log(`\nBuscando usuario con correo: ${correo2}`)
        const usuario2 = await Sesion.buscarUsuarioPorCorreo(correo2)
        console.log('Resultado:', usuario2 ? 'Encontrado' : 'NO encontrado')

    } catch (error) {
        console.error('Error en debug:', error)
    }
}

debugForgotPassword()
