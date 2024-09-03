import * as uuid from 'uuid';
import Product from '../db/dbModels';


export default async function generateBarcode(): Promise<string> {
  
  let uuidV4 = uuid.v4();
  

  return uuidV4
}
