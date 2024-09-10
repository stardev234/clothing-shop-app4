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