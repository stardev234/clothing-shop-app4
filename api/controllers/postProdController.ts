import mongoose from "mongoose";
import  Product from "../db/dbModels"
import  generateBarcode  from "../middleware/generateBarcode";
import * as express from 'express';


export async function postProduct(req: express.Request, res: express.Response): Promise<void> {
  console.log("FROM POST CONTROLLER");
  const { barcode, name, category, brand, size, color, material, price, stock, description, date, gender, provider } = req.body;
  try {
    const product = new Product({
      barcode,
      name,
      category,
      brand,
      size,
      color,
      material,
      price,
      stock,
      description,
      date,
      gender,
      provider,
    });
    const result = await product.save();

    console.log(result);
    
    
    res.send(result);

  } catch (err) {
    console.log(err);
  }
}
