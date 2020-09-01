const express = require('express');
let verificaToken = require('../meddlewares/autenticacion').verificaToken;
let verificaAdminRole = require('../meddlewares/autenticacion').verificaAdminRole;
const app = express();
let Categoria = require('../models/categoria.js');
//const { verificaAdminRole } = require('../meddlewares/autenticacion');

// ============================================
//     Mostrar las categorias
// ============================================

app.get('/categoria', verificaToken, (req, res) => {
    Categoria.find({})
        .sort('descripcion')
        .populate('usuario', 'nombre email')
        .exec((err, categorias) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });

            };

            //Categoria.countDocuments((err, conteo) => {
            res.json({
                ok: true,
                categorias

            });



            //});
        });
});

// ============================================
//     Mostrar una categoria por ID
// ============================================

app.get('/categoria/:id', verificaToken, (req, res) => {
    let id = req.params.id;
    Categoria.findById(id, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });

        };


        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                error: {
                    message: 'Categoria no encontrado'
                }
            });

        }
        res.json({
            ok: true,
            categorias: categoriaDB

        });



    });


});

// ============================================
//     Crear una categoria por ID
// ============================================

app.post('/categoria', [verificaToken], (req, res) => {

    let body = req.body;
    //console.log('categoria ', req.body);

    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario: req.usuario._id
    });

    categoria.save((err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });

        };

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            });

        }
        //console.log(body.descripcion);
        //usuario.password = null;
        res.json({
            ok: true,
            categoria: categoriaDB
        });

    });
});

// ============================================
//     Actualizar una categoria por ID
// ============================================

app.put('/categoria/:id', verificaToken, (req, res) => {
    let id = req.params.id;
    let body = req.body;

    let descCategoria = {
        descripcion: body.descripcion
    }

    Categoria.findByIdAndUpdate(id, descCategoria, { new: true, runValidators: true }, (err, categoriaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });

        };
        res.json({
            ok: true,
            categoria: categoriaDB
        });


    });
});

// ============================================
//     Borrar  una categoria por ID
// ============================================

app.delete('/categoria/:id', [verificaToken, verificaAdminRole], (req, res) => {
    let id = req.params.id;

    Categoria.findByIdAndRemove(id, (err, categoriaBorrado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });

        };

        if (!categoriaBorrado) {
            return res.status(400).json({
                ok: false,
                error: {
                    message: 'Categoria no encontrado'
                }
            });

        }
        res.json({
            ok: true,
            message: 'categoriaBorrado'
        });

    });
});

module.exports = app;