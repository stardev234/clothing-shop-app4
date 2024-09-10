import { Button, Drawer, InputLabel, Menu, Textarea, TextInput } from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import { getProducts } from "../utils/fetchProds";
import { Product } from "@/models/Products";
import { useEffect, useState } from "react";
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
                    <TextInput
                        label="Category"
                        placeholder="Category"
                        {...form.getInputProps('category')}
                    />
                    <Textarea
                        label="Brand"
                        placeholder="Brand"
                        {...form.getInputProps('brand')}
                    />

                    <Textarea
                        label="Size"
                        placeholder="Size"
                        {...form.getInputProps('size')}
                    />
                    <Textarea
                        label="Message"
                        placeholder="Your message"
                        {...form.getInputProps('color')}
                    />
                    <Textarea
                        label="Message"
                        placeholder="Your message"
                        {...form.getInputProps('material')}
                    />
                    <Textarea
                        label="Message"
                        placeholder="Your message"
                        {...form.getInputProps('price')}
                    />
                    <Textarea
                        label="Message"
                        placeholder="Your message"
                        {...form.getInputProps('stock')}
                    />
                    <Textarea
                        label="Message"
                        placeholder="Your message"
                        {...form.getInputProps('date')}
                    />
                    <Textarea
                        label="Message"
                        placeholder="Your message"
                        {...form.getInputProps('gender')}
                    />
                    <Button onClick={close} type="submit" >Submit</Button>
                     
                </form>

              

            </Drawer>

            <Button onClick={open} >Filtrado y Busqueda</Button>
        </>
    )
}


