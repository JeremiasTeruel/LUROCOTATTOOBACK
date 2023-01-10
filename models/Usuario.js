const mongoose = require("mongoose")


const usuarioSchema = new mongoose.Schema({
    nombre: {type: String, required: true, min: 3, max: 15},
    apellido: {type: String, required: true, min: 3, max: 15},
    email: {
        type: String,
        min: [4, 'El minimo de caracteres es 4'], 
        max: [32, 'El maximo de caracteres es 32'],
        unique: true,
        lowercase: true,
        required: true, 
        // match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
        },
    contraseña: [{
        type: String,
        min: [5, 'La contraseña es muy corta'],
        max: [32, 'La contraseña es muy larga'],
        required: true
    }],
    foto: {type: String, required: true},
    from: [{type: String, required: true}],
    role: {type: String, required: true},
    logged: {type: String, required: false},
    verified: {type: String, required: false},
    code: {type: String, required: false},
})

const ModeloUsuario = mongoose.model("usuarios", usuarioSchema);

module.exports = ModeloUsuario;