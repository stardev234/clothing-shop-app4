import mongoose from "mongoose";
import  Product from "../db/dbModels"
import  generateBarcode  from "../middleware/generateBarcode";
import * as express from 'express';

export async function getAllProducts(req: express.Request, res: express.Response): Promise<void> {
  try {
    const result = await Product.find();
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err as Error });
  }
}

export async function postProduct(req: express.Request, res: express.Response): Promise<void> {
  console.log("FROM POST CONTROLLER");
  const { barcode, name, category, brand, size, color, material, price, stock, description, date, gender } = req.body;
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
      gender
    });
    const result = await product.save();
    console.log(product);
    
    res.send(result);

  } catch (err) {
    console.log(err);
  }
}

export async function getBarcode(req: express.Request, res: express.Response): Promise<void> {
  try {
    const barcode = await generateBarcode();
    res.send(JSON.stringify(barcode));
  } catch (err) {
    console.log(err);
  }
}