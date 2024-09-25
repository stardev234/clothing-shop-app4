import { productElement } from "../components/EditProd";

export type newFilter = {

    name: String, 
    category: String,
    brand: String,
    size: String,
    color: String,
    material: String,
    price: String,
    stock: String,
    gender: String,
    description: string,
    fromDate: Date,
    untilDate: Date

  };
  
  export type ProductResponse = {
    name: String,
    category: String,
    brand: String,
    size: String,
    color: String,
    material: String,
    price: String,
    stock: String,
    gender: String,   
    date: Date,
  };
  


  export const updateProduct = async (product: productElement): Promise<ProductResponse> => {
    console.log("from FetchUpdateProd");
    console.log("FROM UPDATE PRODUCT: ", product);
    
    
    try {
      console.log("from FetchUpdateProd");
      
      const response = await fetch('http://localhost:3006/api/editProd', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
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


