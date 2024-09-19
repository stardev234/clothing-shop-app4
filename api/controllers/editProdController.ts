import mongoose from "mongoose";
import Product from "../db/dbModels"
import generateBarcode from "../middleware/generateBarcode";
import * as express from 'express';


export async function postProduct(req: express.Request, res: express.Response): Promise<void> {
    console.log("FROM EDIT CONTROLLER");
    const { name, category, brand, size, color, material, price, stock, description, date, gender, provider } = req.body;
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
        });
        const id = req.body.id

        const result = await Product.findByIdAndUpdate(id, product, { new: true })
        console.log(product);

        res.send(result);

    } catch (err) {
        console.log(err);
    }
}
