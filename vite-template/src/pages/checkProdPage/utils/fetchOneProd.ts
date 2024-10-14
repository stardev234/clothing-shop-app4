import { Product } from "@/models/Products";
import { productElement } from "../components/EditProd";

export interface barcode {
    barcode: string,

}
  export type ProductResponse = {
    barcode: string;
    description: string;
    name: String,
    category: String,
    brand: String,
    size: String,
    color: String,
    material: String,
    price: String,
    stock: String,
    gender: String,   
    date: string,
  };
  


  export const fetchOneProduct = async (barcode: barcode): Promise<ProductResponse> => {
    console.log("from FetchUpdateProd");
    console.log("FROM UPDATE PRODUCT: ", barcode);
    
    
    try {
      console.log("from FetchUpdateProd");
      
      const response = await fetch('http://localhost:3006/api/getOneProd', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({barcode}),
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
     
      const data: ProductResponse = await response.json();
      console.log("from fetchEdit", data);
      
      return data;
    } catch (error) {
      console.error('Failed to create user:', error);
      throw error;
    }
  };


