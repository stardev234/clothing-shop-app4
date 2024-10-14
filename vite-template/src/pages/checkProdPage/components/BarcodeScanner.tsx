import React, { useEffect, useRef, useState } from 'react';
import { Modal, Button, List, ListItem, Text, Loader, Dialog } from '@mantine/core';
import Barcode from 'react-barcode';
import { fetchOneProduct } from '../utils/fetchOneProd';
import { barcode as BarcodeType } from '../utils/fetchOneProd';
import { ProductResponse } from '../utils/fetchOneProd';
import { Product } from '@/models/Products';

interface MyComponentProps {
    onAction: Function;
}

const BarcodeScanner: React.FC<MyComponentProps> = ({ onAction }) => {
    const [barcode, setBarcode] = useState<string>('');
    const [opened, setOpened] = useState<boolean>(false);
    const [productResponse, setProductResponse] = useState<ProductResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const formatDate = (isoDate: any): string => {
        const date = new Date(isoDate);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const year = date.getFullYear();
    
        return `${day}/${month}/${year}`;
      };
    useEffect(() => {
        const handleKeyPress = async (event: KeyboardEvent) => {
            if (inputRef.current && document.activeElement !== inputRef.current) {
                if (event.key === 'Enter') {
                    if (barcode.length > 0) {
                        setLoading(true);
                        const myBarcode: BarcodeType = { barcode };
                        try {
                            console.log("BARCODE", barcode);
                            const response = await fetchOneProduct(myBarcode);
                            if (response) {
                                setProductResponse(response);
                                setOpened(true);  // Open modal after fetching product
                            }
                        } catch (error) {
                            console.error("Error fetching product:", error);
                        } finally {
                            setLoading(false);
                        }
                        setBarcode(""); // Reset barcode after processing
                    }
                } else {
                    setBarcode((prev) => prev + event.key);
                }
            }
        };

        window.addEventListener('keypress', handleKeyPress);
        return () => {
            window.removeEventListener('keypress', handleKeyPress);
        };
    }, [barcode]); // Keep barcode in dependencies for handling input

    useEffect(() => {
        if (productResponse) {
            onAction(productResponse); // Call onAction when productResponse changes
        }
    }, [productResponse, onAction]);

    const closeModal = () => {
        
        setOpened(false);
        setProductResponse(null);
        
        setBarcode('');
    };

 
    return (
        <div>
            <input
                ref={inputRef}
                type="text"
                style={{ display: 'none' }}
                onFocus={() => setBarcode('')}
            />
            <Dialog opened={opened} onClose={closeModal} title="Barcode Scanned" position={{ bottom: 50, right: 100 }}>
                {loading ? (
                    <Loader />
                ) : (
                    <>
                   
        <div>
            <List>
                <ListItem>
                    <Text>
                        <span style={{ fontWeight: 'bold' }}>
                            Codigo de barras: {" "}
                        </span>
                        {productResponse?.barcode}
                    </Text>
                </ListItem>

                <ListItem>
                    <Text>
                        <span style={{ fontWeight: 'bold' }}>
                            Nombre: {" "}
                        </span>
                        {productResponse?.name}
                    </Text>
                </ListItem>

                <ListItem>
                    <Text>
                        <span style={{ fontWeight: 'bold' }}>
                            Categoria: {" "}
                        </span>
                        {productResponse?.category}
                    </Text>
                </ListItem>

                <ListItem>
                    <Text>
                        <span style={{ fontWeight: 'bold' }}>
                            Marca: {" "}
                        </span>
                        {productResponse?.brand}
                    </Text>
                </ListItem>


                <ListItem>
                    <Text>
                        <span style={{ fontWeight: 'bold' }}>
                            Talle: {" "}
                        </span>
                        {productResponse?.size}
                    </Text>
                </ListItem>


                <ListItem>
                    <Text>
                        <span style={{ fontWeight: 'bold' }}>
                            Color: {" "}
                        </span>
                        {productResponse?.color}
                    </Text>
                </ListItem>

                <ListItem>
                    <Text>
                        <span style={{ fontWeight: 'bold' }}>
                            Material: {" "}
                        </span>
                        {productResponse?.material}
                    </Text>
                </ListItem>

                <ListItem>
                    <Text>
                        <span style={{ fontWeight: 'bold' }}>
                            Stock: {" "}
                        </span>
                        {productResponse?.stock}
                    </Text>
                </ListItem>

                <ListItem>
                    <Text>
                        <span style={{ fontWeight: 'bold' }}>
                            Descripción: {" "}
                        </span>
                        {productResponse?.description}
                    </Text>
                </ListItem>

                <ListItem>
                    <Text>
                        <span style={{ fontWeight: 'bold' }}>
                            Fecha: {" "}
                        </span>
                        {formatDate(productResponse?.date)}
                    </Text>
                </ListItem>

                <ListItem>
                    <Text>
                        <span style={{ fontWeight: 'bold' }}>
                            Género: {" "}
                        </span>
                        {productResponse?.gender}
                    </Text>
                </ListItem>


                <ListItem>
                    <Text>
                        <span style={{ fontWeight: 'bold' }}>
                            Precio: {" "}
                        </span>
                       ${productResponse?.price}
                    </Text>
                </ListItem>

            </List>
        </div>
                        <Barcode width={1.6}  value={productResponse?.barcode ?? "0"} />
                        
                    </>
                )}
                <Button onClick={closeModal}>Cerrar</Button>
            </Dialog>
        </div>
    );
};

export default BarcodeScanner;
