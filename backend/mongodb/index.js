const mongoose = require('mongoose')
mongoose
    .connect(process.env.LOCAL_CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'eshop-database',
    })
    .then(() => console.log('MONGOOSE SUCCESS'))
    .catch((error) => console.log(error, 'MONGOOSE FAIL'))
