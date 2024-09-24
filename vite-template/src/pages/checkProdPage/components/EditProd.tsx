import { Box, Button, Card, Drawer, Grid, Group, InputLabel, Menu, Select, Textarea, TextInput, Checkbox, Input, Modal } from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import { Product } from "@/models/Products";
import { SetStateAction, useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { FilterProducts } from "../utils/fetchFiltredProds";
import { newFilter } from "../utils/fetchFiltredProds";
import { updateProduct } from "../utils/fetchEditProd";



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
export const EditProd: React.FC<any> = ({ productElement, onUpdate }) => {


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

        const updatedProduct: Product = {

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

        console.log("from handleSubmit", updatedProduct);

        const updateData = await updateProduct(updatedProduct);

        onUpdate(updateData)



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

    <Grid justify="center" style={{ margin: "1px", padding: "1px" }} >
      <form
        onSubmit={form.onSubmit(handleSubmit)}
      >
        {loading && <p>Loading...</p>} {/* Show loading message */}
        {error && (
          <Box style={{ color: 'red', marginBottom: '10px' }}>
            Error: {error} {/* Display error message */}
          </Box>
        )}
        <Group>

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

        <Group>
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
        </Group>

        <Group>
          <TextInput
            label="Material"
            placeholder="Material"
            {...form.getInputProps('material')}
          />

          <TextInput
            label="Precio"
            placeholder="Precio"
            {...form.getInputProps('price')}
          />
        </Group>


        <Group>
          <TextInput
            type="number"
            label="Stock (solo numeros)"
            placeholder="Stock"
            {...form.getInputProps('stock')}
          />



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

        <Button style={{ marginTop: "10px", marginLeft:"155px", backgroundColor:"red" }}>Eliminar Producto</Button>


      </form>


    </Grid>

  )
}


