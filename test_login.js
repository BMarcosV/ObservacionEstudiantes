import SesionService from './src/services/SesionService.js'
import { isValidPassword } from './src/utils.js'

const Sesion = new SesionService()

async function testLogin() {
    try {
        console.log('=== TESTING LOGIN ===')

        const email = 'rodrigo.vidal@andaliensur.cl'
        const password = '12345'

        console.log(`Testing login for: ${email}`)

        const usuario = await Sesion.buscarUsuarioPorCorreo(email)
        console.log('Usuario found:', usuario ? 'YES' : 'NO')

        if (usuario) {
            console.log('User details:')
            console.log('- ID:', usuario.ID_USUARIO)
            console.log('- Nombre:', usuario.NOMBRE_USUARIO)
            console.log('- Correo:', usuario.CORREO_USUARIO)
            console.log('- Password hash exists:', usuario.PASSWORD_USUARIO ? 'YES' : 'NO')

            const isValid = await isValidPassword(usuario.PASSWORD_USUARIO, password)
            console.log('Password valid:', isValid ? 'YES' : 'NO')

            if (!isValid) {
                console.log('❌ Password verification failed!')
            } else {
                console.log('✅ Login should work!')
            }
        } else {
            console.log('❌ User not found!')
        }

    } catch (error) {
        console.error('Error in test:', error)
    }
}

testLogin()
