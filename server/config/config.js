// ======================================
//           PUERTO
// ======================================

process.env.PORT = process.env.PORT || 3000;

// ======================================
//           ENTORNO
// ======================================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ======================================
//           BD
// ======================================

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe'
} else {

    //urlDB = 'mongodb+srv://22iQicbPWmwRkKdx:22iQicbPWmwRkKdx@cluster0.febzc.mongodb.net/cafe';
    urlDB = process.env.NONGO_URLDB;
};


process.env.URLDB = urlDB;