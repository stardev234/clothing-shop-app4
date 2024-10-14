import mongoose from "mongoose";
import  Product from "../db/dbModels"
import  generateBarcode  from "../middleware/generateBarcode";
import * as express from 'express';

export async function getAllProducts(req: express.Request, res: express.Response): Promise<void> {
  try {
    const result = await Product.find().sort({ createdAt: -1 });
    //console.log(result);
    
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err as Error });
  }
}