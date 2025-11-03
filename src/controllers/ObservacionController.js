import ObservacionService from '../services/ObservacionService.js'
import { generateToken,verifyToken } from '../utils.js'
const observacion = new ObservacionService()

const crearForm = async(req, res) => {
    try {
        const estudiantes = await observacion.obtenerEstudiantes()
        const usuarios = await observacion.obtenerUsuarios()
        res.render('observaciones/viewCrearObservacion', {
            layout: 'main',
            title: 'Crear Observación',
            estudiantes,
            usuarios
        })
    } catch (error) {
        console.log(error)
        res.status(500).send('Error al cargar formulario de creación')
    }
}

const crear = async(req, res) => {
    try {
        const { ID_ESTUDIANTE, ID_USUARIO, OBSERVACION } = req.body
        await observacion.crearObservacion({ ID_ESTUDIANTE, ID_USUARIO, OBSERVACION })
        res.redirect('/observacion')
    } catch (error) {
        console.log(error)
        res.status(500).send('Error al crear observación')
    }
}

const editarForm = async(req, res) => {
    try {
        const { id } = req.params
        const obs = await observacion.obtenerObservacionPorId(id)
        const estudiantes = await observacion.obtenerEstudiantes()
        const usuarios = await observacion.obtenerUsuarios()
        res.render('observaciones/viewEditarObservacion', {
            layout: 'main',
            title: 'Editar Observación',
            obs,
            estudiantes,
            usuarios
        })
    } catch (error) {
        console.log(error)
        res.status(500).send('Error al cargar formulario de edición')
    }
}

const editar = async(req, res) => {
    try {
        const { id } = req.params
        const { ID_ESTUDIANTE, ID_USUARIO, OBSERVACION } = req.body
        await observacion.editarObservacion(id, { ID_ESTUDIANTE, ID_USUARIO, OBSERVACION })
        res.redirect('/observacion')
    } catch (error) {
        console.log(error)
        res.status(500).send('Error al editar observación')
    }
}

const eliminar = async(req, res) => {
    try {
        const { id } = req.params
        await observacion.eliminarObservacion(id)
        res.redirect('/observacion')
    } catch (error) {
        console.log(error)
        res.status(500).send('Error al eliminar observación')
    }
}

export { crearForm, crear, editarForm, editar, eliminar }
