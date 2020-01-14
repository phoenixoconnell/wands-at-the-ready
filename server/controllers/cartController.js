const getCart = async (req, res) => {
    const db = req.app.get('db');
    const { user_id } = req.session.user;

    const cart = await db.getCart(user_id);
    res.status(200).json(cart);
}

const addToCart = async (req, res) => {
    const db = req.app.get('db');
    const { product_id } = req.params;
    const { user_id } = req.session.user;

    const cartItem = await db.addToCart(user_id, product_id);
    res.status(200).json(cartItem);
}

const removeFromCart = async (req, res) => {
    const db = req.app.get('db');
    const { product_id } = req.params;

    const updatedItems = await db.removeFromCart(req.session.user.user_id, product_id);
    res.status(200).json(updatedItems);
}

const clearCart = async (req, res) => {
    const db = req.app.get('db');

    const clear = await db.clearCart(req.session.user.user_id);
    res.sendStatus(200);
}

module.exports = {
    getCart,
    addToCart,
    removeFromCart,
    clearCart
}