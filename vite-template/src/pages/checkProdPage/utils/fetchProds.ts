import { Product } from "@/models/Products";
export const getProducts = async (): Promise<Product[]> => {
  

  try{
    const response = await fetch('http://localhost:3006/api/getProd');
    
    const products: Product[] = await response.json()
    return  products
  } catch(err){
     console.error(err);
    throw err
  }
   
}