import apoderadosService from '../services/apoderadosService.js'
import { generateToken,verifyToken } from '../utils.js'
const apoderados = new apoderadosService()

const index = async(req,res) => {
    try {
        const apo = await apoderados.obtenerTodosLosApoderados()
        return res.status(200).json(apo)
    } catch (error) {   
        console.log(error)
    }
}





export {index}