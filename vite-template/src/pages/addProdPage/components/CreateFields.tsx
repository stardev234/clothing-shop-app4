/*import React from 'react';
import { TextInput, Button, Group, Grid, } from '@mantine/core';
import { useForm } from '@mantine/form';
import { createProduct } from '../utils/postProduct';
import { Product } from '@/models/Products';
import { getBarcode } from '../utils/getBarcode';



const fields = [
  { name: 'provider', label: 'Proveedor', placeholder: 'Proveedor' },
  { name: 'name', label: 'Nombre', placeholder: 'Nombre' },
  { name: 'category', label: 'Categoría', placeholder: 'Categoría' },
  { name: 'brand', label: 'Marca', placeholder: 'Marca' },
  { name: 'size', label: 'Talle', placeholder: 'Talle' },
  { name: 'color', label: 'Color', placeholder: 'Color' },
  { name: 'material', label: 'Material', placeholder: 'Material' },
  { name: 'price', label: 'Precio', placeholder: 'Precio', type: 'number' },
  { name: 'stock', label: 'Stock (solo numeros)', placeholder: 'Stock (solo numeros)', type: 'number' },
  { name: 'description', label: 'Descripción', placeholder: 'Descripción' },
  { name: 'date', label: 'Fecha', placeholder: 'Fecha', type: 'date' },
  { name: 'gender', label: 'Genero', placeholder: 'Genero' },
];


const validate = (values: any) => {
  const errors: Record<string, string> = {};
  const fieldsWithErrors = fields.map(field => field.name);

  fieldsWithErrors.forEach(field => {
    if (!values[field]) {
      errors[field] = `${fields.find(f => f.name === field)?.label} is required`;
    }
  });


  if (isNaN(values.price) || values.price <= 0) errors.price = 'Precio must be a positive number';
  if (isNaN(values.stock) || values.stock < 0) errors.stock = 'Stock cannot be negative';

  return errors;
};

const FormComponent: React.FC = () => {
  const form = useForm({
    initialValues: fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {}),
    validate,
  });



  const handleSubmit = async (values: any) => {
    const barcode = await getBarcode()
    // Map form values to Product type
    const product: Product = {
      barcode: barcode,
      name: values.name,
      category: values.category,
      brand: values.brand,
      size: values.size,
      color: values.color,
      material: values.material,
      price: values.price,
      stock: values.stock,
      description: values.description,
      date: new Date(values.date),
      gender: values.gender,
    };

    try {
      const response = await createProduct(product);
      console.log('Product created successfully:', response);


    } catch (error) {
      console.error('Error creating product:', error);
      
    }
  };
  
  return (
    
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Group>
      <Grid   style={{ paddingLeft: '20%', paddingRight:"20%"}} >
        {fields.map((field) => (
          <Group style={{padding:"20px"}}>
          <div key={field.name}>
            <TextInput style={{width:"300px"}}
              label={field.label}
              placeholder={field.placeholder}
              type={field.type || 'text'}
              {...form.getInputProps(field.name)}
            />
          
          </div>
          </Group>
        ))}
        <Button type="submit" top={"43px"}>Submit</Button>
      </Grid>
      
          
   </Group> 
   </form>
  );
};

export default FormComponent;
*/


