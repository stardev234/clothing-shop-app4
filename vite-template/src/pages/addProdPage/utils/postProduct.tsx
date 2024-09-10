import { Product } from "@/models/Products";
import { ProductResponse } from "@/models/CreateProd";
  export const createProduct = async (product: Product): Promise<ProductResponse> => {

    
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
  
