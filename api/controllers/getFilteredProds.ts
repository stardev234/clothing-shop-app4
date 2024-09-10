import * as express from 'express';
import { Router } from 'express';
import mongoose, { Schema } from 'mongoose';
import Product from '../db/dbModels';
import { cleanData } from '../utils/cleanData';
import fuzzySearch from '../middleware/fuzzySearch';
export interface FilterOptions {
      barcode:string,
      name: string,
      category: string,
      brand: string,
      size: string,
      color: string,
      material: string,
      price: number,
      stock: number,
      description: string,
      date: Date,
      gender: string
  }


export async function getFilteredProds(req: express.Request, res: express.Response): Promise<void> {
    
    console.log("body: ",req.body);
    
    const body:FilterOptions = req.body;
    try {

    const cleanedBody = cleanData(body)


    const fuzzy = await fuzzySearch(req.body.name, req.body.brand, req.body.size, req.body.color, req.body.date, req.body.gender)


    
    console.log("fuzzy",typeof fuzzy);
    
    const fiteredProd= await Product.find(cleanedBody)
    
    
    res.json(fuzzy)
    } catch (error) {
        console.log(error);
        
    }


} 