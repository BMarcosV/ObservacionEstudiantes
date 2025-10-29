import EstudianteService from '../services/EstudianteService.js'
import { generateToken,verifyToken } from '../utils.js'
const estudiante = new EstudianteService()

const index = async(req,res) => {
    try {
        const est = await estudiante.obtenerTodoslosEstudiantes()
        const cursos = await estudiante.obtenerCursos()
        return res.render('alumno/listarEstudiantes',{
            layout:'main',
            title:'Lista de estudiantes',
            est,
            cursos
        })
    } catch (error) {
        console.log(error)
    }
}

const crear = async(req,res) => {
    try {
        const { nombre, apellido1, apellido2, rut, curso, id_apoderado } = req.body

        // Verificar si el RUT ya existe
        const rutExistente = await estudiante.verificarRutExistente(rut)
        if (rutExistente) {
            return res.status(400).json({ success: false, message: 'El RUT ya está registrado en el sistema' })
        }

        const cursoInfo = await estudiante.obtenerCursoPorId(curso)
        const nuevoEstudiante = {
            NOMBRE_ESTUDIANTE: nombre,
            APELLIDO1_ESTUDIANTE: apellido1,
            APELLIDO2_ESTUDIANTE: apellido2,
            RUT_ESTUDIANTE: rut,
            CURSO: cursoInfo.NOMBRE_CURSO,
            ID_APODERADO: id_apoderado,
            ID_CURSO: curso
        }
        await estudiante.crearEstudiante(nuevoEstudiante)
        res.json({ success: true, message: 'Estudiante creado exitosamente' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Error al crear estudiante' })
    }
}

const actualizar = async(req,res) => {
    try {
        const { id } = req.params
        const { nombre, apellido1, apellido2, rut, curso } = req.body

        // Verificar si el RUT ya existe en otro estudiante (excluyendo el actual)
        const rutExistente = await estudiante.verificarRutExistente(rut, id)
        if (rutExistente) {
            return res.status(400).json({ success: false, message: 'El RUT ya está registrado para otro estudiante' })
        }

        const cursoInfo = await estudiante.obtenerCursoPorId(curso)
        const datosActualizados = {
            NOMBRE_ESTUDIANTE: nombre,
            APELLIDO1_ESTUDIANTE: apellido1,
            APELLIDO2_ESTUDIANTE: apellido2,
            RUT_ESTUDIANTE: rut,
            CURSO: cursoInfo.NOMBRE_CURSO,
            ID_CURSO: curso
        }
        await estudiante.actualizarEstudiante(id, datosActualizados)
        res.json({ success: true, message: 'Estudiante actualizado exitosamente' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Error al actualizar estudiante' })
    }
}

const eliminar = async(req,res) => {
    try {
        const { id } = req.params
        await estudiante.eliminarEstudiante(id)

        // Reasignar IDs secuenciales después de eliminar
        await estudiante.reasignarIdsEstudiantes()

        res.json({ success: true, message: 'Estudiante eliminado exitosamente' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Error al eliminar estudiante' })
    }
}

export {index, crear, actualizar, eliminar}