import { Box, Button, Card, Drawer, Grid, Group, InputLabel, Menu, Select, Textarea, TextInput, Checkbox, Input, Modal, List, ListItem, Text } from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import { Product } from "@/models/Products";
import { SetStateAction, useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { createProduct } from "../utils/postProduct";
import { getBarcode } from "../utils/getBarcode";
import { ProductResponse } from "@/models/CreateProd";
import BarcodePrinter from "./PrintComponent";
import PrintComponent from "./Print";
import './print.css';
import QZPrintComponent from "./QzPrint";
import SuccessComponent from "./SuccesComponent";


export interface productElement {
  productElement: Product
  onUpdate: () => void; // Add this line
  onDelete: () => void; // Add this line
}



type id = { id: String }
export const CreateFields: React.FC<any> = () => {


  const [product, setProduct] = useState<Product | Array<string> | string | Object>(["defaultProducts"]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [date, setDate] = useState('');
  const [isEnabled, setIsEnabled] = useState(true);
  const [showSuccess, setSuccess] = useState(false);
  const [isAnyFieldEnabled, setIsAnyFieldEnabled] = useState(false);
  const [barcodeOpened, { open: openBarcode, close: closeBarcode }] = useDisclosure(false);
  const [opened, { open, close }] = useDisclosure(false);

  console.log("From edit prod",);

  const form = useForm({
    initialValues: {

      provider: "",
      name: "",
      category: "",
      brand: "",
      size: "",
      color: "",
      material: "",
      price: "",
      description: "",
      stock: "",
      gender: "",
      date: new Date


    },
    validate: {

    },
  });

  /*
    useEffect(() => {
      setProduct(updateData)
   }, [product]);
  
  */

  const handleSubmit = async (values: typeof form.values) => {
    setLoading(true);
    setError(null); // Reset error state on new submission


    const fetchData = async () => {
      try {
        const barcode = await getBarcode()


        const updatedProduct: Product = {
          barcode: barcode,
          provider: values.provider,
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
          date: values.date

        }

        console.log("from handleSubmit", updatedProduct);

        setProduct(await createProduct(updatedProduct))

        setSuccess(true)
        open()
        console.log("UPDATE DATA", product);

      
        /*form.reset()*/

        

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

    <div >
{/*<QZPrintComponent ></QZPrintComponent>*/}

      <div >
        {showSuccess && (<Modal opened={opened} onClose={close} title="Producto añadido correctamente">
          <SuccessComponent product={product} onAddAnother={function (): void {
          throw new Error("Function not implemented.");
        } }></SuccessComponent></Modal>)
        
        }
      </div>



      <Grid justify="center" style={{ margin: "1px", padding: "100px", width: "1800px" }} >
        <form
          onSubmit={form.onSubmit(handleSubmit)}
        >
          {loading && <p>Loading...</p>} {/* Show loading message */}
          {error && (
            <Box style={{ color: 'red', marginBottom: '10px', width: "100px" }}>
              Error: {error} {/* Display error message */}

            </Box>
          )}



          <Group >
            < TextInput 
              style={{width:"185px"}}
              label="Fecha"
              value={date}
              type="date"  // HTML date input type
             
              {...form.getInputProps('date')}
            />

            <TextInput

              label="Provider"
              placeholder="proveedor"
              value={"value"}

              {...form.getInputProps('provider')}
            />

            <TextInput

              label="Nombre"
              placeholder="Nombre"

              {...form.getInputProps('name')}
            />
          </Group>


          <Select
            label="Categoria"
            placeholder="Elija una categoria"
            data={["Camisa", "Remera", "Pantalon", "Short", "Falda", "Vestido", "Accesorio", "Conjunto", "Campera", "Ropa interior", "Calzado"]}
            {...form.getInputProps('category')}
          />

          <TextInput
            label="Marca"
            placeholder="Marca"
            {...form.getInputProps('brand')}
          />

          <Group style={{}}>
            <TextInput
              label="Talle"
              placeholder="Talle"
              {...form.getInputProps('size')}
            />


            <TextInput
              label="Color"
              placeholder="Color"
              {...form.getInputProps('color')}
            />
          <TextInput
              label="Material"
              placeholder="Material"
              {...form.getInputProps('material')}
            />

          </Group>

          <Group>
            
            <TextInput
              label="Precio"
              placeholder="Precio"
              {...form.getInputProps('price')}
            />
          


          <Group>
            <TextInput
              type="number"
              label="Stock (solo numeros)"
              placeholder="Stock"
              {...form.getInputProps('stock')}
            />

</Group>

            <TextInput
              label="Descripcion"
              placeholder="Descripcion"
              {...form.getInputProps('description')}
            />

          </Group>
          <Select
            label="Genero"
            placeholder="Elija un Genero"
            data={["Hombre", "Mujer", "Unisex"]}
            {...form.getInputProps('gender')}
          />



          <Button onClick={close} type="submit" style={{ marginTop: "10px" }}>Enviar</Button>




        </form>


      </Grid>
    </div>
  )
}


