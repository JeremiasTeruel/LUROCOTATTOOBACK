const Carro = require('../models/Carro')

const carroController = {

    getCarro: async (req, res) => {

        const {userEmail} = req.query

        try {

            const userCart = await Carro.findOne({
                userEmail: userEmail
            })

            if (!userCart) throw new Error()

            return res.status(200).json({
                response: userCart
            })

        }catch (err){
            return res.status(400).json({
                message: "Carro vacio o inexistente",
                response: []
            })
        }

    },

    agregarAlCarro: async (req, res) => {
        console.log(req.body)

        try {
            const {userEmail, productos} = req.body


            const userCart = await Carro.findOne({
                userEmail: userEmail
            })

            if (!userCart) {
                const carro = await Carro.create({
                    userEmail,
                    productos
                })
                return res.status(201).json({
                    message: "Carrito creado con exito!",
                    response: carro
                })
            }

            const carro = await Carro.findOneAndReplace({
                userEmail: userEmail
            }).replaceOne({
                userEmail: userEmail,
                productos: productos
            })

            return res.status(200).json({
                message: "Carrito actualizado",
                response: {
                    userEmail: userEmail,
                    productos: productos
                }
            })

        } catch (error) {
            console.log(error)
        }
    },
    limpiarCarro: async (req, res) => {

        try {
            const {userEmail} = req.query

            if (!userEmail) throw new Error("No se puede encontrar el carrito sin el email del usuario")

            await Carro.findOneAndDelete({
                userEmail: userEmail
            })

            return res.json({
                message: `El carrito del usuario ${userEmail} ha sido eliminado`,
                response: userEmail
            })


        } catch (error) {
            return res.status(400).json({
                message: error.message
            })

        }
    }


}

module.exports = carroController