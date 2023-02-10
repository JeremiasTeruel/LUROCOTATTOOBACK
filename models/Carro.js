const {model, Schema} = require('mongoose')

const Carro = new Schema({


    userEmail: {
        type: String,
        required: true
    },
    productos: [{
        type: Schema.Types.Mixed,
        ref: 'Product'
    }]
})

Carro.virtual('id').get(function(){
    return this._id.toHexString();
});

Carro.set('toJSON', {
    virtuals: true
});

module.exports = model('carro',Carro)