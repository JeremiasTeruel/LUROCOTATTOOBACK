const adminPassport = require('passport')
const passportJwt = require('passport-jwt')

const {KEY_JWT} = process.env
const Usuario = require('../models/Usuario')

adminPassport.use(
    new passportJwt.Strategy(
        {
            jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: KEY_JWT
        },
        async (jwt_payload, done) => {
            try{
                let usuario = await Usuario.findOne({_id:jwt_payload.id})
                if(usuario){
                    if(usuario.role === "administrador"){
                        usuario = {
                            usuarioId: usuario._id,
                            nombre: usuario.nombre,
                            mail: usuario.mail,
                            foto: usuario.foto,
                            role: usuario.role,
                        }
                        return done(null, usuario)
                    } else {
                        return done(null, false)
                    }
                } else {
                    return done(null, false)
                }
            }catch(error){
                console.log(error)
                return done(error, false)
            }
        }
    )
)

module.exports = adminPassport