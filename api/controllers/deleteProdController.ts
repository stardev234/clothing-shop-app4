import mongoose from "mongoose";
import Product from "../db/dbModels"
import generateBarcode from "../middleware/generateBarcode";
import * as express from 'express';


export async function deleteProduct(req: express.Request, res: express.Response): Promise<void> {
    console.log("FROM DELETE CONTROLLER");
    const { _id, name, category, brand, size, color, material, price, stock, description, date, gender, provider } = req.body;
    try {
        const product = new Product({
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
            _id,
        });
        console.log();
        
        const id = product._id
 
        console.log("id",id, "product", product);
        

        //console.log("product",product);
        


        const result = await Product.findByIdAndDelete(id)
        console.log(result);
        
        res.send(result);
/*
        if (!result) {
            console.log('Document not found');
             // or handle as needed
        }

*/
    } catch (err) {
        console.error('Error updating document:', err);
        throw err; // or handle error as needed
    }
}