const Product = require("../db/dbModels.js");

exports.getAllProducts = async function (req, res) {

    Product.find().then((result) => {
        res.send(result)
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ message: err.message });
    })


}

exports.postProduct = async function (req, res) {

    console.log("FROM POST CONTROLLER")
    const body = req.body
    console.log("body: ", body);

    const product = new Product(
        {
            barcode: req.body.barcode,
            name: req.body.name,
            category: req.body.category,
            brand: req.body.brand,
            size: req.body.size,
            color: req.body.color,
            material: req.body.material,
            price: req.body.price,
            stock: req.body.stock,
            description: req.body.description,
            date: req.body.date,
            gender: req.body.gender,
        }
    )

    try {
        const result = await product.save()
        res.send(result)
    } catch (err) {
        console.log(err)
    }


}

/*exports.deleteProduct = async (req, res) => {
    const product = await 
}*/


exports.getBarcode = async function getBarcode(req, res) {
    let uuid = "9f68e648-f30f-4bca-8841-184a20771cbb"
    const { v4: uuidv4 } = require('uuid');
    
    console.log("uuid from getBarcode", uuid);
    try {
        const product = await Product.find({}, { barcode: 1, _id: 0 }).exec();
        console.log("from try");
        
        product.forEach(product => {
          console.log(product.barcode)
            
          if (product.barcode === uuid ) {
            uuid = uuidv4()
            getBarcode()
            return
            
          }
        });
      } catch (err) {
        console.error(err);
      }

    try {
        res.send(JSON.stringify(uuid))
    } catch (err) {
        console.log(err)
    }



}