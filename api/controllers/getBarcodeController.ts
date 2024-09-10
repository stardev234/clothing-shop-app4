import mongoose from "mongoose";
import  Product from "../db/dbModels"
import  generateBarcode  from "../middleware/generateBarcode";
import * as express from 'express';


export async function getBarcode(req: express.Request, res: express.Response): Promise<void> {
  try {
    const barcode = await generateBarcode();
    res.send(JSON.stringify(barcode));
  } catch (err) {
    console.log(err);
  }
}