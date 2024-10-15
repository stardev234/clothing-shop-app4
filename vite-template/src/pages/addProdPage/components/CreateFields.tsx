
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

  const formatDate = (isoDate: string): string => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };



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
      date: "",
    },
    validate: {
     // provider: (value) => (value.length === 0 ? "Provider is required" : null),
      name: (value) => (value.length === 0 ? "Nombre es obligatorio" : null),
      category: (value) => (value.length === 0 ? "Categoria es obligatorio" : null),
      //brand: (value) => (value.length === 0 ? "Brand is required" : null),
     // size: (value) => (value.length === 0 ? "Size is required" : null),
      //color: (value) => (value.length === 0 ? "Color is required" : null),
      //material: (value) => (value.length === 0 ? "Material is required" : null),
      price: (value) => {
        const numValue = parseFloat(value);
        if (isNaN(numValue) || numValue <= 0) {
          return "Precio debe ser un valor positivo";
        }
        return null;
      },
      stock: (value) => {
        const numValue = parseInt(value, 10);
        if (isNaN(numValue) || numValue < 0) {
          return "Stock no debe ser negativo";
        }
        return null;
      },
     // gender: (value) => (value.length === 0 ? "Gender is required" : null),
      date: (value) => (value.length === 0 ? "Fecha es obligatorio" : null),
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


        const createdProduct: Product = {
          barcode: barcode,
          provider: values.provider,
          name: values.name,
          category: values.category,
          brand: values.brand,
          size: values.size,
          color: values.color,
          material: values.material,
          price: parseFloat(values.price),
          stock: parseInt(values.stock),
          description: values.description,
          gender: values.gender,
          date: new Date (Date.parse(values.date))
        };

        console.log("from handleSubmit", createdProduct);

        setProduct(await createProduct(createdProduct))

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
          }}></SuccessComponent></Modal>)

        }
      </div>



      <Grid justify="center" style={{ margin: "1px", padding: "100px", width: "1900px" }} >
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
              style={{ width: "185px" }}
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

              type="number"
              label="Precio (solo numeros)"
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


