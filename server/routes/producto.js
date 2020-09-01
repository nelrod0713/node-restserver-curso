const express = require('express');
let verificaToken = require('../meddlewares/autenticacion').verificaToken;
let verificaAdminRole = require('../meddlewares/autenticacion').verificaAdminRole;
const app = express();
let Producto = require('../models/producto.js');

// ============================================
//     Mostrar los productos
// ============================================

app.get('/producto', verificaToken, (req, res) => {
    Categoria.find({})
        .sort('nombre')
        .populate('usuario', 'nombre email')
        .populate('categoria')
        .exec((err, productos) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });

            };

            //Categoria.countDocuments((err, conteo) => {
            res.json({
                ok: true,
                productos

            });



            //});
        });
});

// ============================================
//     Mostrar una Producto por ID
// ============================================

app.get('/producto/:id', verificaToken, (req, res) => {
    let id = req.params.id;
    Producto.findById(id, (err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });

        };


        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                error: {
                    message: 'Producto no encontrado'
                }
            });

        }
        res.json({
            ok: true,
            productos: productoDB

        });



    });


});

// ============================================
//     Crear un Producto
// ============================================

app.post('/producto', [verificaToken], (req, res) => {

    let body = req.body;
    console.log('descrip ', body.descripcion);

    let producto = new Producto({
        nombre: body.nombre,
        descripcion: body.descripcion,
        precioUni: body.precioUni,
        disponible: body.disponible,
        categoria: body.categoria,
        usuario: req.usuario._id
    });

    producto.save((err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });

        };

        console.log(body.descripcion);
        //usuario.password = null;
        res.json({
            ok: true,
            producto: productoDB
        });

    });
});