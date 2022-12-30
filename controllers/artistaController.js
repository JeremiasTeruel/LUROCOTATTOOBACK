const Artista = require('../models/Artista')

const artistaController = {

    todosArtistas: async(req, res) => {
        let artistas
        try{
            artistas = await Artista.find()
            if(artistas){
                res.status(200).json({
                    message: 'Estos son todos los artistas',
                    response: artistas,
                    success: true
                })
            } else {
                res.status(404).json({
                    message: "No se encontraron artistas",
                    success: false
                })
            }

            // const artists = await Artista.find()
            // return res.status(200).json(artists)

        } catch(error){
            console.log(error)
            res.status(400).json({
                message: 'Se produjo un error',
                success: false
            })
        }
    },

    unArtista: async(req, res) => {
        const {id} = req.params
        try{
            let artista = await Artista.findOne({_id:id})
            if(artista){
                res.status(200).json({
                    message: 'Artista encontrado',
                    response: artista,
                    success: true
                })
            } else {
                res.status(404).json({
                    message: 'Artista no encontrado',
                    success: false
                })
            }
        } catch(error){
            console.log(error)
            res.status(400).json({
                message: 'Se produjo un error',
                success: false
            })
        }
    },

    agregarArtista: async(req, res) => {
        const { nombre, imagen, descripcion } = req.body

        try{
            // if(req.usuario.role === "admin"){
            // } else {
            //     res.status(401).json({
            //         message: 'No autorizado',
            //         success: true
            //     })
            // }
            let artista = await new Artista(req.body).save()
            res.status(201).json({
                message: 'Nuevo artista agregado con exito',
                response: artista._id,
                success: true
            })
        } catch(error){
            console.log(error)
            res.status(400).json({
                message: 'No se pudo crear el artista',
                success: false
            })
        }
    },

    editarArtista: async(req, res) => {
        const {id} = req.params
        const {role} = req.usuario
        let putArtista = {}
        let currentArtista
        try{
            if(putArtista){
                currentArtista = await Artista.findOne({_id:id})
                let { nombre,
                        imagen,
                        descripcion} = currentArtista

                        if(role === "admin"){
                            putArtista = await Artista.findOneAndUpdate({_id:id}, currentArtista, {new: true})
                            res.status(200).json({
                                message: "Artista editado con exito",
                                response: putArtista,
                                success: true
                            })
                        } else {
                            res.status(401).json({
                                message: "No autorizado",
                                success: true
                            })
                        }
            } else {
                res.status(404).json({
                    message: "No se encontro el artista",
                    success: false
                })
            }
        } catch(error){
            console.log(error)
            res.status(400).json({
                message: "Se produjo un error",
                success: false
            })
        }
    },

    eliminarArtista: async(req, res) => {
        const {id} = req.params
        // const {role} = req.usuario
        
        try{
            // if(role === "admin"){
            // } else {
            //     res.status(401).json({
            //         message: "No autorizado",
            //         success: true
            //     })
            // }
            await Artista.findOneAndDelete({_id:id})
            res.status(200).json({
                message: "Artista eliminado con exito",
                success: true
            })
        } catch(error){
            console.log(error)
            res.status(400).json({
                message: "Se produjo un error",
                success: false
            })
        }
    }


}

module.exports = artistaController