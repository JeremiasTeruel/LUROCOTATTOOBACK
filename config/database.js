const mongoose = require('mongoose')

mongoose.set('strictQuery', false)
mongoose.connect(
    process.env.MONGO_DB,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true
    }
).then(() => console.log('connected to database successfully'))
.catch(error => console.log(error))