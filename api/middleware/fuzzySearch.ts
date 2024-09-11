import mongoose, { Schema, Document } from 'mongoose';
import Fuse from 'fuse.js';
import Product from '../db/dbModels';

interface SearchResult {
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

interface FilterOptions {
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

async function fuzzySearch(name: string): Promise<SearchResult[]> {

  const documents = await Product.find().exec();


    
  
  


  
  // Configure Fuse.js options
  /* const options: Fuse.IFuseOptions<IModel> = {
     keys: ['name'],  // Fields to search
     threshold: 0.3,  // Fuzziness level
   };
 */

  const fuse = new Fuse(documents, {
    keys: ['name', 'category', "brand", "size", "color", "date", "gender" ],  // Fields to search
    threshold: 0.3,  // Fuzziness level
  });




  type result = any


  console.log(name);
  
  const results: result = fuse.search(name);


  return results.map((result: { item: {
    category: any;
    brand: any;
    size: any;
    color: any;
    material: any;
    stock: any;
    description: any;
    date: any;
    gender: any;
    price: any;
    barcode: any; _id: { toString: () => any; }; name: any; 
}; }) => ({
    barcode: result.item.barcode.toString(),
    name: result.item.name,
    category: result.item.category,
    brand: result.item.brand,
    size: result.item.size,
    color: result.item.color,
    material: result.item.material,
    stock: result.item.stock,
    description: result.item.description,
    date: result.item.date,
    gender: result.item.gender,
    price: result.item.price,


  }));
}


export default fuzzySearch;
