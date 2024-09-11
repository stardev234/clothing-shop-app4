import * as express from 'express';
import { Router } from 'express';
import mongoose, { Schema } from 'mongoose';
import Product from '../db/dbModels';
import { cleanData } from '../utils/cleanData';
import fuzzySearch from '../middleware/fuzzySearch';
export interface FilterOptions {
    barcode: string,
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

    console.log("body: ", req.body);

    const body: FilterOptions = req.body;

    try {

        const cleanedBody = cleanData(body)

        let newBody = req.body

        let filteredArray: any[] = []
        let fuzzy = await fuzzySearch(req.body.name)

        if (fuzzy) {
            newBody = fuzzy

            console.log("from if");

        }

        console.log("newbody", newBody[1]);


        if (req.body.category) {


            let newArr = newBody.filter((value: any) => {

                console.log(value);

                return value = value.category === req.body.category


            })
            newBody = newArr
            console.log("from if category", newBody[1]);
        }


        if (req.body.date) {
            let newArr = newBody.filter((value: any) => {
                if (newBody.date) {

                }
                return value
            })
            newBody = newArr


        }






        console.log("fuzzy", typeof fuzzy);

        const fiteredProd = await Product.find(cleanedBody)


        res.send(newBody)
    } catch (error) {
        console.log(error);

    }


} 