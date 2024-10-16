import { Box, Button, Card, Drawer, InputLabel, Menu, Select, Textarea, TextInput } from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import { Product } from "@/models/Products";
import { SetStateAction, useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { FilterProducts } from "../utils/fetchFiltredProds";
import { newFilter } from "../utils/fetchFiltredProds";
import { IconEdit, IconShoppingCart, IconPrinter, IconAdjustmentsHorizontal  } from '@tabler/icons-react';
import { getProducts } from "../utils/fetchProds";
type MyFunction = (FiltredProds: Product) => void;

interface MyComponentProps {
    onAction: MyFunction;

}


export const FilteringBar: React.FC<MyComponentProps> = ({ onAction}) => {

    const [product, setProduct] = useState<Product | Array<string> | string | Object>(["defaultProducts"]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [date, setDate] = useState('');
    const filterIcon = <IconAdjustmentsHorizontal size="22" ></IconAdjustmentsHorizontal>

    const [opened, { open, close }] = useDisclosure(false);

    let form = useForm({
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
                console.log("Filtered Products",productData);
                
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

    
    const handleCleanCart = async () => {
        // Reset product state
        form.reset(); // Reset the form values to their initial state
        close()
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

                    <Button onClick={close} variant="outline" type="submit" style={{marginTop:"10px"}}>Filtrar</Button>
                    <Button onClick={handleCleanCart} variant="outline" type="submit" style={{marginLeft:"10px", marginTop:"10px"}}>Borrar filtros</Button>
                </form>

            </Drawer>

            <Button variant="default" style={{width:"70px", height:"50px"}} onClick={open}><IconAdjustmentsHorizontal></IconAdjustmentsHorizontal></Button>
        </>
    )
}


