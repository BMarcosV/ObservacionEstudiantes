import express from 'express'
import SesionService from './src/services/SesionService.js'

const app = express()
app.use(express.urlencoded({ extended: true }))

const Sesion = new SesionService()

app.post('/test-forgot', async (req, res) => {
    try {
        const { correo } = req.body
        console.log(`Testing forgot password for: ${correo}`)

        const usuario = await Sesion.buscarUsuarioPorCorreo(correo)
        console.log('Usuario found:', usuario ? 'YES' : 'NO')

        if (usuario) {
            console.log('User details:', {
                id: usuario.ID_USUARIO,
                nombre: usuario.NOMBRE_USUARIO,
                correo: usuario.CORREO_USUARIO,
                pregunta: usuario.PREGUNTA_SECRETA
            })
            res.send('Usuario encontrado')
        } else {
            res.status(404).send('Usuario no encontrado')
        }
    } catch (error) {
        console.error('Error:', error)
        res.status(500).send('Error interno')
    }
})

app.listen(3000, () => {
    console.log('Test server running on port 3000')
    console.log('Test with: curl -X POST http://localhost:3000/test-forgot -d "correo=margot.herrera@andaliensur.cl"')
})
