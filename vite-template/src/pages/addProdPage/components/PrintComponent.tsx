// App.tsx
/*
import React from 'react';

const App: React.FC = () => {
    const handlePrint = () => {
        const printContent = "Hello, this is a string to print!  \n  ";
        const newWindow = window.open('', '', 'width=600,height=400');
        newWindow?.document.write(`<pre>${printContent}</pre>`);
        newWindow?.document.close();
        newWindow?.focus();
        newWindow?.print();
        newWindow?.close();
    };

    return (
        <div>
            <h1>Print Example</h1>
            <button onClick={handlePrint}>Print String</button>
        </div>
    );
};

export default App;
*/
import React, { useState } from 'react';
import BWIPJS from 'bwip-js';
import './print.css';

type BarcodePrinterProps = {
    barcode: string;
};

const BarcodePrinter: React.FC<BarcodePrinterProps> = ({ barcode }) => {
    const [barcodeValue, setBarcodeValue] = useState<string | null>(null);

    const handlePrint = () => {
        setTimeout(() => {
            window.print();
        }, 500); // Increase delay if necessary
    };

    const handleGenerateBarcode = () => {
        setBarcodeValue(barcode);
    };

    return (
        <div>
            <button className='hidden' onClick={handleGenerateBarcode}>Generate Barcode</button>
            {barcodeValue && (
                <div>
                    <button className='hidden' onClick={handlePrint}>Print Barcode</button>
                    <canvas
                        id="barcode"
                        ref={canvas => {
                            if (canvas) {
                                BWIPJS.toCanvas(canvas, {
                                    bcid: 'code128',        // Barcode type
                                    text: barcodeValue,     // Text to encode
                                    scale: 3,               // Scale factor
                                    height: 10,             // Height of the barcode
                                    includetext: true,      // Show text below the barcode
                                    textxalign: 'center',   // Center the text
                                });
                            }
                        }}
                    />
                </div>
            )}
            {!barcodeValue && <p className='hidden'>Please enter a number to generate a barcode.</p>}
        </div>
    );
};

export default BarcodePrinter;
