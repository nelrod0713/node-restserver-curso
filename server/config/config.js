// ======================================
//           PUERTO
// ======================================

process.env.PORT = process.env.PORT || 3000;

// ======================================
//           ENTORNO
// ======================================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ======================================
//     FECHA DE EXPIRACION TOKEN
// ======================================
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

// ======================================
//           SEED de Autenticacion
// ======================================
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';


// ======================================
//           BD
// ======================================

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe'
} else {

    //urlDB = 'mongodb+srv://22iQicbPWmwRkKdx:22iQicbPWmwRkKdx@cluster0.febzc.mongodb.net/cafe';
    urlDB = process.env.MONGO_URLDB;
};


process.env.URLDB = urlDB;