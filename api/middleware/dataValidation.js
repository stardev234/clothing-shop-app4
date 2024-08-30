
const Ajv = require('ajv');
const { error } = require('console');
const fs = require('fs');
const path = require('path');
const { validate } = require('../db/dbModels');


const ajv = new Ajv();


const productSchema = JSON.parse(fs.readFileSync(path.join(__dirname, 'schemas', 'product.json'), 'utf8'));
const validateProduct = ajv.compile(productSchema);

exports.validateData = function (req, res, next) {

    console.log("From validate data");
    

    const valid = validateProduct(req.body)
    console.log("From validate data2");
    if (!valid) {
        console.log("from valid");
        console.log(req.body);
        
        console.log(validateProduct.errors);
        
        return res.status(400).json({
            errors: validateProduct.errors,
        })
    }
    
    console.log("from next");
    
    next();
}




