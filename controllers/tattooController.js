const Tattoo = require('../models/Tattoo')

const tattooController = {


    agregarTattoo: async(req, res) => {
        const { nombre, imagen, descripcion } = req.body

        try{
            let tattoo = await new Tattoo({
                nombre: "tattoo 1",
                imagen: "alsdkjflaksjdflk",
                descripcion: "descripcion 1",
                artista: "63aa1db8e8ca9ffa2d1ad749"
            }).save()
            res.status(201).json({
                message: 'Nuevo tattoo agregado con exito',
                response: tattoo,
                success: true
            })
        } catch(error){
            console.log(error)
            res.status(400).json({
                message: 'No se pudo crear el tattoo',
                success: false
            })
        }
    },





}

module.exports = tattooController