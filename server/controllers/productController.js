const getAllProducts = async (req, res) => {
    const db = req.app.get('db');

    const allProducts = await db.getAllProducts();
    // console.log(allProducts)
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
    const product_id  = req.params.product_id;
    const { product_name, product_img, product_price, product_desc } = req.body;
    console.log(req.params, req.body)

    const updatedItems = await db.editProduct(product_id, product_name, product_img, product_price, product_desc);
    res.status(200).json(updatedItems);
}

const deleteProduct = async (req, res) => {
    const db = req.app.get('db');
    const { product_id } = req.params;

    const products = await db.deleteProduct(product_id);
    res.status(200).json(products);
}

module.exports= {
    getAllProducts,
    getOneProduct,
    add,
    edit,
    deleteProduct
}