const Usuario = require('../models/Usuario')
const crypto = require('crypto')
const bcryptjs = require('bcryptjs')
const joi = require('joi');
const jwt = require('jsonwebtoken')

const validator = joi.object({
    nombre:         
    joi.string()
    .pattern(/^[ñA-Za-z _]*[ñA-Za-z][ñA-Za-z _]*$/)
    .min(3)
    .max(15)
    .required(),

    apellido: 
    joi.string()
    .pattern(/^[ñA-Za-z _]*[ñA-Za-z][ñA-Za-z _]*$/)
    .min(3)
    .max(15)
    .required(),

    mail:
    joi.alternatives()
    .try(
        joi.string()
            .lowercase()
            .email({
                minDomainSegments: 2,
                tlds: {
                allow: ["com", "net", "ar", "org"],
                },
            }),
        )
    .required()
    .error(new Error("Invalid email")),

    contraseña:
    joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    .min(5)
    .max(32)
    .required(),

    repetirContraseña:
    joi.ref('contraseña'),

    foto:
    joi.string()
    .uri()
    .required(),

    role:
    joi.string()
    .min(3)
    .max(15)
    .required(),

    from:
    joi.string()
    .min(3)
    .max(15)
    .required()
})

const usuarioController = {

    registrarse: async(req, res) => {
        try{
            let resultado = await validator.validateAsync(req.body)
            let {
                nombre,
                apellido,
                mail,
                contraseña,
                repetirContraseña,
                foto,
                from
            } = resultado
            let usuario = await Usuario.findOne({mail})
            if(!usuario){
                let logged = false;
                let verified = false;
                let code = crypto.randomBytes(15).toString('hex')
                if( from === 'formulario'){
                    contraseña = bcryptjs.hashSync(contraseña, 10)
                    usuario = await new Usuario({ nombre, apellido, mail, contraseña: [contraseña], foto, role: "usuario", from: [from], logged, verified, code }).save()
                    //sendMail(mail, code)
                    res.status(201).json({
                        message: 'Usuario registrado con exito',
                        success: true
                    })
                } else {
                    contraseña = bcryptjs.hashSync(contraseña, 10);
                    verified = true;
                    usuario = await new Usuario({ nombre, apellido, mail, contraseña: [contraseña], foto, role: "usuario", from: [from], logged, verified, code }).save()
                    res.status(201).json({
                        message: 'Usuario registrado con exito desde ' + from,
                        success: true
                    })
                }
            } else {
                if(usuario.from.includes(from)){
                    res.status(200).json({
                        message: 'Usuario ya registrado',
                        success: false
                    })
                } else {
                    usuario.from.push(from);
                    usuario.verified = true;
                    usuario.contraseña.push(bcryptjs.hashSync(contraseña, 10));
                    await usuario.save();
                    res.status(201).json({
                        message: 'Usuario registrado con exito desde ' + from,
                        success: true
                    })
                }
            }
        } catch(error){
            console.log(error)
            res.status(400).json({
                message: 'Error, registro sin exito',
                success: false
            })
        }
    },

    iniciarSesion: async (req, res) => {
        const {mail, contraseña, from} = req.body

        try{
            let usuario = await Usuario.findOne({mail})
            if(!usuario){
                res.status(404).json({
                    message: 'Usuario no encontrado, por favor registrate',
                    success: false
                })
            } else if(usuario.verified){
                const checkPass = usuario.contraseña.filter(elementoContraseña => bcryptjs.compareSync(contraseña, elementoContraseña))
                if(from === 'formulario'){
                if(checkPass.length > 0){
                    const loginUsuario = {
                        id: usuario._id,
                        nombre: usuario.nombre,
                        apellido: usuario.apellido,
                        mail: usuario.mail,
                        role: usuario.role,
                        foto: usuario.foto
                    }

                    usuario.logged = true
                    await usuario.save()
                    const token = jwt.sign({id: usuario._id}, process.env.KEY_JWT, {expiresIn: 60*60*24})
                    res.status(200).json({
                        message: `Bienvenidx, ${usuario.nombre}`,
                        response: {usuario: loginUsuario, token: token},
                        success: true
                    })
                } else {
                    res.status(401).json({
                        message: 'Mail o contraseña incorrectos, por favor revisa e intenta de nuevo',
                        success: false
                    })
                }
            } else {
                if(checkPass.length > 0){
                    const loginUsuario = {
                        id: usuario._id,
                        nombre: usuario.nombre,
                        apellido: usuario.apellido,
                        mail: usuario.mail,
                        role: usuario.role,
                        foto: usuario.foto
                    }
                    const token = jwt.sign({id: user._id}, process.env.KEY_JWT, {expiresIn: 60*60*24});
                    usuario.logged = true;
                    await usuario.save()
                    res.status(200).json({
                        message: `Bienvenidx, ${usuario.nombre}`,
                        response: {usuario: loginUsuario, token: token},
                        success: true
                    })
                } else {
                    res.status(400).json({
                        message: 'Credenciales invalidas',
                        success: false
                    })
                }
            }
        } else {
            res.status(401).json({
                message: 'Error, verifica tu mail y contraseña y proba de nuevo',
                success: false
            })
        }
        } catch(error){
            console.log(error)
            res.status(400).json({
                message: 'Error, no pudo inicar sesion',
                success: false
            })
        }
    },

    cerrarSesion: async (req, res) => {
        const {mail} = req.body

        try{
            let usuario = await Usuario.findOne({mail:mail})
            if(usuario){
                usuario.logged = false
                await usuario.save()
                res.status(200).json({
                    message: 'Sesion cerrada con exito',
                    success: true
                })
            } else {
                res.status(404).json({
                    message: 'Usuario no encontrado',
                    success: false
                })
            }
        } catch(error){
            console.log(error)
            res.status(400).json({
                message: 'Error al cerrar la sesion',
                success: false
            })
        }
    },

    unUsuario: async (req, res) => {
        const { id } = req.params

        try{
            let usuario = await Usuario.findOne({_id:id})
            if(usuario){
                res.status(200).json({
                    message: 'Usuario encontrado',
                    response: usuario,
                    success: true
                })
            } else {
                res.status(404).json({
                    message: 'No se encontro al usuario',
                    success: false
                })
            }
        } catch(error){
            console.log(error)
            res.status(400).json({
                message: 'Ocurrio un error al buscar el usuario',
                success: false
            })
        }
    },

    usuarios: async (req, res) => {
        let usuarios
        let query = {}
        if(req.query.usuarios){
            query.usuarios = req.query.usuarios
        }
        try{
            usuarios = await Usuario.find(query)
            if(usuarios) {
                res.status(200).json({
                    message: 'Usuarios encontrados',
                    response: usuarios,
                    success: true
                })
            } else {
                res.status(400).json({
                    message: 'No se encontraron usuarios',
                    success: false
                })
            }
        } catch(error){
            console.log(error)
            res.status(400).json({
                message: 'Ocurrio un error el buscar los usuarios',
                success: false
            })
        }
    },

    editarUsuario: async (req, res) => {
        const {mail} = req.body
        const {mail: uMail, role: uRole} = req.usuario

        try{
            if(uMail.toString() === mail || uRole === "administrador"){
                let putUsuario = await Usuario.findOne({ mail: mail })
                if(putUsuario){
                    let {
                        nombre,
                        apellido,
                        role,
                        foto
                    } = req.body;
                if(uRole !== "administrador"){
                    putUsuario = await Usuario.findOneAndUpdate({mail:mail}, {nombre, apellido, foto}, {new: true})
                    res.status(200).json({
                        message: 'Usuario editado con exito',
                        response: putUsuario,
                        success: true
                    })
                } else if(uRole === "administrador"){
                    putUsuario = await Usuario.findOneAndUpdate({mail:mail}, {nombre, apellido, foto, role}, {new: true})
                    res.status(200).json({
                        message: 'Usuario editado con exito',
                        response: putUsuario,
                        success: true
                    })
                } else {
                    res.status(404).json({
                        message: 'Usuario no encontrado',
                        success: false
                    })
                }
                } else {
                    res.status(401).json({
                        message: 'No autorizado',
                        success: false
                    })
                }
            }
        } catch(error){
            console.log(error)
            res.status(400).json({
                message: 'Se produjo un error',
                success: false
            })
        }
    },

    eliminarUsuario: async (req, res) => {
        const { id } = req.params
        if(req.usuario !== null){
            try{
                await Usuario.findOneAndDelete({_id:id})
                res.status(200).json({
                    message: 'Usuario eliminado con exito',
                    success: true
                })
            } catch(error){
                console.log(error)
                res.status(400).json({
                    message: 'Se produjo un error',
                    success: false
                })
            }
        } else {
            res.status(401).json({
                message: 'No autorizado',
                success: false
            })
        }
    },

    verificarToken: async (req, res) => {
        if(req.usuario !== null){
            res.status(200).json({
                response: {usuario:{
                    id: req.usuario.usuarioId,
                    nombre: req.usuario.nombre,
                    apellido: req.usuario.apellido,
                    mail: req.usuario.mail,
                    foto: req.usuario.foto,
                    role: req.usuario.role
                }},
                success: true,
                message: `Bienvenido ${req.usuario.nombre}`,
            })
        } else {
            res.json({
                message: 'Por favor, inicia sesion',
                success: false
            })
        }
    }
}

module.exports = usuarioController;