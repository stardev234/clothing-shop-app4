import mongoose from "mongoose";
import  Product from "../db/dbModels"
import  generateBarcode  from "../middleware/generateBarcode";
import * as express from 'express';

export async function getOneProduct(req: express.Request, res: express.Response): Promise<void> {
  try {
    const result = await Product.findOne({barcode: req.body.barcode.barcode});
    //console.log(result);
    console.log(result);
    
    
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err as Error });
  }
}