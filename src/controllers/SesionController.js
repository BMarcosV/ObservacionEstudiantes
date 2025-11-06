 import SesionService from '../services/SesionService.js'
import { generateToken, verifyToken } from '../utils.js'
import argon2 from 'argon2'
const Sesion = new SesionService()

const index = async(req,res) => {
    try {
<<<<<<< HEAD
        res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.set('Pragma', 'no-cache');
        res.set('Expires', '0');
=======
        const message = req.query.message || ''
>>>>>>> 0556be61ab8aeca96356a5c1644978398573bed2
        return res.render('sesion/index',{
            layout: 'sesion',
            title: 'Iniciar Sesion',
            message: message
        })
    } catch (error) {

    }
}

const nopermitido = async(req,res) => {
    try {
        return res.status(300).send({status:false,message:'Usuario no encontrado'})
    } catch (error) {
         console.log(error.message)
    }
}

const login = async(req,res) => {
    if(!req.user)
        return res.status(400).send({status:false,message:'Credenciales invalidas'})
    const token = generateToken(req.user)
    return res.cookie('cookieToken',token,{
        maxAge:60*60*1000,
        httpOnly:true,
        secure:true,
        sameSite: 'strict'
    }).send({status:true,message:'ok'})
}

<<<<<<< HEAD
const logout = async(req,res) => {
    try {
        req.logout((err) => {
            if (err) {
                console.log(err);
                return res.status(500).send({status:false,message:'Error al cerrar sesión'})
            }
            res.clearCookie('cookieToken')
            res.redirect('/')
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).send({status:false,message:'Error interno'})
    }
}

export {index,login,nopermitido,logout}
=======
const cambiarContrasenaForm = async(req, res) => {
    try {
        res.render('sesion/cambiarContrasena', {
            layout: 'main',
            title: 'Cambiar Contraseña'
        })
    } catch (error) {
        console.log(error)
        res.status(500).send('Error al cargar formulario de cambio de contraseña')
    }
}

const cambiarContrasena = async(req, res) => {
    try {
        const { respuestaSecreta } = req.body
        const token = req.cookies.cookieToken
        const decoded = verifyToken(token)
        const usuario = await Sesion.buscarUsuarioPorId(decoded.id)

        if (!usuario) {
            return res.status(404).send('Usuario no encontrado')
        }

        const respuestaCorrecta = await Sesion.verificarRespuestaSecretaPorId(decoded.id, respuestaSecreta)
        if (!respuestaCorrecta) {
            return res.status(400).send('Respuesta secreta incorrecta')
        }

        res.redirect('/cambiar-contrasena/nueva')
    } catch (error) {
        console.log(error)
        res.status(500).send('Error al verificar respuesta secreta')
    }
}

const cambiarContrasenaNueva = async(req, res) => {
    try {
        const { nuevaContrasena, confirmarContrasena } = req.body
        const token = req.cookies.cookieToken
        const decoded = verifyToken(token)

        if (nuevaContrasena !== confirmarContrasena) {
            return res.status(400).send('Las contraseñas no coinciden')
        }

        const hashedPassword = await argon2.hash(nuevaContrasena)
        await Sesion.actualizarContrasena(decoded.id, hashedPassword)

        res.redirect('/observacion')
    } catch (error) {
        console.log(error)
        res.status(500).send('Error al cambiar contraseña')
    }
}

const olvideContrasenaForm = async(req, res) => {
    try {
        res.render('sesion/olvideContrasena', {
            layout: 'sesion',
            title: 'Olvidé mi Contraseña'
        })
    } catch (error) {
        console.log(error)
        res.status(500).send('Error al cargar formulario de olvido de contraseña')
    }
}

const olvideContrasena = async(req, res) => {
    try {
        const { correo } = req.body
        const usuario = await Sesion.buscarUsuarioPorCorreo(correo)

        if (!usuario) {
            return res.status(404).send('Usuario no encontrado')
        }

        // Asumiendo que hay una columna PREGUNTA_SECRETA en la tabla usuario
        const pregunta = await Sesion.obtenerPreguntaSecreta(correo)

        res.render('sesion/preguntaSecreta', {
            layout: 'sesion',
            title: 'Pregunta Secreta',
            pregunta: pregunta,
            correo: correo
        })
    } catch (error) {
        console.log(error)
        res.status(500).send('Error al procesar olvido de contraseña')
    }
}

const responderPregunta = async(req, res) => {
    try {
        const { respuesta, correo } = req.body
        const usuario = await Sesion.buscarUsuarioPorCorreo(correo)

        if (!usuario) {
            return res.status(404).send('Usuario no encontrado')
        }

        const respuestaCorrecta = await Sesion.verificarRespuestaSecreta(correo, respuesta)

        if (!respuestaCorrecta) {
            return res.status(400).send('Respuesta incorrecta')
        }

        res.render('sesion/nuevaContrasena', {
            layout: 'sesion',
            title: 'Nueva Contraseña',
            correo: correo
        })
    } catch (error) {
        console.log(error)
        res.status(500).send('Error al verificar respuesta')
    }
}

const nuevaContrasena = async(req, res) => {
    try {
        const { nuevaContrasena, confirmarContrasena, correo } = req.body

        if (nuevaContrasena !== confirmarContrasena) {
            return res.status(400).send('Las contraseñas no coinciden')
        }

        const hashedPassword = await argon2.hash(nuevaContrasena)
        await Sesion.actualizarContrasenaPorCorreo(correo, hashedPassword)

        // Redirect to login page with success message
        res.redirect('/?message=Contraseña actualizada exitosamente')
    } catch (error) {
        console.log(error)
        res.status(500).send('Error al establecer nueva contraseña')
    }
}

export {index,login,nopermitido, cambiarContrasenaForm, cambiarContrasena, cambiarContrasenaNueva, olvideContrasenaForm, olvideContrasena, responderPregunta, nuevaContrasena}
>>>>>>> 0556be61ab8aeca96356a5c1644978398573bed2
