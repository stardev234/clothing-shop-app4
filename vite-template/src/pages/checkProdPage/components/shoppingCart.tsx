import { AccordionControl, Box, Button, Drawer, List, ListItem, Text } from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import { Product } from "@/models/Products";
import { useEffect, useState } from "react";
import { IconShoppingCart } from '@tabler/icons-react';
import { Accordion } from '@mantine/core';

interface MyComponentProps {
    productElement: Product;
}

interface CartItem {
    product: Product;
    quantity: number;
}

export const ShoppingCart: React.FC<MyComponentProps> = ({ productElement }) => {
    const shoppingCartIcon = <IconShoppingCart size="22" />;
    const [opened, { open, close }] = useDisclosure(false);
    const [items, setItems] = useState<CartItem[]>([]);
    const formatDate = (isoDate: string): string => {
        const date = new Date(isoDate);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    };
    useEffect(() => {
        if (productElement) {
            setItems((prevItems) => {
                const existingItem = prevItems.find(item => item.product._id === productElement._id);

                if (existingItem) {
                    return prevItems.map(item =>
                        item.product._id === productElement._id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    );
                } else {
                    return [...prevItems, { product: productElement, quantity: 1 }];
                }
            });
        }
    }, [productElement]);

    const calculateTotal = () => {
        return items.reduce((total, item) => total + item.product.price * item.quantity, 0).toFixed(2);
    };

    const clearCart = () => {
        setItems([]);
    };

    return (
        <div>
            <Drawer opened={opened} onClose={close} title="Productos">
                {items.length > 0 ? (
                    <Accordion>
                        {items.map((item) => (
                            <Accordion.Item key={item.product._id} value={item.product.name}>
                                <AccordionControl>
                                    {item.product.name} - Cantidad: {item.quantity} Precio: ${item.product.price}
                                </AccordionControl>
                                <Accordion.Panel>
                                    <div>
                                        <List>

                                            <ListItem>
                                                <Text>
                                                    <span style={{ fontWeight: 'bold' }}>Codigo de barras: </span>
                                                    {item.product.barcode}
                                                </Text>
                                            </ListItem>
                                            <ListItem>
                                                <Text>
                                                    <span style={{ fontWeight: 'bold' }}>Nombre: </span>
                                                    {item.product.name}
                                                </Text>
                                            </ListItem>
                                            <ListItem>
                                                <Text>
                                                    <span style={{ fontWeight: 'bold' }}>Categoria: </span>
                                                    {item.product.category}
                                                </Text>
                                            </ListItem>
                                            <ListItem>
                                                <Text>
                                                    <span style={{ fontWeight: 'bold' }}>Marca: </span>
                                                    {item.product.brand}
                                                </Text>
                                            </ListItem>
                                            <ListItem>
                                                <Text>
                                                    <span style={{ fontWeight: 'bold' }}>Talle: </span>
                                                    {item.product.size}
                                                </Text>
                                            </ListItem>
                                            <ListItem>
                                                <Text>
                                                    <span style={{ fontWeight: 'bold' }}>Color: </span>
                                                    {item.product.color}
                                                </Text>
                                            </ListItem>
                                            <ListItem>
                                                <Text>
                                                    <span style={{ fontWeight: 'bold' }}>Material: </span>
                                                    {item.product.material}
                                                </Text>
                                            </ListItem>
                                            <ListItem>
                                                <Text>
                                                    <span style={{ fontWeight: 'bold' }}>Stock: </span>
                                                    {item.product.stock}
                                                </Text>
                                            </ListItem>
                                            <ListItem>
                                                <Text>
                                                    <span style={{ fontWeight: 'bold' }}>Descripción: </span>
                                                    {item.product.description}
                                                </Text>
                                            </ListItem>
                                            <ListItem>
                                                <Text>
                                                    <span style={{ fontWeight: 'bold' }}>Fecha: </span>
                                                    {formatDate(item.product.date)}
                                                </Text>
                                            </ListItem>
                                            <ListItem>
                                                <Text>
                                                    <span style={{ fontWeight: 'bold' }}>Género: </span>
                                                    {item.product.gender}
                                                </Text>
                                            </ListItem>
                                            <ListItem>
                                                <Text>
                                                    <span style={{ fontWeight: 'bold' }}>Precio: </span>
                                                    ${item.product.price}
                                                </Text>
                                            </ListItem>
                                        </List>
                                    </div>
                                </Accordion.Panel>
                            </Accordion.Item>
                        ))}
                    </Accordion>
                ) : (
                    <Text>No hay articulos en el carro</Text>
                )}

                <Text style={{ marginTop: "10px" }}>Total a pagar: ${calculateTotal()}</Text>
                <Button style={{ marginTop: "10px" }} variant="outline" onClick={clearCart}>
                    Vaciar carrito
                </Button>
                <Button style={{ marginTop: "10px", marginLeft:"10px"}} variant="outline">Continuar con la compra</Button>
            </Drawer>

            <Button  variant="default" onClick={open} style={{width:"70px", height:"50px"}}>{shoppingCartIcon}</Button>
        </div>
    );
};
