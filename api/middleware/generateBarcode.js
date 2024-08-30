const Product = require('../db/dbModels');

exports.generateBarcode = async function generateBarcode(req, res, next) {


    const { v4: uuidv4 } = require('uuid');
    const bwipjs = require('bwip-js');
    const fs = require('fs');


    // Generate UUIDv4



    
    try {
        const product = await Product.find({}, { barcode: 1, _id: 0 }).exec();
        product.forEach(product => {
          console.log(product.barcode);
        });
      } catch (err) {
        console.error(err);
      }






    console.log('Generated UUID:', uuid);



    
bwipjs.toBuffer({
    bcid: 'code128', // Barcode type
    text: uuid,       // Text to encode
    scale: 3,         // 3x scaling factor
    height: 10,       // Bar height, in millimeters
    includetext: true, // Show human-readable text
    textxalign: 'center', // Align text in the center
    padding: 5        // Padding around the barcode
}, (err, png) => {
    if (err) {
        console.error(err);
        return;
    }

    // Save the barcode as a PNG file
    fs.writeFile('barcode.png', png, (err) => {
        if (err) {
            console.error('Error saving barcode:', err);
        } else {
            console.log('Barcode saved as barcode.png');
        }
    });
});

req.body.barcode = uuid
next()


}






