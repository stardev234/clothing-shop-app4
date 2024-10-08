import React from 'react';
import { List, ListItem, Text, Button } from '@mantine/core';
import PrintComponent from './QzPrint';
interface Product {
    barcode: string;
    name: string;
    category: string;
    brand: string;
    size: string;
    color: string;
    material: string;
    stock: number;
    description: string;
    date: string;
    gender: string;
    price: number;
}

interface SuccessComponentProps {
    product: Product;
    onAddAnother: () => void; // Callback for the button action
}

const SuccessComponent: React.FC<SuccessComponentProps> = ({ product}) => {
    return (
        <div>
            <List>
                <ListItem>
                    <Text>
                        <span style={{ fontWeight: 'bold' }}>Codigo de barras: </span>
                        {product.barcode}
                    </Text>
                </ListItem>
                <ListItem>
                    <Text>
                        <span style={{ fontWeight: 'bold' }}>Nombre: </span>
                        {product.name}
                    </Text>
                </ListItem>
                <ListItem>
                    <Text>
                        <span style={{ fontWeight: 'bold' }}>Categoria: </span>
                        {product.category}
                    </Text>
                </ListItem>
                <ListItem>
                    <Text>
                        <span style={{ fontWeight: 'bold' }}>Marca: </span>
                        {product.brand}
                    </Text>
                </ListItem>
                <ListItem>
                    <Text>
                        <span style={{ fontWeight: 'bold' }}>Talle: </span>
                        {product.size}
                    </Text>
                </ListItem>
                <ListItem>
                    <Text>
                        <span style={{ fontWeight: 'bold' }}>Color: </span>
                        {product.color}
                    </Text>
                </ListItem>
                <ListItem>
                    <Text>
                        <span style={{ fontWeight: 'bold' }}>Material: </span>
                        {product.material}
                    </Text>
                </ListItem>
                <ListItem>
                    <Text>
                        <span style={{ fontWeight: 'bold' }}>Stock: </span>
                        {product.stock}
                    </Text>
                </ListItem>
                <ListItem>
                    <Text>
                        <span style={{ fontWeight: 'bold' }}>Descripción: </span>
                        {product.description}
                    </Text>
                </ListItem>
                <ListItem>
                    <Text>
                        <span style={{ fontWeight: 'bold' }}>Fecha: </span>
                        {product.date}
                    </Text>
                </ListItem>
                <ListItem>
                    <Text>
                        <span style={{ fontWeight: 'bold' }}>Género: </span>
                        {product.gender}
                    </Text>
                </ListItem>
                <ListItem>
                    <Text>
                        <span style={{ fontWeight: 'bold' }}>Precio: </span>
                        {product.price}
                    </Text>
                </ListItem>
            </List>
            
            <PrintComponent barcodeText={product.barcode}></PrintComponent>
        </div>
    );
};

export default SuccessComponent;