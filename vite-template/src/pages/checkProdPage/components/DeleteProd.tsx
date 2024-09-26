import { Box, Button, Card, Drawer, Grid, Group, InputLabel, Menu, Select, Textarea, TextInput, Checkbox, Input, Modal, Text, List, ListItem } from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import { Product } from "@/models/Products";
import { SetStateAction, useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { FilterProducts } from "../utils/fetchFiltredProds";
import { newFilter } from "../utils/fetchFiltredProds";
import { updateProduct } from "../utils/fetchEditProd";
import { deleteProdFetch } from "../utils/fetchDeleteProd";


export interface productElement {
  productElement: Product
  onUpdate: () => void; // Add this line
  onDelete: () => void; // Add this line
}


type id = { id: String }
export const DeleteProduct: React.FC<any> = ({productElement}) => {

  

  const [product, setProduct] = useState<Product | Array<string> | string | Object>(["defaultProducts"]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [date, setDate] = useState('');
  const [isEnabled, setIsEnabled] = useState(true);
  const [opened, { open, close }] = useDisclosure(false);
  const [isAnyFieldEnabled, setIsAnyFieldEnabled] = useState(false);

  console.log(productElement);

console.log("FROM DELETE HANDLESUBMIT PRODUCT productElement", productElement);
  const handleSubmit = async () => {
    setLoading(true);
    setError(null); // Reset error state on new submission

    
    
  
    

    const fetchData = async () => {
      try {

        console.log("FROM DELETE HANDLESUBMIT PRODUCT productElement FETCH DATA", productElement)

        const deletedProduct: Product = {

            name: productElement.name,
            category: productElement.category,
            brand: productElement.brand,
            size: productElement.size,
            color: productElement.color,
            material: productElement.material,
            price: productElement.price,
            stock: productElement.stock,
            description: productElement.description,
            gender: productElement.gender,
            _id: productElement._id
  
          }

        console.log("from DELETE PRODUCT", deletedProduct);
        const deleteProduct = await deleteProdFetch(deletedProduct);
        console.log(deleteProduct);
        await deleteProdFetch(deletedProduct);

        
        

      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }

    };

    fetchData();

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>
  };

  return (


        <div>

{loading && <p>Loading...</p>} {/* Show loading message */}
        {error && (
          <Box style={{ color: 'red', marginBottom: '10px' }}>
            Error: {error} {/* Display error message */}
          </Box>
        )}

          <List>
            <ListItem>
              <Text>
                <span style={{ fontWeight: 'bold' }}>
                  Codigo de barras: {" "}
                </span>
                {productElement.barcode}
              </Text>
            </ListItem>
    
            <ListItem>
              <Text>
                <span style={{ fontWeight: 'bold' }}>
                  Nombre: {" "}
                </span>
                {productElement.name}
              </Text>
            </ListItem>
    
            <ListItem>
              <Text>
                <span style={{ fontWeight: 'bold' }}>
                  Categoria: {" "}
                </span>
                {productElement.category}
              </Text>
            </ListItem>
    
            <ListItem>
              <Text>
                <span style={{ fontWeight: 'bold' }}>
                  Marca: {" "}
                </span>
                {productElement.brand}
              </Text>
            </ListItem>
    
    
            <ListItem>
              <Text>
                <span style={{ fontWeight: 'bold' }}>
                  Talle: {" "}
                </span>
                {productElement.size}
              </Text>
            </ListItem>
    
    
            <ListItem>
              <Text>
                <span style={{ fontWeight: 'bold' }}>
                  Color: {" "}
                </span>
                {productElement.color}
              </Text>
            </ListItem>
    
            <ListItem>
              <Text>
                <span style={{ fontWeight: 'bold' }}>
                  Material: {" "}
                </span>
                {productElement.material}
              </Text>
            </ListItem>
    
            <ListItem>
              <Text>
                <span style={{ fontWeight: 'bold' }}>
                  Stock: {" "}
                </span>
                {productElement.stock}
              </Text>
            </ListItem>
    
            <ListItem>
              <Text>
                <span style={{ fontWeight: 'bold' }}>
                  Descripción: {" "}
                </span>
                {productElement.description}
              </Text>
            </ListItem>
    
            <ListItem>
              <Text>
                <span style={{ fontWeight: 'bold' }}>
                  Fecha: {" "}
                </span>
                {productElement.date}
              </Text>
            </ListItem>
    
            <ListItem>
              <Text>
                <span style={{ fontWeight: 'bold' }}>
                Género: {" "}
                </span>
                {productElement.gender}
              </Text>
            </ListItem>
          
            
            <ListItem>
              <Text>
                <span style={{ fontWeight: 'bold' }}>
                Precio: {" "}
                </span>
                {productElement.price}
              </Text>
            </ListItem>
    
          </List>
          <Button onClick={()=>handleSubmit()} style={{backgroundColor:"red", justifyContent:"center", marginTop:"15px"}}>Eliminar</Button>
        </div>
  )
}


