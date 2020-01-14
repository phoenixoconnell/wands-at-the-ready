const getAllProducts = async (req, res) => {
    const db = req.app.get('db');

    const allProducts = await db.getAllProducts();
    res.status(200).json(allProducts);
}

const getOneProduct = async (req, res) => {
    const db = req.app.get('db');

    const oneProduct = await db.getOneProduct(req.params.product_id)
    res.status(200).json(oneProduct[0])
}

const add = async (req, res) => {
    const db = req.app.get('db');
    const { product_name, product_img, product_price, product_desc } = req.body;

    const addedProducts = await db.addProduct(product_name, product_img, product_price, product_desc);
    res.status(200).json(addedProducts);
}

const edit = async (req, res) => {
    const db = req.app.get('db');
    const { product_id } = req.params;
    const { product_name, product_img, product_price, product_desc } = req.body;

    const updatedItem = await db.editProduct(product_id, product_name, product_img, product_price, product_desc);
    res.status(200).json(updatedItem);
}

const deleteProduct = async (req, res) => {
    const db = req.app.get('db');
    const { product_id } = req.params;

    const deletedItem = await db.deleteProduct(product_id);
    res.status(200).json(deletedItem);
}

module.exports= {
    getAllProducts,
    getOneProduct,
    add,
    edit,
    deleteProduct
}