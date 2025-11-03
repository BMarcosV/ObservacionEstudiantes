import BuscarAlumnoService from '../services/BuscarAlumnoService.js'
import { generateToken,verifyToken } from '../utils.js'
const buscar = new BuscarAlumnoService()

const index = async(req,res) => {
    try {
        const {id} = req.body
        const alumno = await buscar.obtenerAlumnoPorId(id)
        if(alumno){
             return res.status(200).json({status:true,alumno})
        }else{
            return res.status(300).json({status:false,err:'Alumno no encontrado'})
        }
       
    } catch (error) {
        console.log(error)
    }
}

const viewBuscarAlumno = async(req,res) => {
    try {
        res.render('alumno/viewBuscarId',{
            title:'Buscar Alumno'
        })
    } catch (error) {
        console.log(error)
    }
}

export {index,viewBuscarAlumno}