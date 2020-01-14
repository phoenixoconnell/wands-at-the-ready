const getAllProducts = async (req, res) => {
    const db = req.app.get('db')

    const allProducts = await db.getAllProducts()
    res.status(200).json(allProducts)
}

module.exports= {
    getAllProducts
}