//imports
require('dotenv').config();
const express = require('express');
const app = express();
const massive = require('massive');
const session = require('express-session');

//controllers
const { register, login, logout } = require('./controllers/authController');
const { getAllProducts, getOneProduct, add, edit, deleteProduct } = require('./controllers/productController');

//dotenv
const { SERVER_PORT, DB_STRING, SESSION_SECRET } = process.env;


//middleware
app.use(express.json());

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000*60*60*24*7
    }
}))


//massive
massive(DB_STRING).then(db => {
    app.set('db', db);
    console.log('DB Connected');
});

////endpoints

//auth
app.post('/auth/register', register);
app.post('/auth/login', login);
app.post('/auth/logout', logout);

//admin
app.post('/admin/add', add);
app.put('/admin/edit/:product_id', edit);
app.delete('/admin/delete/:product_id', deleteProduct)

//products
app.get('/api/products', getAllProducts);
app.get('/api/products/:product_id', getOneProduct);


//listen
app.listen(SERVER_PORT, () => {
    console.log(`Server listening on port ${SERVER_PORT}`)
});