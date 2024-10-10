import React, { useEffect, useRef, useState } from 'react';
import { Modal, Button } from '@mantine/core';
import Barcode from 'react-barcode';
const BarcodeScanner: React.FC = () => {
    const [barcode, setBarcode] = useState<string>('');
    const [opened, setOpened] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            // Only capture input when the input field is not focused
            if (inputRef.current && document.activeElement !== inputRef.current) {
                if (event.key === 'Enter') {
                    // Show the modal when Enter is pressed
                    if (barcode.length > 0) {
                        setOpened(true);
                    }
                } else {
                    // Append other keys to the barcode
                    setBarcode((prev) => prev + event.key);
                }
            }
        };

        window.addEventListener('keypress', handleKeyPress);

        return () => {
            window.removeEventListener('keypress', handleKeyPress);
        };
    }, [barcode]);

    const closeModal = () => {
        setOpened(false);
        setBarcode(''); // Clear the barcode after closing the modal
    };

    return (
        <div>
            {/* Hidden Input */}
            <input
                ref={inputRef}
                type="text"
                style={{ display: 'none' }}
                onFocus={() => setBarcode('')}
            />

            {/* Modal to display the barcode */}
            <Modal opened={opened} onClose={closeModal} title="Barcode Scanned">
                <p>Código de barras: {barcode}</p>
                <div><Barcode  value={barcode}  /></div>
                <Button onClick={closeModal}>Cerrar</Button>
            </Modal>
        </div>
    );
};

export default BarcodeScanner;
