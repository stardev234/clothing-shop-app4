
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
  


  export const updateProduct = async (product: newFilter): Promise<ProductResponse> => {

    
    try {
      const response = await fetch('http://localhost:3006/api/getFilteredProds', {
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
      return data;
    } catch (error) {
      console.error('Failed to create user:', error);
      throw error;
    }
  };


