// Define the shape of the request body and the expected response

import { json } from "stream/consumers";

export type NewProduct = {
    barcode: String
    name: String,
    category: String,
    brand: String,
    size: String,
    color: String,
    material: String,
    price: String,
    stock: String,
    description: String,
    date: Date,
    gender: String,
  };
  
  export type ProductResponse = {
    barcode: String
    name: String,
    category: String,
    brand: String,
    size: String,
    color: String,
    material: String,
    price: String,
    stock: String,
    description: String,
    date: Date,
    gender: String,
  };
  

  export type BarcodeResponse = Promise<String>


  export const getBarcode = async () : Promise<BarcodeResponse> => {
    try{
      const response = await fetch('http://localhost:3006/api/getBarcode')
      
      const data: BarcodeResponse = await response.json()
      console.log("response: ", data, typeof data);
      return  data
      
    }catch (error) {
      console.error('Failed to create get barcode:', error);
      throw error;
    }

    
  }


  export const createProduct = async (product: NewProduct): Promise<ProductResponse> => {

    
    try {
      const response = await fetch('http://localhost:3006/api/addProd', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data: ProductResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Failed to create user:', error);
      throw error;
    }
  };
  

  
  