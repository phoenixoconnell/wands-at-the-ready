//imports
require('dotenv').config();
const express = require('express');
const app = express();
const massive = require('massive');
const session = require('express-session');
const auth = require('./middleware/userMiddleware');

//controllers
const { register, login, logout } = require('./controllers/authController');
const { getAllProducts, getOneProduct, add, edit, deleteProduct } = require('./controllers/productController');
const { cartCount, getCart, addToCart, removeFromCart, clearCart } = require('./controllers/cartController');

//dotenv
const { SERVER_PORT, DB_STRING, SESSION_SECRET } = process.env;


//middleware
//app.use( express.static( `${__dirname}/../build` ) );
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
app.post('/admin/add', auth.usersOnly, auth.adminsOnly, add);
app.put('/admin/edit/:product_id', auth.usersOnly, auth.adminsOnly, edit);
app.delete('/admin/delete/:product_id', auth.usersOnly, auth.adminsOnly, deleteProduct)

//products
app.get('/api/products', auth.usersOnly, getAllProducts);
app.get('/api/products/:product_id', auth.usersOnly, getOneProduct);

//cart
app.get('/cart/count', auth.usersOnly, cartCount);
app.get('/cart/products', auth.usersOnly, getCart);
app.post('/cart/add/:product_id', auth.usersOnly, addToCart);
app.delete('/cart/delete/:product_id', auth.usersOnly, removeFromCart);
app.delete('/cart/clear', auth.usersOnly, clearCart);

//listen
app.listen(SERVER_PORT, () => {
    console.log(`Server listening on port ${SERVER_PORT}`)
});
