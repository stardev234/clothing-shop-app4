import { Box, Button, Card, Drawer, InputLabel, Menu, Select, Textarea, TextInput } from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import { Product } from "@/models/Products";
import { SetStateAction, useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { FilterProducts } from "../utils/fetchFiltredProds";
import { newFilter } from "../utils/fetchFiltredProds";
import { IconEdit, IconShoppingCart, IconPrinter } from '@tabler/icons-react';
type MyFunction = (FiltredProds: Product) => void;

interface MyComponentProps {
    onAction: MyFunction;

}


export const ShoppingCart: React.FC = () => {
    const shoppingCartIcon = <IconShoppingCart size="22" ></IconShoppingCart>
    const [product, setProduct] = useState<Product | Array<string> | string | Object>(["defaultProducts"]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [date, setDate] = useState('');

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
            fromDate: new Date(""),
            untilDate: new Date(""),
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
                    fromDate: values.fromDate,
                    untilDate: values.untilDate,
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
        <>
            <Drawer opened={opened} onClose={close} title="Busqueda y filtrado de Productos">
             

                <form
                    onSubmit={form.onSubmit(handleSubmit)}
                >
                    <TextInput
                        label="Nombre"
                        placeholder="Nombre de la prenda"
                        {...form.getInputProps('name')}
                    />

                    <Select
                        label="Categoria"
                        placeholder="Elija una categoria"
                        data={["Camisa", "Remera", "Pantalon", "Short", "Falda", "Vestido", "Accesorio", "Conjunto", "Campera", "Ropa interior", "Calzado"]}
                        {...form.getInputProps('category')}
                    />

                    <Select
                        label="Genero"
                        placeholder="Elija un Genero"
                        data={["Hombre", "Mujer", "Unisex"]}
                        {...form.getInputProps('gender')}
                    />

                    <Card style={{ marginTop: 20 }} >
                        <div>Filtrar por periodo</div>
                        <TextInput
                            label="Desde"
                            value={date}
                            type="date"  // HTML date input type
                            style={{ marginBottom: 20 }} // Optional styling
                            {...form.getInputProps('fromDate')}
                        />

                        <TextInput
                            label="Hasta"
                            value={date}
                            type="date"  // HTML date input type
                            style={{ marginBottom: 20 }} // Optional styling
                            
                            {...form.getInputProps('untilDate')}
                        />
                    </Card>

                    <Button onClick={close} type="submit" >Submit</Button>

                </form>

            </Drawer>

            <Button variant="default" style={{height:""}} onClick={open}> <IconShoppingCart></IconShoppingCart> </Button>
        </>
    )
}



