import { Box, Button, Card, Drawer, Grid, Group, InputLabel, Menu, Select, Textarea, TextInput, Checkbox, Input, Modal, Text, List, ListItem } from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import { Product } from "@/models/Products";
import { SetStateAction, useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { FilterProducts } from "../utils/fetchFiltredProds";
import { newFilter } from "../utils/fetchFiltredProds";
import { updateProduct } from "../utils/fetchEditProd";
import { deleteProduct } from "../utils/fetchDeleteProd";


export interface myProductElement {
  _id: string,
  provider: string,
  name: string,
  category: string,
  brand: string,
  size: string,
  color: string,
  material: string,
  price: string,
  description: string,
  stock: Number,
  gender: string,
  date: Date,
}

export interface productElement {
  productElement: myProductElement
  onUpdate: () => void; // Add this line
}



type id = { id: String }
export const DeleteProduct: React.FC<any> = ({ productElement, onUpdate }) => {


  const [product, setProduct] = useState<Product | Array<string> | string | Object>(["defaultProducts"]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [date, setDate] = useState('');
  const [isEnabled, setIsEnabled] = useState(true);
  const [opened, { open, close }] = useDisclosure(false);
  const [isAnyFieldEnabled, setIsAnyFieldEnabled] = useState(false);

  console.log("From edit prod", productElement);

  const form = useForm({
    initialValues: {
      _id: productElement._id,
      provider: "",
      name: productElement.name,
      category: productElement.category,
      brand: productElement.brand,
      size: productElement.size,
      color: productElement.color,
      material: productElement.material,
      price: productElement.price,
      description: productElement.description,
      stock: productElement.stock,
      gender: productElement.gender,



    },
    validate: {

    },
  });


  const handleSubmit = async (values: typeof form.values) => {
    setLoading(true);
    setError(null); // Reset error state on new submission


    const fetchData = async () => {
      try {

        const deletedProduct: Product = {

          name: values.name,
          category: values.category,
          brand: values.brand,
          size: values.size,
          color: values.color,
          material: values.material,
          price: values.price,
          stock: values.stock,
          description: values.description,
          gender: values.gender,
          _id: values._id

        }

        console.log("from handleSubmit", deletedProduct);

        const updateData = await deleteProduct(deletedProduct);

 //       onUpdate(updateData)



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
          <Button style={{backgroundColor:"red", justifyContent:"center", marginTop:"15px"}}>Eliminar</Button>
        </div>
  )
}


