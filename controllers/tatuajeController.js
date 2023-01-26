const Tatuaje = require('../models/Tatuaje')


const tatuajeController = {

    nuevoTatuaje: async (req, res) => {
        let {imagen, artista} = req.body

        try {
            let tatuaje = await new Tatuaje(req.body).save()
            res.status(201).json({
                message: 'Nuevo tatuaje creado',
                response: tatuaje._id,
                success: true
            })
        } catch (error) {
            console.log(error)
            res.status(400).json({
                message: 'No se pudo crear el tatuaje',
                success: false
            })
        }
    },

    eliminarTatuaje: async (req, res) => {
        let {tatuajeId} = req.params
        let {id, role} = req.usuario

        try {
            let tatuaje = await Tatuaje.findOneAndDelete({_id: id})
            if (tatuaje.usuario === id || role === "administrador") {
                res.status(200).json({
                    message: 'Tatuaje eliminado',
                    response: tatuaje._id,
                    success: true
                })
            } else {
                res.status(401).json({
                    message: 'No autorizado',
                    success: false
                })
            }
        } catch (error) {
            console.log(error)
            res.status(400).json({
                message: 'No se pudo eliminar el tatuaje',
                success: false
            })
        }
    },

    tatuajeArtista: async (req, res) => {

        console.log(req.query)

        let query = {}

        if (req.query.artista) {
            query.artista = req.query.artista
        }
        try {
            let tatuajes = await Tatuaje.findOne({query})
                .populate("artista", {nombre: 1, apellido: 1})
            if (tatuajes) {
                res.status(200).json({
                    message: 'Tatuajes encontrados',
                    response: tatuajes,
                    success: true
                })
            } else {
                res.status(404).json({
                    message: 'No se encontraron tatuajes',
                    success: true
                })
            }
        } catch (error) {
            console.log(error)
            res.status(400).json({
                message: 'Error, busqueda sin exito',
                success: false
            })
        }
    },

    todosTatuajes: async (req, res) => {
        let query = {}

        console.log(req.query)

        if (req.query.artista) {
            query.artista = req.query.artista
        }

        try {
            let tatuajes = await Tatuaje.find(query)
                .populate("artista", {nombre: 1, apellido: 1})

            if (tatuajes) {
                res.status(200).json({
                    message: 'Estos son todos los tatuajes y sus artistas',
                    response: tatuajes,
                    success: true
                })
            } else {
                res.status(404).json({
                    message: 'No se encontraron tatuajes',
                    success: true
                })
            }
        } catch (error) {
            console.log(error)
            res.status(400).json({
                message: 'Error, busqueda sin exito',
                success: false
            })
        }
    },


    unTatuaje: async (req, res) => {
        const {id} = req.params

        try {
            let tatuaje = await Tatuaje.findOne({_id: id})
            if (tatuaje) {
                res.status(200).json({
                    message: 'Tatuaje encontrado',
                    response: tatuaje,
                    success: true
                })
            } else {
                res.status(404).json({
                    message: 'Tatuaje no encontrado',
                    success: true
                })
            }
        } catch (error) {
            console.log(error);
            res.status(400).json({
                message: 'Error, busqueda sin exito',
                success: false
            })
        }
    }

}

module.exports = tatuajeController