// Define a function to make the DELETE request
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
  




export async function deleteProduct(product: productElement): Promise<void> {
    try {
        const response = await fetch("http://localhost:3006/api/deleteProd", {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                // Add any other headers you need, e.g., authorization
            },
        });

        // Check if the response is ok (status code 200-299)
        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        // Handle the response if needed (e.g., parse JSON)
        const result = await response.json();
        console.log('Resource deleted:', result);
    } catch (error) {
        console.error('Failed to delete resource:', error);
    }
}


