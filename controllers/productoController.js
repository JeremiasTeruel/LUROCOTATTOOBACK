const Producto = require('../models/Producto')

const productoController = {

    crearProducto: async(req, res) => {
        const {nombre, imagen, descripcion, precio} = req.body

        try{
            let producto = await new Producto(req.body).save()
            res.status(201).json({
                message: 'Producto creado',
                response: producto._id,
                success: true
            })
        } catch(error){
            console.log(error)
            res.status(400).json({
                message: 'No se pudo crear el producto',
                success: false
            })
        }
    },

    unProducto: async(req, res) =>{
        const {id} = req.params
        try{
            let producto = await Producto.findOne({_id:id})
            if(producto){
                res.status(200).json({
                    message: 'Producto encontrado',
                    response: producto,
                    success: true
                })
            } else {
                res.status(404).json({
                    message: 'No se encontro el producto',
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

    productos: async(req, res) => {
        const query = {}
        let productos
        if(req.query.producto){
            let regExp = new RegExp(`^${req.query.producto}`, "i")
            query.producto = regExp
        }
        try{
            productos = await Producto.find(query)
            if(productos){
                res.status(200).json({
                    message: 'Estos son todos los productos',
                    response: productos,
                    success: true
                })
            } else {
                res.status(404).json({
                    message: "No hay productos",
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

    eliminarProducto: async(req, res) => {
        const {id} = req.params
        try{
            let producto = await Producto.findOneAndDelete({_id:id})
            if(producto){
                res.status(200).json({
                    message: 'Producto eliminado',
                    success: true
                })
            } else {
                res.status(404).json({
                    message: 'No se encontro el producto',
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
    }
}

module.exports = productoController