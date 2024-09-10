// Function to clean the data
import { FilterOptions } from "../controllers/getFilteredProds";
export const cleanData = (data: any): Partial<FilterOptions> => {
  const cleanedData: Partial<FilterOptions> = {};

  // Remove fields with empty strings or null values
  Object.keys(data).forEach(key => {
    if (data[key] !== '' && data[key] != null) {
      cleanedData[key as keyof FilterOptions] = data[key];
    }
  });

  return cleanedData;
};