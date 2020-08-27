// =====================================
//    VERFICAR AUTENTICACION
// =====================================

let jwt = require('jsonwebtoken')

let verificaToken = (req, res, next) => {
    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, user) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no valido'
                }
            });
        }
    });

    //req.usuario = user.usuario;

    next();
}

// =====================================
//    VERFICAR ADMIN ROLE
// =====================================

let verificaAdminRole = (req, res, next) => {
    //let usuario = req.usuario;
    let usuario = jwt.decode(req.get('token')); //console.log('req ', req);

    if (usuario.usuarioDB.role === 'ADMIN_ROLE') {
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