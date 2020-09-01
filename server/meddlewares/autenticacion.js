// =====================================
//    VERFICAR AUTENTICACION
// =====================================

let jwt = require('jsonwebtoken')

let verificaToken = (req, res, next) => {
    let token = req.get('token');


    try {
        var decoded = jwt.verify(token, process.env.SEED);
    } catch (err) {
        return res.status(401).json({
            ok: false,
            err: {
                message: 'Token no valido1'
            }
        })
    }

    //console.log(decoded.usuario);

    req.usuario = decoded.usuario;

    next();
}

// =====================================
//    VERFICAR ADMIN ROLE
// =====================================

let verificaAdminRole = (req, res, next) => {
    let usuario = req.usuario;
    //let usuario = jwt.decode(req.get('token')); //console.log('req ', req);

    if (usuario.role === 'ADMIN_ROLE') {
        next();

    } else {
        return res.json({
            ok: false,
            err: {
                message: 'Usuario no es administrador '
            }
        });
    }

}

module.exports = {
    verificaToken,
    verificaAdminRole
};