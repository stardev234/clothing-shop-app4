
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
    date: Date,
    gender: String,
  };
  


  export const FilterProducts = async (product: newFilter): Promise<ProductResponse> => {

    
    try {
      const response = await fetch('http://localhost:3006/api/getFilteredProds', {
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




