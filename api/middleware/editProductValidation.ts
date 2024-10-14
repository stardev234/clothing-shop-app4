import Ajv from 'ajv';
import  error  from 'console';
import  fs  from 'fs';
import path from 'path';

import * as express from 'express';
const ajv = new Ajv();

interface ProductSchema {
  [key: string]: any;
}

const productSchema: ProductSchema = JSON.parse(fs.readFileSync(path.join(__dirname, 'schemas', 'editedProduct.json'), 'utf8'));

const validateProduct = ajv.compile(productSchema);

export function validateEditData(req: express.Request, res: express.Response, next: express.NextFunction): void|express.Response{
  console.log('From validate data');

  const valid = validateProduct(req.body);
  console.log('From validate data2');

  if (!valid) {
    console.log('from valid');
    console.log(req.body);

    console.log(validateProduct.errors);

   return res.status(400).json({ errors: validateProduct.errors });
  }

  console.log('from next');

  next();
}