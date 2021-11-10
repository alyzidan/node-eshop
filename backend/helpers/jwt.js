const expressJwt = require('express-jwt')
function authJwt() {
    const secret = process.env.SECRET
    const api = process.env.API_URL
    return expressJwt({
        secret,
        algorithms: ['HS256'],
        isRevoked,
    }).unless({
        path: [
            { url: /\/api\/v1\/products(.*)/, methods: ['GET', 'Options'] },
            { url: /\/api\/v1\/users(.*)/, methods: ['POST', 'Options'] },
            { url: `${api}/users/register`, methods: ['POST', 'Options'] },
            { url: `${api}/users/login`, methods: ['POST', 'Options'] },
        ],
    })
}

async function isRevoked(req, payload, done) {
    if (!payload.isAdmin) {
        done(null, true)
    }
    done()
}
module.exports = authJwt
