import { Box, Button, Card, Drawer, Grid, Group, InputLabel, Menu, Select, Textarea, TextInput, Checkbox, Input } from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import { Product } from "@/models/Products";
import { SetStateAction, useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { FilterProducts } from "../utils/fetchFiltredProds";
import { newFilter } from "../utils/fetchFiltredProds";

interface myProductElement {
  id: string,
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

interface productElement {
  productElement: myProductElement
}


type id = { id: String }
export const EditProd: React.FC<any> = ({ productElement }) => {


  const [product, setProduct] = useState<Product | Array<string> | string | Object>(["defaultProducts"]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [date, setDate] = useState('');
  const [isEnabled, setIsEnabled] = useState(true);
  const [opened, { open, close }] = useDisclosure(false);
  const [isAnyFieldEnabled, setIsAnyFieldEnabled] = useState(false);

  console.log("From edit prod", productElement);

  const form = useForm({
    initialValues: {
      provider: "",
      name: productElement.name,
      category: productElement.category,
      brand: productElement.brand,
      size: productElement.size,
      color: productElement.color,
      material: productElement.material,
      price: productElement.price,
      description: productElement.descripcion,
      stock: productElement.stock,
      gender: productElement.gender,
      date: new Date(""),

    },
    validate: {

    },
  });


  const handleSubmit = async (values: typeof form.values) => {
    console.log("from handleSubmit");

    const fetchData = async () => {
      try {

        const filter: Product = {

          name: values.name,
          category: values.category,
          brand: values.brand,
          size: values.size,
          color: values.color,
          material: values.material,
          price: values.price,
          stock: values.stock,
          gender: values.gender,
          date: values.date,
        }

        console.log(values);
        const productData = await FilterProducts(filter);

        setProduct(productData)

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
            {...form.getInputProps('Description')}
          />

        </Group>
        <Select
          label="Genero"
          placeholder="Elija un Genero"
          data={["Hombre", "Mujer", "Unisex"]}
          {...form.getInputProps('gender')}
        />



        <Button onClick={close} type="submit" style={{ marginTop: "10px" }}>Submit</Button>



      </form>


    </Grid>

  )
}


