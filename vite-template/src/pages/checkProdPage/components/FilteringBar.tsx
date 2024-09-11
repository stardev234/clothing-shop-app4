import { Box, Button, Drawer, InputLabel, Menu, Select, Textarea, TextInput } from "@mantine/core";
import { DatePicker, DatePickerInput } from '@mantine/dates';
import { useDisclosure } from '@mantine/hooks';
import { getProducts } from "../utils/fetchProds";
import { Product } from "@/models/Products";
import { SetStateAction, useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { FilterProducts } from "../utils/fetchFiltredProds";
import { newFilter } from "../utils/fetchFiltredProds";
type MyFunction = (FiltredProds: Product) => void;

interface MyComponentProps {
    onAction: MyFunction;
}


export const FilteringBar: React.FC<MyComponentProps> = ({ onAction }) => {

    const [product, setProduct] = useState<Product | Array<string> | string | Object>(["defaultProducts"]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [date, setDate] = useState('');

    const handleChange = (event: { target: { value: SetStateAction<string>; }; }) => {
      setDate(event.target.value);
    };

    const [opened, { open, close }] = useDisclosure(false);


    const form = useForm({
        initialValues: {
            name: "",
            category: "",
            brand: "",
            size: "",
            color: "",
            material: "",
            price: "",
            stock: "",
            gender: "",
        },
        validate: {

        },
    });


    const handleSubmit = async (values: typeof form.values) => {
        console.log("from handleSubmit");

        const fetchData = async () => {
            try {

                const filter: newFilter = {

                    name: values.name,
                    category: values.category,
                    brand: values.brand,
                    size: values.size,
                    color: values.color,
                    material: values.material,
                    price: values.price,
                    stock: values.stock,
                    gender: values.gender,

                }

                console.log(values);

                const productData = await FilterProducts(filter);



                setProduct(productData)


                onAction(productData)


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
        <>
            <Drawer opened={opened} onClose={close} title="Busqueda y filtrado de Productos">
                {/* Drawer content */}

                <form
                    onSubmit={form.onSubmit(handleSubmit)}
                >
                    <TextInput
                        label="Name"
                        placeholder="Your name"
                        {...form.getInputProps('name')}
                    />

                    <Select
                        label="Categoria"
                        placeholder="Elija una categoria"
                        data={["Camisa", "Remera", "Pantalon", "Short", "Falda", "Vestido", "Accesorio", "Conjunto", "Campera", "Ropa interior", "Calzado"]}
                        {...form.getInputProps('category')}
                    />

                    <TextInput
                        label="Fecha"
                        value={date}
                        type="date"  // HTML date input type
                        style={{ marginBottom: 20 }} // Optional styling
                        {...form.getInputProps('date')}
                    />





                    <Textarea
                        label="Marca"
                        placeholder="Marca"
                        {...form.getInputProps('brand')}
                    />

                    <Textarea
                        label="Talle"
                        placeholder="Talle"
                        {...form.getInputProps('size')}
                    />



                    <Button onClick={close} type="submit" >Submit</Button>

                </form>



            </Drawer>

            <Button onClick={open} >Filtrado y Busqueda</Button>
        </>
    )
}


