const express = require('express')
require('dotenv/config')
require('./mongodb/index')
const morganMiddleware = require('./middlewares/morgan')

const app = express()
const morgan = require('morgan')
const cors = require('cors')
const api = process.env.API_URL

// Middleware
app.use(express.json())
app.use(morganMiddleware)
app.use(morgan('tiny'))
app.use(cors())
app.options('*', cors())

const productRoute = require('./routes/products-route')
const categoriesRoute = require('./routes/categories-route')
const usersRoute = require('./routes/users-route')

app.use(`${api}/products`, productRoute)
app.use(`${api}/categories`, categoriesRoute)
app.use(`${api}/users`, usersRoute)
// Routes

app.listen(3333, () => {
    console.log('connected')
})
